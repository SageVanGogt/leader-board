require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken');

app.set('port', process.env.PORT || 3001);
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://leaderboard-co.surge.sh", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const checkAuth = (request, response, next) => {
  const token = request.headers.authorization;
  const secretKey = process.env.SECRET_KEY;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded.appName === 'Leader Board') {
        next();
      } else {
        response.status(403).send('Invalid application.');
      }
    } catch (err) {
      response.status(403).send('Invalid token.');
    }
  } else {
    response.status(403).send('You must be authorized to hit this endpoint.');
  }
};

io.on('connection', (client) => {
  client.on('subscribeToChange', (change) => {
    console.log('client is subscribing to leaderboard with change ', change);
    // setInterval(() => {
      io.emit('change', change);
    // }, interval);
  });
});

const checkAdmin = (request, response, next) => {
  const token = request.headers.authorization;
  const secretKey = process.env.SECRET_KEY;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      const admin = decoded.jti;
      const appName = decoded.appName;
      if (admin && appName === 'Leader Board') {
        next();
      } else if (admin && appName !== 'Leader Board'){
        response.status(403).send('Invalid application.');
      } else if (!admin) {
        response.status(403).send('You must be an admin to access this endpoint');
      }
    } catch (err) {
      response.status(403).send('Invalid token.');
    }
  } else {
    response.status(403).send('You must be authorized to hit this endpoint.');
  }
};

app.post('/authenticate', (request, response) => {
  const { email, appName } = request.body;
  const authPayload = { email, appName };
  const secretKey = process.env.SECRET_KEY;
  const brokenEmail = email.split('@');
  const admin = brokenEmail[1];

  if (email && appName) {
    const token = admin === 'turing.io' ? 
      jwt.sign(authPayload, secretKey, { expiresIn: '2 days', jwtid: 'admin' }) : 
      jwt.sign(authPayload, secretKey, { expiresIn: '2 days' });
    response.status(200).json({ token });
  } else {
    response.status(422).json({
      message: 'You need to include an email AND appName in the request body.'
    });
  }
});

app.get('/api/v1/events', (request, response) => {
  return database('events').select()
    .then(events => {
      return response.status(200).json({
        status: 'success',
        events
      });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/riders', (request, response) => {
  return database('riders').select()
    .then(riders => {
      return response.status(200).json({
        status: 'success',
        riders
      });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/riders/:id/results', checkAuth, (request, response) => {
  const riderId = request.params.id;
  return database('results').where({
    rider_id: riderId
  }).select()
    .then(results => {
      return response.status(200).json({
        status: 'success',
        results
      });
    })
    .catch(error => {
      response.status(500).json({
        message: "results not found",
        error
      });
    });
});

app.get('/api/v1/riders/:id', (request, response) => {
  const riderId = request.params.id;
  return database('riders').where({
    id: riderId
  }).select()
    .then(rider => {
      return response.status(200).json({
        status: 'success',
        rider
      });
    })
    .catch(error => {
      response.status(500).json({
        message: "results not found",
        error
      });
    });
});

app.get('/api/v1/events/:eventId/division/:divId/results', (request, response) => {
  const { eventId, divId } = request.params;
  return database('results').where({
    event_id: eventId,
    division_id: divId
  }).select()
    .then(results => {
      return response.status(200).json({
        status: 'success',
        results
      });
    })
    .catch(error => {
      response.status(500).json({
        message: "results not found",
        error
      });
    });
});

app.post('/api/v1/results', checkAdmin, (request, response) => {
  const {
    event_id,
    division_id,
    rider_id,
    run_1,
    run_2,
    run_3,
    final } = request.body;

  let result = ['event_id', 'division_id', 'rider_id']
    .every(prop => request.body.hasOwnProperty(prop));
  
  if (result) {
    database('results').insert({
      event_id,
      division_id,
      rider_id,
      run_1,
      run_2,
      run_3,
      final
    }, 'id')
      .then(resultId => {
        response.status(201).json({ 
          status: 'Success! Your result has been added.',
          resultId: resultId[0] 
        });
      })
      .catch(error => {
        response.status(500).json({ error });
      });
  } else {
    response.status(422).json({
      message: 'Please include all of the necessary properties in the request body'
    });
  }
});

app.post('/api/v1/media', checkAdmin, (request, response) => {
  const {
    event_id,
    division_id,
    rider_id,
    result_id,
    media_url } = request.body;

  let result = ['event_id', 'division_id', 'rider_id', 'result_id', 'media_url']
    .every(prop => request.body.hasOwnProperty(prop));

  if (result) {
    database('media').insert({
      event_id,
      division_id,
      rider_id,
      result_id,
      media_url
    }, 'id')
      .then(mediaId => {
        response.status(201).json({
          message: 'Success! Your media has been added.',
          mediaId: mediaId[0]
        });
      })
      .catch(error => {
        response.status(500).json({ error });
      });
  } else {
    response.status(422).json({
      message: 'Please include all of the necessary properties in the request body'
    });
  }
});

app.delete('/api/v1/media/:id', checkAdmin, (request, response) => {
  const mediaId = request.params.id;
  database('media').where({
    id: mediaId
  })
    .del()
    .then(() => {
      response.status(202).json({
        message: `Success! Media ID #${mediaId} had been removed.`
      });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/results/:id', checkAdmin, (request, response) => {
  const resultId = request.params.id;
  database('results').where({
    id: resultId
  })
    .del()
    .then(() => {
      response.status(202).json({
        message: `Success! Result ID #${resultId} had been removed.`
      });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/results/:id', checkAdmin, (request, response) => {
  const resultId = request.params.id;
  const updatedResult = request.body.result;
  return database('results')
    .where({ id: resultId })
    .update(updatedResult)
    .then(() => {
      response.status(203).json({
        status: "success",
        updatedResults: updatedResult
      });
    });
});

app.patch('/api/v1/events/:eventId/divisions/:divisionId/riders/:riderId', (request, response) => {
  const {eventId, divisionId, riderId} = request.params;
  console.log(request.params)
  const updatedResult = request.body.result;
  return database('results')
    .where({ event_id: eventId, division_id: divisionId, rider_id: riderId })
    .update(updatedResult)
    .then(() => {
      response.status(203).json({
        status: "success",
        updatedResults: updatedResult
      });
    });
});

app.patch('/api/v1/riders/:id', checkAdmin, (request, response) => {
  const riderId = request.params.id;
  const updatedRider = request.body.rider;

  return database('riders')
    .where({ id: riderId })
    .update(updatedRider)
    .then(() => {
      response.status(203).json({
        status: "success",
        updatedRiderInfo: updatedRider
      });
    });
});

app.get('/api/v1/media', checkAuth, (request, response) => {
  const riderId = request.query.rider;
  return database('media').where({
    rider_id: riderId
  }).select()
    .then(media => {
      return response.status(200).json({
        status: 'success',
        media
      });
    })
    .catch(error => {
      response.status(500).json({
        message: "media not found",
        error
      });
    });
});

server.listen(app.get('port'), () => {
  console.log(`Express intro running on localhost: ${app.get('port')}`);
});

module.exports = app;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.set('port', process.env.PORT || 3000);
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/api/v1/riders/:id/results', (request, response) => {
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
      response.status(500).json({ error });
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
      response.status(500).json({ error });
    });
});

app.post('/api/v1/results', (request, response) => {
  const {
    event_id,
    division_id,
    rider_id,
    run_1,
    run_2,
    run_3,
    final } = request.body;
  
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
        message: 'Success! Your result has been added.',
        resultId: resultId[0] 
      });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/media', (request, response) => {
  const {
    event_id,
    division_id,
    rider_id,
    result_id,
    media_url } = request.body;

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
});

app.delete('/api/v1/media/:id', (request, response) => {
  const mediaId = request.params.id;
  database('media').where({
    id: mediaId
  })
    .del()
    .then(() => {
      response.status(200).send(`Success! media id #${mediaId} had been removed.`);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/results/:id', (request, response) => {
  const resultId = request.params.id;
  database('results').where({
    id: resultId
  })
    .del()
    .then(() => {
      response.status(200).send(`Success! media id #${resultId} had been removed.`);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/results/:id', (request, response) => {
  const resultId = request.params.id;
  const updatedResult = request.body.result;

  return database('results')
    .where({ id: resultId })
    .update(updatedResult)
    .then(result => {
      response.status(203).json({
        status: "success",
        result
      });
    });
});

app.listen(app.get('port'), () => {
  console.log('Express intro running on localhost: 3000');
});

module.exports = app;
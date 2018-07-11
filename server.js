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

app.listen(app.get('port'), () => {
  console.log('Express intro running on localhost: 3000');
});

module.exports = app;
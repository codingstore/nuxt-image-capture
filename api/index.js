const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//fetch('/api',{ method: 'GET'})
app.get('/', (req, res, next) => {
  res.send('test response');
})
app.use('/toimage', require('./toimage'))

module.exports = {
  path: '/api',
  handler: app
}
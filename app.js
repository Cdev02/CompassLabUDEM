const express = require('express');
const app = express();
app.use(express.json());
app.get('/elements', (req, res) => {
  res.send('elements sent');
});
module.exports = app;

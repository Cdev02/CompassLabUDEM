const express = require('express');
const app = express();
const elementsRouter = require(`${__dirname}/routes/elementsRouter`);
app.use(express.json());
app.use('/api/v1/elementos', elementsRouter);
module.exports = app;

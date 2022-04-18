const express = require('express');
const app = express();
const elementsRouter = require(`${__dirname}/routes/elementsRouter`);
const labsRouter = require(`${__dirname}/routes/labsRouter`);
app.use(express.json());
app.use('/api/v1/elementos', elementsRouter);
app.use('/api/v1/laboratorios', labsRouter);
module.exports = app;

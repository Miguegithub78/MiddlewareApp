const express = require('express');
const morgan = require('morgan');

const routers = require('./src/routes/index')

const app = express();

app.use(express.json());
app.use(morgan("dev"));


//Importo las rutas
app.use('/', routers)

module.exports = app;
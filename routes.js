const express = require('express');
const route = express.Router();
const calcController = require('./src/controllers/calcController');
const {middlewareGlobal} = require('./src/middlewares/middleware');

route.get('/', calcController.paginaInicial);
route.post('/salvar-conta', calcController.salvarConta);

module.exports = route;
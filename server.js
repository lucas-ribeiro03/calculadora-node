require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes');
const {middlewareGlobal} = require('./src/middlewares/middleware');


mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log("Conectei à base de dados");
    app.emit("pronto");
  })
  .catch((e) => console.log(e));


app.use(express.json());
app.use(flash());
app.use(routes);
app.use(middlewareGlobal);
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Servidor executando na porta 3000')
        console.log('Acessar http://localhost:3000');
    })
})

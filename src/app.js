const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors')

require('./db.js');

const server = express();

server.name = 'API';
//bodyParser es un moddleware de Express y sirve para manejar la info que viene por body
//en las peticiones HTTP
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
//Esto hace que la informacion que llegue pase a ser un objecto de js
server.use(bodyParser.json({ limit: '50mb' }));
//Sirve para manejar las cookies
server.use(cookieParser());
//morgan sirve para que muestre por consola los logs de las peticiones al back
server.use(morgan('dev'));
//Los header junto con cors sirven para que el servidor no bloquee las solicitudes HTTP
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use(cors())
//Esto hace que al pegarle a la ruta del back redirija al archivo central de las rutas
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

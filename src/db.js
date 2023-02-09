require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_CONN } = process.env
//Se crea una instancia de Sequelize con la configuracion de la DB
const sequelize = new Sequelize(DB_CONN, {

  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

//El codigo desde la linea 14 a 28 sirve para traer de forma automatica todos los modelos que se hayan creado
const basename = path.basename(__filename);
const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
//const { Animal, Size } = sequelize.models

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

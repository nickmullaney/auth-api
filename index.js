'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/models');
const PORT = process.env.PORT || 3001

db.sync().then(() => {
  console.log('Successful DB connection');
  app.start(PORT);
}).catch((e) => console.error(e));


// require('dotenv').config();
// const { db } = require('./src/models');
// const server = require('./src/server.js');

// db.sync().then(() => {
//   server.start(PORT);
// });

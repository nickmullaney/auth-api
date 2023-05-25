'use strict';

require('dotenv').config();
const server = require('./src/server.js');
const { db } = require('./src/models');
const PORT = process.env.PORT || 3001

db.sync().then(() => {
  console.log('Successful DB connection');
  server.start(PORT);
}).catch((e) => console.error(e));

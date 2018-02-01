const path = require('path');
const jsonServer = require('json-server');
const ip = require('ip').address();
const createDB = require('./db.js');
const mounted = require('./route');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const DB = createDB();
const router = jsonServer.router(DB);

server.use(jsonServer.bodyParser);
server.use(middlewares);

mounted(server, DB);
server.use(router);

server.listen(
   {
      host: ip,
      port: 3122
   },
   function() {
      console.log(`JSON Server is running in http://${ip}:3122`);
   }
);

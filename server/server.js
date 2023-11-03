import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socket } from './sockets/socket.js';

const path = require('path');

const app = express();
const server = createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
const io = new Server(server);

io.on('connection', (client) => {
  socket(client);
});

server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});

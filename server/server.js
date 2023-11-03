import express from 'express';
import { createServer } from 'node:http';
const { join } = require('node:path');
import { Server } from 'socket.io';

//import http  from 'http';

const path = require('path');

const app = express();
const server = createServer(app);
//let server = http.createServer(app);

// const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

// app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});
// IO = esta es la comunicacion del backend
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
});

// io.on('connection', (client) => {
//   client.emit('enviarMensaje', {
//     usuario: 'Administrador',
//     mensaje: 'Bienvenido a esta aplicación',
//   });
// });

app.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});

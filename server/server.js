import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
//import { createServer } from 'http';
//import { Server } from 'socket.io';
import socket from 'socket.io';

import morgan from 'morgan';
import path from 'path';
import './database/dbConnection';

import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messagesRoute.js';

dotenv.config();
const app = express();
//const server = createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
//const io = new Server(server);

// io.on('connection', (client) => {
//   socket(client);
// });

const server = app.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Server Startes on Port ${port}`);
});

app.use(`/api/auth`, userRouter);
app.use(`/api/messages`, messageRouter);

//socket
const io = socket(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.broadcast.to(sendUserSocket).emit('msg-recieve', data.message);
    }
  });
});

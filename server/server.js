import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socket } from './sockets/socket.js';
import path from 'path';
import './database/dbConnection';

dotenv.config();
const app = express();
const server = createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
const io = new Server(server);

io.on('connection', (client) => {
  socket(client);
});

server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Server Startes on Port ${port}`);
});

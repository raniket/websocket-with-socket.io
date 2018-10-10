const express = require('express');
const socket = require('socket.io');
const app = express();
const dotenv = require('dotenv');

if (process.env.NODE_ENV==='test') {
  dotenv.config();
}

const PORT = `${process.env.PORT}`;

app.use(express.static('public'));



const server = app.listen(PORT, () => {
  console.log('Server started on ', PORT);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client connected, id is: ', socket.id);
  // listen for event(chat event) from client.
  socket.on('chat', (data) => {
    // all your business logic goes here.
    // emit chat event to all the connected clients.
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  })
});

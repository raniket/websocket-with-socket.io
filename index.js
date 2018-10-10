const express = require('express');
const socket = require('socket.io');
const app = express();
const dotenv = require('dotenv');
console.log('env: ', process.env.NODE_ENV);
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
  console.log('Client connected id is: ', socket.id);
});
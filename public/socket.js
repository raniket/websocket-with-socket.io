// Make connection
const socket = io('http://localhost:4000');

// Create handle for all the required elements
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const btn = document.getElementById('send');

// Emit event on socket on typing
message.addEventListener('keypress', () => {
  socket.emit('typing', {
    name: handle.value
  });
})

// Emit event on socket on 'send' button click
btn.addEventListener('click', () => {
  socket.emit('chat', {
    handle: handle.value,
    message: message.value
  })
});

// Listen for events from server on chat
socket.on('chat', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ': </strong> ' + data.message + '</p>';
});

// Listen for events from server on typing
socket.on('typing', (data) => {
  feedback.innerHTML = '<p><em>' + data.name + '</em> is typing...</p>';
});

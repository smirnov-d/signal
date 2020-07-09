
const PORT = process.env.PORT || 3000

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('system server');
  socket.on('system', (data) => {
    console.log('offer', data);
    io.emit('offer', data);
  });
  socket.on('systemanswer', (data) => {
    console.log('system-answer', data);
    io.emit('answer', data);
  });
  socket.on('new-icecandidate', (data) => {
    console.log('new-icecandidate', data);
    socket.broadcast.emit('new-icecandidate', data);
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

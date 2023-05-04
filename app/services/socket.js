import socketIo from 'socket.io';

const setUpSocketIo = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A client connected!');

    socket.on('disconnect', () => {
      console.log('A client disconnected.');
    });
  });

  return io;
};

export default setUpSocketIo;

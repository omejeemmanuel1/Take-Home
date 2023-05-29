import { Server, Socket } from 'socket.io';

// Create a Socket.IO server instance
const io = new Server();

// Event handler for new connections
io.on('connection', (socket: Socket) => {
  console.log('A new client connected');

  // Event handler for disconnections
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

export default io;

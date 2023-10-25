// websocketSingleton.js
import io from 'socket.io-client';
let socketInstance = null;

export const getSocketInstance = () => {
  if (!socketInstance) {
    socketInstance = io('http://localhost:3001'); // Change the URL accordingly
  }
  return socketInstance;
};

import { useContext } from 'react';
import { SocketContext } from '../components/providers/socket';
import { Socket } from 'socket.io-client';

function useSocket(): {
  socket: Socket;
} {
  const { socket } = useContext(SocketContext);
  return { socket };
}

export default useSocket;

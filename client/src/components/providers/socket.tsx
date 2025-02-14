import { createContext, ReactNode, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket;
}

export const SocketContext = createContext({} as ISocketContext);

function SocketProvider({ children }: { children: ReactNode }) {
  const socket = io('http://localhost:4000', { autoConnect: true });

  useEffect(() => {
    socket.on('error', (data) => {
      console.error('🚀 ~ useEffect ~ data:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socket as any,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;

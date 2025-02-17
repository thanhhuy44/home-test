import { useToast } from '../../hooks/use-toast';
import { createContext, ReactNode, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket;
}

export const SocketContext = createContext({} as ISocketContext);

const socket = io('http://localhost:4000', {
  reconnection: true,
});

function SocketProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  useEffect(() => {
    socket.on('error', (data) => {
      console.error('🚀 ~ useEffect ~ data:', data);
      toast({
        title: 'Error',
        description: data.message,
        variant: 'destructive',
      });
    });
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

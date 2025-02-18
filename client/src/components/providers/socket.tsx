import { useAuth } from '../../store/auth';
import { useToast } from '../../hooks/use-toast';
import { createContext, ReactNode, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket;
}

export const SocketContext = createContext({} as ISocketContext);

const socket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
  reconnection: true,
});

function SocketProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const { onLogout } = useAuth();

  useEffect(() => {
    socket.on('error', (data) => {
      if (data.event === 'user:login') {
        onLogout();
      }
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

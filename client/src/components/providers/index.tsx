import { ReactNode } from 'react';
import SocketProvider from './socket';
import QueryClientProvider from './query';

function Providers({ children }: { children: ReactNode }) {
  return (
    <SocketProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </SocketProvider>
  );
}

export default Providers;

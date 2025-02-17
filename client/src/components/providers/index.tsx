import { ReactNode } from 'react';
import SocketProvider from './socket';
import QueryClientProvider from './query';
import { Toaster } from '../ui/toaster';

function Providers({ children }: { children: ReactNode }) {
  return (
    <SocketProvider>
      <QueryClientProvider>
        {children}
        <Toaster />
      </QueryClientProvider>
    </SocketProvider>
  );
}

export default Providers;

import { ReactNode } from 'react';

function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh flex items-center justify-center">{children}</div>;
}

export default AuthLayout;

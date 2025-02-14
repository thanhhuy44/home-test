import { FC, JSX, ReactNode } from 'react';
import MainLayout from '../components/layouts/main-layout';
import Home from '../pages/home';
import Login from '../pages/login';
import AuthLayout from '../components/layouts/auth-layout';
import Chat from '../pages/chat';

type AppRoute = {
  path: string;
  layout: ({ children }: { children: ReactNode }) => JSX.Element;
  page: FC;
  auth?: boolean;
};

export const routes: AppRoute[] = [
  {
    path: '/login',
    layout: AuthLayout,
    page: Login,
    auth: false,
  },
  {
    path: '/',
    layout: MainLayout,
    page: Home,
    auth: true,
  },
  {
    path: '/chat/:id',
    layout: MainLayout,
    page: Chat,
    auth: true,
  },
];

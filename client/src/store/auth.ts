import { create } from 'zustand';
import { User } from '../types';

type AuthStore = {
  isLogin: boolean;
  user: User | undefined;
  onLogin: (payload: User) => void;
  onLogout: () => void;
};

export const useAuth = create<AuthStore>((set) => ({
  isLogin: JSON.parse(localStorage.getItem('isLogin') ?? 'false'),
  user: JSON.parse(localStorage.getItem('user') ?? 'null'),
  onLogin: (payload) => {
    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('user', JSON.stringify(payload));
    set({
      isLogin: true,
      user: payload,
    });
  },
  onLogout: () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('user');
    set({
      isLogin: false,
      user: undefined,
    });
  },
}));

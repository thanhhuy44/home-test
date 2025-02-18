import { create } from 'zustand';
import { User } from '../types';

type AuthStore = {
  isLogin: boolean;
  user: User | undefined;
  onLogin: (payload: User) => void;
  onLogout: () => void;
};

export const useAuth = create<AuthStore>((set) => ({
  isLogin: false,
  user: undefined,
  onLogin: (payload) => {
    set({
      isLogin: true,
      user: payload,
    });
  },
  onLogout: () => {
    set({
      isLogin: false,
      user: undefined,
    });
  },
}));

import { create } from 'zustand';
import { User } from '../types';

type ChatStore = {
  receiver?: User;
  setReceiver: (payload: User | undefined) => void;
};

export const useChat = create<ChatStore>((set) => ({
  receiver: localStorage.getItem('receiver')
    ? JSON.parse(localStorage.getItem('receiver') as string)
    : undefined,
  setReceiver: (payload) => {
    localStorage.setItem('receiver', JSON.stringify(payload));
    set({
      receiver: payload,
    });
  },
}));

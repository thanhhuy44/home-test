import { create } from 'zustand';
import { User } from '../types';

type ChatStore = {
  receiver?: User;
  setReceiver: (payload: User | undefined) => void;
};

export const useChat = create<ChatStore>((set) => ({
  receiver: undefined,
  setReceiver: (payload) => {
    set({
      receiver: payload,
    });
  },
}));

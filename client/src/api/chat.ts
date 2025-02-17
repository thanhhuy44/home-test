import request from '../lib/axios';
import { Message } from '../types';

export const ChatApi = {
  getMessages: async (user: string, receiver: string): Promise<Message[]> => {
    return await request.get(`/messages/history/${user}/${receiver}`);
  },
};

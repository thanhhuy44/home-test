import request from '../lib/axios';
import { User } from '../types';

export const UserApi = {
  getOnlineUsers: async (): Promise<User[]> => {
    return await request.get('/users/online');
  },
};

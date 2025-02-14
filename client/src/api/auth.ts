import request from '../lib/axios';
import { User } from '../types';

export const AuthApi = {
  login: async (body: { username: string }): Promise<User> => {
    return request.post('/auth/login', body);
  },
};

export type User = {
  id: string;
  username: string;
  isOnline: boolean;
};

export type Message = {
  id: string;
  message: string;
  receiver: User;
  sender: User;
  timestamp: number;
};

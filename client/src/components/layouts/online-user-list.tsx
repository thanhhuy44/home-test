import { useQuery } from '@tanstack/react-query';
import { UserApi } from '../../api/user';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getFallbackName } from '../../lib/helpers';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSocket from '../../hooks/use-socket';
import { User } from '../../types';
import { useAuth } from '../../store/auth';
import { useChat } from '../../store/chat';

function OnlineUsersList() {
  const { user, onLogin } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const { socket } = useSocket();
  const { setReceiver } = useChat();

  useQuery({
    queryKey: ['online-users'],
    queryFn: async () => {
      try {
        const response = await UserApi.getOnlineUsers();
        setOnlineUsers(response);
        return response;
      } catch (error) {
        throw new Error('Failed to fetch online users');
      }
    },
  });

  useEffect(() => {
    socket.on('usersOnline', ({ data }: { data: User[] }) => {
      onLogin((data.find((item) => item.username === user?.username) || user) as User);
      setOnlineUsers(data);
    });
  }, []);

  return (
    <div>
      <h6 className="font-semibold text-sm">Active Users</h6>
      <div className="space-y-2 mt-4">
        {onlineUsers
          .filter((item) => item.username !== user?.username)
          .map((user) => (
            <Link
              to={`/chat/${user.id}`}
              key={user.id}
              className="flex items-center gap-x-1 duration-150 hover:bg-secondary py-1 px-2"
              onClick={() => setReceiver(user)}
            >
              <div className="relative">
                <Avatar>
                  <AvatarFallback>{getFallbackName(user.username)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 size-2 rounded-full bg-green-400"></div>
              </div>
              <p>{user.username}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default OnlineUsersList;

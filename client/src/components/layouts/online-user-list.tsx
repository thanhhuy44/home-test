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
import { useSidebar } from '../ui/sidebar';
import { cn } from '../../lib/utils';

function OnlineUsersList() {
  const { setOpenMobile } = useSidebar();
  const { user, onLogin } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const { socket } = useSocket();
  const { receiver, setReceiver } = useChat();

  useQuery({
    queryKey: ['online-users'],
    queryFn: async () => {
      try {
        const response = await UserApi.getOnlineUsers();
        setOnlineUsers(response.filter((item) => item.username !== user?.username));
        return response;
      } catch (error) {
        console.error('🚀 ~ queryFn: ~ error:', error);
        throw new Error('Failed to fetch online users');
      }
    },
  });

  useEffect(() => {
    socket.on('usersOnline', ({ data }: { data: User[] }) => {
      onLogin((data.find((item) => item.username === user?.username) || user) as User);
      setOnlineUsers(data.filter((item) => item.username !== user?.username));
    });
    return () => {
      socket.off('usersOnline');
    };
  }, []);

  return (
    <div className="min-h-full">
      {onlineUsers.length ? (
        <>
          <h6 className="font-semibold text-xs">Active Users</h6>
          <div className="space-y-2 mt-2">
            {onlineUsers
              .filter((item) => item.username !== user?.username)
              .map((user) => {
                const isActive = receiver && user.id === receiver.id;
                return (
                  <Link
                    to={`/chat/${user.id}`}
                    key={user.id}
                    className={cn(
                      'flex items-center gap-x-1 duration-150 hover:bg-secondary py-1 px-2 rounded border',
                      isActive ? 'border-gray-200' : 'border-transparent',
                    )}
                    onClick={() => {
                      setReceiver(user);
                      setOpenMobile(false);
                    }}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-sky-600 text-white font-medium">
                          {getFallbackName(user.username)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-1 right-1 size-2 rounded-full bg-green-400"></div>
                    </div>
                    <p>{user.username}</p>
                  </Link>
                );
              })}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-xs text-gray-400">No active user</p>
        </div>
      )}
    </div>
  );
}

export default OnlineUsersList;

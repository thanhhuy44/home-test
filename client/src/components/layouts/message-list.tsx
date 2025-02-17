import { useQuery } from '@tanstack/react-query';
import useSocket from '../../hooks/use-socket';
import { useChat } from '../../store/chat';
import { useEffect } from 'react';
import { useAuth } from '../../store/auth';
import { ChatApi } from '../../api/chat';
import MessageItem from './message-item';

function MessageList() {
  const { user } = useAuth();
  const { receiver } = useChat();
  const { socket } = useSocket();

  const { data, refetch } = useQuery({
    queryKey: ['message-list'],
    queryFn: async () => {
      try {
        const response = await ChatApi.getMessages(user?.id ?? '', receiver?.id ?? '');
        return response;
      } catch (error) {
        console.error('🚀 ~ message list mutationFn: ~ error:', error);
        throw new Error('Failed to fetch messages');
      }
    },
    refetchOnMount: true,
  });

  useEffect(() => {
    if (receiver) {
      socket.on('message:receive', () => {
        refetch();
      });
    }
  }, [receiver]);

  return (
    <div className="space-y-1">
      {data ? data.map((message) => <MessageItem {...message} key={message.id} />) : null}
    </div>
  );
}

export default MessageList;

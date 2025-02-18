import { ArrowLeft } from 'lucide-react';
import { getFallbackName } from '../../lib/helpers';
import { useChat } from '../../store/chat';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useSidebar } from '../ui/sidebar';
import { useEffect } from 'react';
import useSocket from '../../hooks/use-socket';
import { User } from '../../types';
import { useNavigate } from 'react-router-dom';

function ChatHeader() {
  const { socket } = useSocket();
  const { receiver, setReceiver } = useChat();
  const { setOpenMobile } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('usersOnline', ({ data }: { data: User[] }) => {
      const existReceiver = data.find((item) => item.id === receiver?.id);
      if (!existReceiver) {
        setReceiver(undefined);
        navigate('/');
      }
    });
  }, [receiver]);

  if (!receiver) {
    return null;
  }

  return (
    <div className="px-4 py-2 border-b">
      <div className="container">
        <div className="flex items-center gap-3">
          <ArrowLeft onClick={() => setOpenMobile(true)} className="size-4 md:hidden" />
          <div className="relative">
            <Avatar>
              <AvatarFallback className="!bg-sky-600 text-white font-medium">
                {getFallbackName(receiver.username)}
              </AvatarFallback>
            </Avatar>
            {receiver.online ? (
              <div className="absolute bottom-1 right-1 size-2 rounded-full bg-green-400"></div>
            ) : null}
          </div>
          <h6 className="font-bold">{receiver.username}</h6>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;

import { getFallbackName } from '../../lib/helpers';
import { useChat } from '../../store/chat';
import { Avatar, AvatarFallback } from '../ui/avatar';

function ChatHeader() {
  const { receiver } = useChat();

  if (!receiver) {
    return null;
  }

  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar>
            <AvatarFallback>{getFallbackName(receiver.username)}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 size-2 rounded-full bg-green-400"></div>
        </div>
        <h6 className="font-bold">{receiver.username}</h6>
      </div>
    </div>
  );
}

export default ChatHeader;

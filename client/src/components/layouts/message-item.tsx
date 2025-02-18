import { cn } from '../../lib/utils';
import { useAuth } from '../../store/auth';
import { Message } from '../../types';

function MessageItem({ message, sender }: Message) {
  const { user } = useAuth();
  const isSender = user?.id === sender.id;
  return (
    <div className={cn('flex w-full', isSender ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'w-fit max-w-[85%] rounded-md py-2 px-3 break-words',
          isSender ? 'bg-sky-600 text-white' : 'border',
        )}
      >
        {message}
      </div>
    </div>
  );
}

export default MessageItem;

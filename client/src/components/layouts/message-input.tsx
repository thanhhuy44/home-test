import { Send } from 'lucide-react';
import { useChat } from '../../store/chat';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import useSocket from '../../hooks/use-socket';

function MessageInput() {
  const { socket } = useSocket();
  const { receiver } = useChat();
  const [value, setValue] = useState('');

  const onSubmit = () => {
    if (value && value.trim()) {
      socket.emit('message:send', { receiver, message: value });
      setValue('');
    }
  };

  if (!receiver) {
    return null;
  }

  return (
    <div className="flex items-start gap-3">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit();
          }
          if (event.shiftKey && event.key === 'Enter') {
            event.preventDefault();
            setValue((prev) => prev + '\n');
          }
        }}
      />
      <Button onClick={onSubmit} variant="outline">
        <Send />
      </Button>
    </div>
  );
}

export default MessageInput;

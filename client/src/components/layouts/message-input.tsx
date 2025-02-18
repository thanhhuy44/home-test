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
  const [rows, setRows] = useState(1);

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
    <div className="container px-4 py-2">
      <div className="flex items-start gap-3">
        <Textarea
          placeholder="Aa"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={rows}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onSubmit();
            }
            if (event.shiftKey && event.key === 'Enter') {
              event.preventDefault();
              setRows((prev) => (prev >= 5 ? prev : prev + 1));
              setValue((prev) => prev + '\n');
            }
          }}
        />
        <Send className="size-6 text-sky-600" onClick={onSubmit} />
      </div>
    </div>
  );
}

export default MessageInput;

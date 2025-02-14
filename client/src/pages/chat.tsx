import { useParams } from 'react-router-dom';
import MessageList from '../components/layouts/message-list';
import MessageInput from '../components/layouts/message-input';

function Chat() {
  const { id } = useParams();
  console.log('🚀 ~ Chat ~ id:', id);
  return (
    <div>
      <MessageList />
      <MessageInput />
    </div>
  );
}

export default Chat;

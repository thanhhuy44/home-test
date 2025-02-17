import MessageList from '../components/layouts/message-list';
import MessageInput from '../components/layouts/message-input';
import ChatHeader from '../components/layouts/chat-header';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat() {
  return (
    <div className="mx-auto max-w-3xl flex flex-col h-full overflow-hidden gap-y-3 px-4">
      <ChatHeader />
      <div className="flex-1 relative">
        <ScrollToBottom className="!absolute inset-0 overflow-y-auto">
          <MessageList />
        </ScrollToBottom>
      </div>
      <MessageInput />
    </div>
  );
}

export default Chat;

import type { Chat, User } from '@/types';
import { cn } from '@/lib/utils';

interface ChatListItemProps {
  chat: Chat & { otherUser?: User; unreadCount?: number };
  onClick?: () => void;
  className?: string;
}

export function ChatListItem({ chat, onClick, className }: ChatListItemProps) {
  const lastMessage = chat.messages[chat.messages.length - 1];
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(messageDate);
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(messageDate);
    } else {
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(messageDate);
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 p-4 bg-[#221550] rounded-xl cursor-pointer',
        'hover:bg-[#2A1B60] transition-colors',
        className
      )}
    >
      <img
        src={chat.otherUser?.avatarUrl || 'https://via.placeholder.com/50'}
        alt={chat.otherUser?.fullName || 'User'}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white truncate">
            {chat.otherUser?.fullName || 'Unknown User'}
          </h3>
          {lastMessage && (
            <span className="text-xs text-[#A0A0C0] flex-shrink-0 ml-2">
              {formatTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        {lastMessage ? (
          <p className={cn(
            'text-sm truncate mt-0.5',
            chat.unreadCount ? 'text-white font-medium' : 'text-[#A0A0C0]'
          )}>
            {lastMessage.text}
          </p>
        ) : (
          <p className="text-sm text-[#A0A0C0] mt-0.5">No messages yet</p>
        )}
      </div>
      {chat.unreadCount ? (
        <div className="w-5 h-5 rounded-full bg-[#6C3FE0] flex items-center justify-center flex-shrink-0">
          <span className="text-xs text-white font-medium">{chat.unreadCount}</span>
        </div>
      ) : null}
    </div>
  );
}

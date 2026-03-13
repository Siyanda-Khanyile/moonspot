import type { Message } from '@/types';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isSent: boolean;
  className?: string;
}

export function MessageBubble({ message, isSent, className }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  return (
    <div
      className={cn(
        'flex w-full',
        isSent ? 'justify-end' : 'justify-start',
        className
      )}
    >
      <div
        className={cn(
          'max-w-[75%] px-4 py-2.5 rounded-2xl',
          isSent
            ? 'bg-[#6C3FE0] text-white rounded-br-md'
            : 'bg-white text-[#1A1040] rounded-bl-md'
        )}
      >
        <p className="text-sm">{message.text}</p>
        <span
          className={cn(
            'text-xs mt-1 block',
            isSent ? 'text-white/70' : 'text-[#1A1040]/60'
          )}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

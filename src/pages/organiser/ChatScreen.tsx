import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Phone, Video, MoreVertical, Paperclip, Camera, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { useAuth } from '@/contexts/AuthContext';
import type { Chat } from '@/types';

interface ChatScreenProps {
  chat: Chat;
  onBack: () => void;
}

export function ChatScreen({ chat, onBack }: ChatScreenProps) {
  const { currentUser, sendMessage, getArtistById, mockUsers, bookings } = useAuth();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherUserId = chat.participants.find(id => id !== currentUser?.id);
  const otherUser = mockUsers.find(u => u.id === otherUserId);
  const booking = bookings.find(b => b.id === chat.bookingId);
  const artist = booking ? getArtistById(booking.artistId) : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    sendMessage(chat.chatId, messageText.trim());
    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1040] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#221550] border-b border-white/10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 -ml-1 text-white hover:text-[#A0A0C0] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img
            src={otherUser?.avatarUrl || 'https://via.placeholder.com/50'}
            alt={otherUser?.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-white text-sm">{otherUser?.fullName}</h2>
            <p className="text-xs text-[#00C37A]">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-white hover:text-[#A0A0C0] transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-white hover:text-[#A0A0C0] transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-white hover:text-[#A0A0C0] transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Booking Info */}
      {booking && artist && (
        <div className="px-4 py-2 bg-[#2A1B60] border-b border-white/10">
          <p className="text-xs text-[#A0A0C0]">
            Booking: <span className="text-white">{booking.eventName}</span> with{' '}
            <span className="text-white">{artist.name}</span>
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {chat.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-[#A0A0C0] text-center">
              No messages yet
            </p>
            <p className="text-sm text-[#A0A0C0]/70 text-center mt-1">
              Start the conversation!
            </p>
          </div>
        ) : (
          chat.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isSent={message.senderId === currentUser?.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-[#221550] border-t border-white/10">
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#A0A0C0] hover:text-white transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#A0A0C0] hover:text-white transition-colors">
            <Camera className="w-5 h-5" />
          </button>
          <Input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type here..."
            className="flex-1 h-10 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-full px-4"
          />
          <Button
            onClick={handleSend}
            disabled={!messageText.trim()}
            className="w-10 h-10 p-0 bg-[#6C3FE0] hover:bg-[#5A32C0] disabled:bg-[#6C3FE0]/50 rounded-full flex items-center justify-center"
          >
            {messageText.trim() ? (
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

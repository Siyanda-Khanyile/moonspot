import { MessageSquare } from 'lucide-react';
import { ChatListItem } from '@/components/chat/ChatListItem';
import { useAuth } from '@/contexts/AuthContext';
import type { Chat } from '@/types';

interface AdminMessagesScreenProps {
  onViewChat: (chat: Chat) => void;
}

export function AdminMessagesScreen({ onViewChat }: AdminMessagesScreenProps) {
  const { currentUser, getChatsByUser, mockUsers } = useAuth();

  const chats = currentUser ? getChatsByUser(currentUser.id) : [];
  
  // Enrich chats with user data
  const enrichedChats = chats.map(chat => {
    const otherUserId = chat.participants.find(id => id !== currentUser?.id);
    const otherUser = mockUsers.find(u => u.id === otherUserId);
    const unreadCount = chat.messages.filter(m => m.senderId !== currentUser?.id && !m.read).length;
    return { ...chat, otherUser, unreadCount };
  });

  return (
    <div className="min-h-screen bg-[#1A1040] pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-white mb-2">Messages</h1>
        <p className="text-sm text-[#A0A0C0]">Chat with event organisers</p>
      </div>

      {/* Chats List */}
      <div className="px-4 py-4">
        {enrichedChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#221550] flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-[#A0A0C0]" />
            </div>
            <p className="text-[#A0A0C0] text-center">
              No active chats
            </p>
            <p className="text-sm text-[#A0A0C0]/70 text-center mt-1">
              Chats appear when you accept bookings
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {enrichedChats.map((chat) => (
              <ChatListItem
                key={chat.chatId}
                chat={chat}
                onClick={() => onViewChat(chat)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

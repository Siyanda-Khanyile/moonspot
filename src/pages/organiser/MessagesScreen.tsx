import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatListItem } from '@/components/chat/ChatListItem';
import { useAuth } from '@/contexts/AuthContext';
import type { Chat } from '@/types';
import { cn } from '@/lib/utils';

interface MessagesScreenProps {
  onViewChat: (chat: Chat) => void;
}

type ChatTab = 'all' | 'favourites';

export function MessagesScreen({ onViewChat }: MessagesScreenProps) {
  const { currentUser, getChatsByUser, mockUsers } = useAuth();
  const [activeTab, setActiveTab] = useState<ChatTab>('all');

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
        <h1 className="text-xl font-bold text-white mb-4">Chats</h1>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['all', 'favourites'] as ChatTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeTab === tab
                  ? 'bg-[#6C3FE0] text-white'
                  : 'bg-[#221550] text-[#A0A0C0] hover:bg-[#2A1B60]'
              )}
            >
              {tab === 'all' ? 'All Chats' : 'Favourites'}
            </button>
          ))}
        </div>
      </div>

      {/* Chats List */}
      <div className="px-4 py-4">
        {enrichedChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#221550] flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-[#A0A0C0]" />
            </div>
            <p className="text-[#A0A0C0] text-center">
              No chats yet
            </p>
            <p className="text-sm text-[#A0A0C0]/70 text-center mt-1">
              Chats will appear when your bookings are accepted
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

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, UserRole, Artist, Booking, Chat, BookingStatus } from '@/types';
import { mockUsers, mockArtists, mockBookings, mockChats } from '@/data/mockData';

interface AuthContextType {
  // User state
  currentUser: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  
  // Data state
  artists: Artist[];
  bookings: Booking[];
  chats: Chat[];
  mockUsers: User[];
  
  // Auth actions
  login: (email: string, _password: string) => Promise<boolean>;
  register: (fullName: string, email: string, _password: string) => Promise<boolean>;
  logout: () => void;
  
  // Data actions
  addArtist: (artist: Omit<Artist, 'id'>) => void;
  updateArtist: (id: string, updates: Partial<Artist>) => void;
  deleteArtist: (id: string) => void;
  
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  
  sendMessage: (chatId: string, text: string) => void;
  
  // Getters
  getArtistById: (id: string) => Artist | undefined;
  getBookingById: (id: string) => Booking | undefined;
  getChatById: (id: string) => Chat | undefined;
  getBookingsByOrganiser: (organiserId: string) => Booking[];
  getChatsByUser: (userId: string) => Chat[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [artists, setArtists] = useState<Artist[]>(mockArtists);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [chats, setChats] = useState<Chat[]>(mockChats);

  const isAuthenticated = !!currentUser;
  const userRole = currentUser?.role || null;

  // Auth actions
  const login = useCallback(async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    
    // For demo purposes, allow any login with these credentials
    if (email === 'admin@moonspot.com') {
      setCurrentUser(mockUsers[0]);
      return true;
    }
    if (email === 'organiser@demo.com') {
      setCurrentUser(mockUsers[1]);
      return true;
    }
    
    return false;
  }, []);

  const register = useCallback(async (fullName: string, email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create new organiser user
    const newUser: User = {
      id: `org-${Date.now()}`,
      fullName,
      email,
      role: 'organiser',
      createdAt: new Date(),
    };
    
    setCurrentUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  // Artist actions
  const addArtist = useCallback((artist: Omit<Artist, 'id'>) => {
    const newArtist: Artist = {
      ...artist,
      id: `artist-${Date.now()}`,
    };
    setArtists(prev => [...prev, newArtist]);
  }, []);

  const updateArtist = useCallback((id: string, updates: Partial<Artist>) => {
    setArtists(prev => prev.map(artist => 
      artist.id === id ? { ...artist, ...updates } : artist
    ));
  }, []);

  const deleteArtist = useCallback((id: string) => {
    setArtists(prev => prev.filter(artist => artist.id !== id));
  }, []);

  // Booking actions
  const createBooking = useCallback((booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setBookings(prev => [...prev, newBooking]);
  }, []);

  const updateBookingStatus = useCallback((bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(booking => {
      if (booking.id === bookingId) {
        const updated = { ...booking, status, updatedAt: new Date() };
        
        // Create chat thread when booking is accepted
        if (status === 'active' && booking.status !== 'active') {
          const newChat: Chat = {
            chatId: `chat-${Date.now()}`,
            bookingId: booking.id,
            participants: [booking.organiserId, 'admin-1'],
            messages: [],
            createdAt: new Date(),
          };
          setChats(prevChats => [...prevChats, newChat]);
        }
        
        return updated;
      }
      return booking;
    }));
  }, []);

  // Message actions
  const sendMessage = useCallback((chatId: string, text: string) => {
    if (!currentUser) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date(),
      read: false,
    };
    
    setChats(prev => prev.map(chat => 
      chat.chatId === chatId 
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    ));
  }, [currentUser]);

  // Getters
  const getArtistById = useCallback((id: string) => {
    return artists.find(a => a.id === id);
  }, [artists]);

  const getBookingById = useCallback((id: string) => {
    return bookings.find(b => b.id === id);
  }, [bookings]);

  const getChatById = useCallback((id: string) => {
    return chats.find(c => c.chatId === id);
  }, [chats]);

  const getBookingsByOrganiser = useCallback((organiserId: string) => {
    return bookings.filter(b => b.organiserId === organiserId);
  }, [bookings]);

  const getChatsByUser = useCallback((userId: string) => {
    return chats.filter(c => c.participants.includes(userId));
  }, [chats]);

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      userRole,
      artists,
      bookings,
      chats,
      mockUsers,
      login,
      register,
      logout,
      addArtist,
      updateArtist,
      deleteArtist,
      createBooking,
      updateBookingStatus,
      sendMessage,
      getArtistById,
      getBookingById,
      getChatById,
      getBookingsByOrganiser,
      getChatsByUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

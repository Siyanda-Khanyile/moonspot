// User Types
export type UserRole = 'admin' | 'organiser';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
}

// Artist Types
export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  spotify?: string;
}

export interface Artist {
  id: string;
  name: string;
  realName?: string;
  photoUrl: string;
  bannerImageUrl?: string;
  genre: string;
  category: string;
  bio?: string;
  location?: string;
  isVerified: boolean;
  socialLinks?: SocialLinks;
  isActive: boolean;
}

// Booking Types
export type BookingStatus = 'pending' | 'active' | 'cancelled' | 'visited';

export interface Booking {
  id: string;
  artistId: string;
  organiserId: string;
  eventName: string;
  eventDate: Date;
  duration: string;
  location: string;
  riders?: string;
  eventType: string;
  notes?: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Chat {
  chatId: string;
  bookingId: string;
  participants: string[];
  messages: Message[];
  createdAt: Date;
}

// Genre Types
export interface Genre {
  id: string;
  name: string;
  gradient: string;
  icon: string;
}

// Filter Types
export type ArtistFilter = 'all' | 'producers' | 'bands' | 'electronic' | 'afro-tech' | 'amapiano';

// Event Type Options
export const EVENT_TYPES = [
  'Private Party',
  'Concert',
  'Corporate',
  'Festival',
  'Wedding',
  'Club Event',
  'Other'
] as const;

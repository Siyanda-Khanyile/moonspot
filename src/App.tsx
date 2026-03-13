import { useState, useEffect } from 'react';
import { OnboardingScreen } from '@/pages/auth/OnboardingScreen';
import { SignUpScreen } from '@/pages/auth/SignUpScreen';
import { SignInScreen } from '@/pages/auth/SignInScreen';
import { PasswordRecoveryScreen } from '@/pages/auth/PasswordRecoveryScreen';
import { AccountCreatedScreen } from '@/pages/auth/AccountCreatedScreen';
import { DiscoveryScreen } from '@/pages/organiser/DiscoveryScreen';
import { ArtistBrowseScreen } from '@/pages/organiser/ArtistBrowseScreen';
import { ArtistProfileScreen } from '@/pages/organiser/ArtistProfileScreen';
import { BookingRequestScreen } from '@/pages/organiser/BookingRequestScreen';
import { BookingsScreen } from '@/pages/organiser/BookingsScreen';
import { MessagesScreen } from '@/pages/organiser/MessagesScreen';
import { ChatScreen } from '@/pages/organiser/ChatScreen';
import { SettingsScreen } from '@/pages/organiser/SettingsScreen';
import { AdminDashboardScreen } from '@/pages/admin/AdminDashboardScreen';
import { BookingDetailScreen } from '@/pages/admin/BookingDetailScreen';
import { ArtistManagementScreen } from '@/pages/admin/ArtistManagementScreen';
import { ArtistFormScreen } from '@/pages/admin/ArtistFormScreen';
import { AdminMessagesScreen } from '@/pages/admin/AdminMessagesScreen';
import { AdminSettingsScreen } from '@/pages/admin/AdminSettingsScreen';
import { BottomNav } from '@/components/navigation/BottomNav';
import { useAuth } from '@/contexts/AuthContext';
import type { Artist, Booking, Chat } from '@/types';

// Auth Flow Screens
type AuthScreen = 'onboarding' | 'signup' | 'signin' | 'forgot-password' | 'account-created';

// Organiser Screens
type OrganiserScreen = 
  | 'discovery' 
  | 'artist-browse' 
  | 'artist-profile' 
  | 'booking-request' 
  | 'bookings' 
  | 'messages' 
  | 'chat' 
  | 'settings';

// Admin Screens
type AdminScreen = 
  | 'dashboard' 
  | 'booking-detail' 
  | 'artists' 
  | 'artist-form' 
  | 'messages' 
  | 'settings';

function App() {
  const { isAuthenticated, userRole, logout } = useAuth();
  
  // Auth flow state
  const [authScreen, setAuthScreen] = useState<AuthScreen>('onboarding');
  
  // Organiser state
  const [organiserScreen, setOrganiserScreen] = useState<OrganiserScreen>('discovery');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  
  // Admin state
  const [adminScreen, setAdminScreen] = useState<AdminScreen>('dashboard');
  const [selectedAdminBooking, setSelectedAdminBooking] = useState<Booking | null>(null);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);

  // Reset to discovery when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setOrganiserScreen('discovery');
      setAdminScreen('dashboard');
    }
  }, [isAuthenticated]);

  // Auth Flow Handlers
  const handleAuthSuccess = () => {
    // User is now authenticated, the useEffect will handle screen routing
  };

  const handleLogout = () => {
    logout();
    setAuthScreen('onboarding');
  };

  // Organiser Handlers
  const handleViewArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setOrganiserScreen('artist-profile');
  };

  const handleBookArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setOrganiserScreen('booking-request');
  };

  const handleViewBooking = (_booking: Booking) => {
    // For organiser, just view - could expand to detail screen
  };

  const handleViewChat = (chat: Chat) => {
    setSelectedChat(chat);
    setOrganiserScreen('chat');
  };

  // Admin Handlers
  const handleAdminViewBooking = (booking: Booking) => {
    setSelectedAdminBooking(booking);
    setAdminScreen('booking-detail');
  };

  const handleEditArtist = (artist: Artist) => {
    setEditingArtist(artist);
    setAdminScreen('artist-form');
  };

  const handleAddArtist = () => {
    setEditingArtist(null);
    setAdminScreen('artist-form');
  };

  // Render Auth Screens
  if (!isAuthenticated) {
    switch (authScreen) {
      case 'onboarding':
        return (
          <OnboardingScreen
            onContinueWithEmail={() => setAuthScreen('signup')}
            onSignIn={() => setAuthScreen('signin')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onBack={() => setAuthScreen('onboarding')}
            onSignIn={() => setAuthScreen('signin')}
            onSuccess={() => setAuthScreen('account-created')}
          />
        );
      case 'account-created':
        return (
          <AccountCreatedScreen
            onSignIn={() => setAuthScreen('signin')}
          />
        );
      case 'signin':
        return (
          <SignInScreen
            onBack={() => setAuthScreen('onboarding')}
            onSignUp={() => setAuthScreen('signup')}
            onForgotPassword={() => setAuthScreen('forgot-password')}
            onSuccess={handleAuthSuccess}
          />
        );
      case 'forgot-password':
        return (
          <PasswordRecoveryScreen
            onBack={() => setAuthScreen('signin')}
            onComplete={() => setAuthScreen('signin')}
          />
        );
      default:
        return (
          <OnboardingScreen
            onContinueWithEmail={() => setAuthScreen('signup')}
            onSignIn={() => setAuthScreen('signin')}
          />
        );
    }
  }

  // Render Admin Portal
  if (userRole === 'admin') {
    const renderAdminScreen = () => {
      switch (adminScreen) {
        case 'dashboard':
          return <AdminDashboardScreen onViewBooking={handleAdminViewBooking} />;
        case 'booking-detail':
          return selectedAdminBooking ? (
            <BookingDetailScreen
              booking={selectedAdminBooking}
              onBack={() => setAdminScreen('dashboard')}
            />
          ) : (
            <AdminDashboardScreen onViewBooking={handleAdminViewBooking} />
          );
        case 'artists':
          return (
            <ArtistManagementScreen
              onAddArtist={handleAddArtist}
              onEditArtist={handleEditArtist}
            />
          );
        case 'artist-form':
          return (
            <ArtistFormScreen
              artist={editingArtist}
              onBack={() => setAdminScreen('artists')}
              onSuccess={() => setAdminScreen('artists')}
            />
          );
        case 'messages':
          return selectedChat ? (
            <ChatScreen
              chat={selectedChat}
              onBack={() => {
                setSelectedChat(null);
                setAdminScreen('messages');
              }}
            />
          ) : (
            <AdminMessagesScreen onViewChat={(chat) => setSelectedChat(chat)} />
          );
        case 'settings':
          return <AdminSettingsScreen onLogout={handleLogout} />;
        default:
          return <AdminDashboardScreen onViewBooking={handleAdminViewBooking} />;
      }
    };

    return (
      <div className="min-h-screen bg-[#1A1040]">
        {renderAdminScreen()}
        <BottomNav
          activeTab={adminScreen === 'booking-detail' ? 'dashboard' : adminScreen}
          onTabChange={(tab) => {
            setSelectedChat(null);
            setAdminScreen(tab as AdminScreen);
          }}
          isAdmin={true}
        />
      </div>
    );
  }

  // Render Organiser Portal
  const renderOrganiserScreen = () => {
    switch (organiserScreen) {
      case 'discovery':
        return (
          <DiscoveryScreen
            onViewArtist={handleViewArtist}
            onBookArtist={handleBookArtist}
            onSearch={() => setOrganiserScreen('artist-browse')}
          />
        );
      case 'artist-browse':
        return (
          <ArtistBrowseScreen
            onBack={() => setOrganiserScreen('discovery')}
            onViewArtist={handleViewArtist}
            onBookArtist={handleBookArtist}
          />
        );
      case 'artist-profile':
        return selectedArtist ? (
          <ArtistProfileScreen
            artist={selectedArtist}
            onBack={() => setOrganiserScreen('discovery')}
            onBook={handleBookArtist}
          />
        ) : (
          <DiscoveryScreen
            onViewArtist={handleViewArtist}
            onBookArtist={handleBookArtist}
            onSearch={() => setOrganiserScreen('artist-browse')}
          />
        );
      case 'booking-request':
        return selectedArtist ? (
          <BookingRequestScreen
            artist={selectedArtist}
            onBack={() => setOrganiserScreen('artist-profile')}
            onSuccess={() => setOrganiserScreen('bookings')}
          />
        ) : (
          <DiscoveryScreen
            onViewArtist={handleViewArtist}
            onBookArtist={handleBookArtist}
            onSearch={() => setOrganiserScreen('artist-browse')}
          />
        );
      case 'bookings':
        return <BookingsScreen onViewBooking={handleViewBooking} />;
      case 'messages':
        return selectedChat ? (
          <ChatScreen
            chat={selectedChat}
            onBack={() => {
              setSelectedChat(null);
              setOrganiserScreen('messages');
            }}
          />
        ) : (
          <MessagesScreen onViewChat={handleViewChat} />
        );
      case 'chat':
        return selectedChat ? (
          <ChatScreen
            chat={selectedChat}
            onBack={() => {
              setSelectedChat(null);
              setOrganiserScreen('messages');
            }}
          />
        ) : (
          <MessagesScreen onViewChat={handleViewChat} />
        );
      case 'settings':
        return <SettingsScreen onLogout={handleLogout} />;
      default:
        return (
          <DiscoveryScreen
            onViewArtist={handleViewArtist}
            onBookArtist={handleBookArtist}
            onSearch={() => setOrganiserScreen('artist-browse')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1040]">
      {renderOrganiserScreen()}
      <BottomNav
        activeTab={organiserScreen === 'artist-profile' || organiserScreen === 'artist-browse' || organiserScreen === 'booking-request' ? 'home' : organiserScreen === 'chat' ? 'messages' : organiserScreen}
        onTabChange={(tab) => {
          setSelectedChat(null);
          setOrganiserScreen(tab as OrganiserScreen);
        }}
        isAdmin={false}
      />
    </div>
  );
}

export default App;

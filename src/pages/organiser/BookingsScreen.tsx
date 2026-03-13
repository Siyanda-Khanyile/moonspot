import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { BookingCard } from '@/components/booking/BookingCard';
import { useAuth } from '@/contexts/AuthContext';
import type { Booking } from '@/types';
import { cn } from '@/lib/utils';

interface BookingsScreenProps {
  onViewBooking: (booking: Booking) => void;
}

type BookingTab = 'all' | 'upcoming' | 'sent' | 'history';

export function BookingsScreen({ onViewBooking }: BookingsScreenProps) {
  const { currentUser, getBookingsByOrganiser } = useAuth();
  const [activeTab, setActiveTab] = useState<BookingTab>('all');

  const bookings = currentUser ? getBookingsByOrganiser(currentUser.id) : [];

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return booking.status === 'active' && new Date(booking.eventDate) > new Date();
    if (activeTab === 'sent') return booking.status === 'pending';
    if (activeTab === 'history') return booking.status === 'cancelled' || booking.status === 'visited';
    return true;
  });

  const tabs: { id: BookingTab; label: string }[] = [
    { id: 'all', label: 'All Bookings' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'sent', label: 'Sent' },
    { id: 'history', label: 'History' },
  ];

  return (
    <div className="min-h-screen bg-[#1A1040] pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-white mb-4">Bookings</h1>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-[#6C3FE0] text-white'
                  : 'bg-[#221550] text-[#A0A0C0] hover:bg-[#2A1B60]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 py-4">
        {filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#221550] flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-[#A0A0C0]" />
            </div>
            <p className="text-[#A0A0C0] text-center">
              No {activeTab !== 'all' ? activeTab : ''} bookings found
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onClick={() => onViewBooking(booking)}
                onResend={booking.status === 'pending' ? () => {} : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

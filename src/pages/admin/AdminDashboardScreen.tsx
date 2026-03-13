import { useState } from 'react';
import { Calendar, Check, X, Eye } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import type { Booking } from '@/types';
import { cn } from '@/lib/utils';

interface AdminDashboardScreenProps {
  onViewBooking: (booking: Booking) => void;
}

type BookingFilter = 'all' | 'pending' | 'active' | 'declined';

export function AdminDashboardScreen({ onViewBooking }: AdminDashboardScreenProps) {
  const { bookings, artists, updateBookingStatus } = useAuth();
  const [activeFilter, setActiveFilter] = useState<BookingFilter>('all');

  const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return booking.status === 'pending';
    if (activeFilter === 'active') return booking.status === 'active';
    if (activeFilter === 'declined') return booking.status === 'cancelled';
    return true;
  });

  const handleAccept = (bookingId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateBookingStatus(bookingId, 'active');
  };

  const handleDecline = (bookingId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateBookingStatus(bookingId, 'cancelled');
  };

  const filters: { id: BookingFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'active', label: 'Accepted' },
    { id: 'declined', label: 'Declined' },
  ];

  return (
    <div className="min-h-screen bg-[#1A1040] pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-white mb-2">Bookings Dashboard</h1>
        <p className="text-sm text-[#A0A0C0]">Manage all booking requests</p>
      </div>

      {/* Stats */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#221550] rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-[#6C3FE0]">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
            <p className="text-xs text-[#A0A0C0]">Pending</p>
          </div>
          <div className="bg-[#221550] rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-[#00C37A]">
              {bookings.filter(b => b.status === 'active').length}
            </p>
            <p className="text-xs text-[#A0A0C0]">Active</p>
          </div>
          <div className="bg-[#221550] rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{bookings.length}</p>
            <p className="text-xs text-[#A0A0C0]">Total</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeFilter === filter.id
                  ? 'bg-[#6C3FE0] text-white'
                  : 'bg-[#221550] text-[#A0A0C0] hover:bg-[#2A1B60]'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 py-2">
        {filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#221550] flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-[#A0A0C0]" />
            </div>
            <p className="text-[#A0A0C0] text-center">
              No {activeFilter !== 'all' ? activeFilter : ''} bookings found
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking) => {
              const artist = artists.find(a => a.id === booking.artistId);
              return (
                <div
                  key={booking.id}
                  onClick={() => onViewBooking(booking)}
                  className="p-4 bg-[#221550] rounded-xl cursor-pointer hover:bg-[#2A1B60] transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={artist?.photoUrl || 'https://via.placeholder.com/50'}
                        alt={artist?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-white">{artist?.name}</h3>
                        <p className="text-sm text-[#A0A0C0]">{booking.eventName}</p>
                      </div>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-[#A0A0C0]">
                      <p>{booking.location}</p>
                      <p>{new Date(booking.eventDate).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleDecline(booking.id, e)}
                          className="p-2 rounded-full bg-[#FF6B35]/20 text-[#FF6B35] hover:bg-[#FF6B35]/30 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleAccept(booking.id, e)}
                          className="p-2 rounded-full bg-[#00C37A]/20 text-[#00C37A] hover:bg-[#00C37A]/30 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {booking.status !== 'pending' && (
                      <button className="p-2 rounded-full bg-[#6C3FE0]/20 text-[#6C3FE0] hover:bg-[#6C3FE0]/30 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

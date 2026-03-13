import { ChevronLeft, Calendar, Clock, MapPin, Check, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import type { Booking } from '@/types';

interface BookingDetailScreenProps {
  booking: Booking;
  onBack: () => void;
  onViewChat?: () => void;
}

export function BookingDetailScreen({ booking, onBack, onViewChat }: BookingDetailScreenProps) {
  const { artists, updateBookingStatus } = useAuth();
  const artist = artists.find(a => a.id === booking.artistId);

  const handleAccept = () => {
    updateBookingStatus(booking.id, 'active');
  };

  const handleDecline = () => {
    updateBookingStatus(booking.id, 'cancelled');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#1A1040] pb-24">
      {/* Header */}
      <div className="flex items-center px-4 pt-4 pb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:text-[#A0A0C0] transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-white ml-2">Booking Details</h1>
      </div>

      {/* Artist Info */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-4 p-4 bg-[#221550] rounded-xl">
          <img
            src={artist?.photoUrl || 'https://via.placeholder.com/80'}
            alt={artist?.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{artist?.name}</h2>
            <p className="text-[#A0A0C0]">{artist?.category} | {artist?.genre}</p>
            <div className="mt-2">
              <StatusBadge status={booking.status} />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="px-4 space-y-4">
        {/* Event Name */}
        <div>
          <label className="text-sm text-[#A0A0C0] mb-1 block">Event Name</label>
          <p className="text-white font-medium">{booking.eventName}</p>
        </div>

        {/* Date & Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#221550] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#A0A0C0] mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Date</span>
            </div>
            <p className="text-white font-medium">{formatDate(booking.eventDate)}</p>
          </div>
          <div className="bg-[#221550] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#A0A0C0] mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Duration</span>
            </div>
            <p className="text-white font-medium">{booking.duration}</p>
          </div>
        </div>

        {/* Location */}
        <div className="bg-[#221550] rounded-xl p-4">
          <div className="flex items-center gap-2 text-[#A0A0C0] mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Location</span>
          </div>
          <p className="text-white font-medium">{booking.location}</p>
        </div>

        {/* Event Type */}
        <div>
          <label className="text-sm text-[#A0A0C0] mb-1 block">Event Type</label>
          <p className="text-white font-medium">{booking.eventType}</p>
        </div>

        {/* Riders */}
        {booking.riders && (
          <div>
            <label className="text-sm text-[#A0A0C0] mb-1 block">Riders</label>
            <div className="bg-[#221550] rounded-xl p-4">
              <p className="text-white">{booking.riders}</p>
            </div>
          </div>
        )}

        {/* Notes */}
        {booking.notes && (
          <div>
            <label className="text-sm text-[#A0A0C0] mb-1 block">Notes</label>
            <div className="bg-[#221550] rounded-xl p-4">
              <p className="text-white">{booking.notes}</p>
            </div>
          </div>
        )}

        {/* Submitted Date */}
        <div>
          <label className="text-sm text-[#A0A0C0] mb-1 block">Submitted On</label>
          <p className="text-white">
            {new Date(booking.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {booking.status === 'pending' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1A1040] to-transparent">
          <div className="flex gap-3">
            <Button
              onClick={handleDecline}
              className="flex-1 h-12 bg-[#FF6B35]/20 hover:bg-[#FF6B35]/30 text-[#FF6B35] rounded-full font-semibold"
            >
              <X className="w-5 h-5 mr-2" />
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 h-12 bg-[#00C37A] hover:bg-[#00A868] text-white rounded-full font-semibold"
            >
              <Check className="w-5 h-5 mr-2" />
              Accept
            </Button>
          </div>
        </div>
      )}

      {booking.status === 'active' && onViewChat && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1A1040] to-transparent">
          <Button
            onClick={onViewChat}
            className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] text-white rounded-full font-semibold"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Open Chat
          </Button>
        </div>
      )}
    </div>
  );
}

import { RefreshCw, MapPin } from 'lucide-react';
import type { Booking } from '@/types';
import { StatusBadge } from '@/components/common/StatusBadge';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  booking: Booking & { artist?: { name: string; photoUrl: string } };
  onClick?: () => void;
  onResend?: () => void;
  className?: string;
}

export function BookingCard({ booking, onClick, onResend, className }: BookingCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-4 bg-[#221550] rounded-xl cursor-pointer hover:bg-[#2A1B60] transition-colors',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{booking.eventName}</h3>
          <div className="flex items-center gap-1 text-sm text-[#A0A0C0] mt-1">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{booking.location}</span>
          </div>
          {booking.artist && (
            <p className="text-sm text-[#A0A0C0] mt-1">
              Artist: {booking.artist.name}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <span className="text-sm text-white font-medium">
            {formatDate(booking.eventDate)}
          </span>
          <span className="text-xs text-[#A0A0C0]">
            {formatTime(booking.eventDate)}
          </span>
          <StatusBadge status={booking.status} />
        </div>
      </div>
      
      {onResend && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onResend();
          }}
          className="mt-3 flex items-center gap-2 text-sm text-[#6C3FE0] hover:text-[#7B4FF0] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Resend Request</span>
        </button>
      )}
    </div>
  );
}

import { useState } from 'react';
import { ChevronLeft, Calendar, MapPin, Clock, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Artist } from '@/types';
import { EVENT_TYPES } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface BookingRequestScreenProps {
  artist: Artist;
  onBack: () => void;
  onSuccess: () => void;
}

export function BookingRequestScreen({ artist, onBack, onSuccess }: BookingRequestScreenProps) {
  const { currentUser, createBooking } = useAuth();
  const [eventDate, setEventDate] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [riders, setRiders] = useState('');
  const [eventType, setEventType] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = eventDate && duration && location && eventType;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !currentUser) return;

    setIsSubmitting(true);

    try {
      createBooking({
        artistId: artist.id,
        organiserId: currentUser.id,
        eventName: `${eventType} - ${artist.name}`,
        eventDate: new Date(eventDate),
        duration,
        location,
        riders: riders || undefined,
        eventType,
        notes: notes || undefined,
      });
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1040] pb-24">
      {/* Header */}
      <div className="flex items-center px-4 pt-4 pb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:text-[#A0A0C0] transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="ml-2">
          <h1 className="text-lg font-semibold text-white">{artist.name}</h1>
          <p className="text-sm text-[#A0A0C0]">Send a booking request</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-5">
        {/* Date */}
        <div>
          <label className="block text-sm text-white mb-2">Date</label>
          <div className="relative">
            <Input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full h-12 bg-[#2A1B60] border-none text-white rounded-xl pr-12 [color-scheme:dark]"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0] pointer-events-none" />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm text-white mb-2">Duration</label>
          <div className="relative">
            <Input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 2 hours"
              className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pr-12"
            />
            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0] pointer-events-none" />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-white mb-2">Location</label>
          <div className="relative">
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Venue or address"
              className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pr-12"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0] pointer-events-none" />
          </div>
        </div>

        {/* Pick Riders */}
        <div>
          <label className="block text-sm text-white mb-2">Pick Riders (Optional)</label>
          <div className="relative">
            <Textarea
              value={riders}
              onChange={(e) => setRiders(e.target.value)}
              placeholder="Any special requirements..."
              className="w-full bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pr-12 min-h-[80px] resize-none"
            />
            <Paperclip className="absolute right-3 top-3 w-5 h-5 text-[#A0A0C0] pointer-events-none" />
          </div>
        </div>

        {/* Type of Event */}
        <div>
          <label className="block text-sm text-white mb-2">Type of Event</label>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger className="w-full h-12 bg-[#2A1B60] border-none text-white rounded-xl">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent className="bg-[#221550] border-[#2A1B60]">
              {EVENT_TYPES.map((type) => (
                <SelectItem 
                  key={type} 
                  value={type}
                  className="text-white hover:bg-[#2A1B60] focus:bg-[#2A1B60] focus:text-white"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-white mb-2">Notes (Optional)</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional information..."
            className="w-full bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl min-h-[100px] resize-none"
          />
        </div>
      </form>

      {/* Submit Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1A1040] to-transparent">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] disabled:bg-[#6C3FE0]/50 text-white rounded-full font-semibold"
        >
          {isSubmitting ? 'Submitting...' : 'Book Artist'}
        </Button>
      </div>
    </div>
  );
}

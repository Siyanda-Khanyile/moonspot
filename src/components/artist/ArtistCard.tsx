import { Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Artist } from '@/types';
import { cn } from '@/lib/utils';

interface ArtistCardProps {
  artist: Artist;
  onBook?: (artist: Artist) => void;
  onView?: (artist: Artist) => void;
  showBookButton?: boolean;
  variant?: 'default' | 'horizontal' | 'list';
  className?: string;
}

export function ArtistCard({ 
  artist, 
  onBook, 
  onView,
  showBookButton = true,
  variant = 'default',
  className 
}: ArtistCardProps) {
  if (variant === 'list') {
    return (
      <div 
        onClick={() => onView?.(artist)}
        className={cn(
          'flex items-center gap-4 p-4 bg-[#221550] rounded-xl cursor-pointer',
          'hover:bg-[#2A1B60] transition-colors',
          className
        )}
      >
        <img
          src={artist.photoUrl}
          alt={artist.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white truncate">{artist.name}</h3>
            {artist.isVerified && (
              <span className="text-[#6C3FE0]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
          <p className="text-sm text-[#A0A0C0]">{artist.category} | {artist.genre}</p>
          {artist.location && (
            <div className="flex items-center gap-1 text-xs text-[#A0A0C0] mt-1">
              <MapPin className="w-3 h-3" />
              <span>{artist.location}</span>
            </div>
          )}
        </div>
        {showBookButton && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onBook?.(artist);
            }}
            className="bg-[#6C3FE0] hover:bg-[#5A32C0] text-white rounded-full px-6"
          >
            Book
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div 
        onClick={() => onView?.(artist)}
        className={cn(
          'flex-shrink-0 w-48 bg-[#221550] rounded-2xl overflow-hidden cursor-pointer',
          'hover:bg-[#2A1B60] transition-colors',
          className
        )}
      >
        <div className="relative">
          <img
            src={artist.photoUrl}
            alt={artist.name}
            className="w-full h-40 object-cover"
          />
          <button className="absolute top-2 right-2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
            <Heart className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-white text-sm truncate">{artist.name}</h3>
          <p className="text-xs text-[#A0A0C0] mt-0.5">{artist.genre}</p>
          {artist.location && (
            <div className="flex items-center gap-1 text-xs text-[#A0A0C0] mt-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{artist.location}</span>
            </div>
          )}
          {showBookButton && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onBook?.(artist);
              }}
              className="w-full mt-3 bg-[#6C3FE0] hover:bg-[#5A32C0] text-white text-xs rounded-full"
            >
              Book
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onView?.(artist)}
      className={cn(
        'flex items-center gap-4 p-4 bg-[#221550] rounded-xl cursor-pointer',
        'hover:bg-[#2A1B60] transition-colors',
        className
      )}
    >
      <img
        src={artist.photoUrl}
        alt={artist.name}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate">{artist.name}</h3>
        <p className="text-sm text-[#A0A0C0]">{artist.genre}</p>
        {artist.location && (
          <div className="flex items-center gap-1 text-xs text-[#A0A0C0] mt-1">
            <MapPin className="w-3 h-3" />
            <span>{artist.location}</span>
          </div>
        )}
      </div>
      {showBookButton && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onBook?.(artist);
          }}
          className="bg-[#6C3FE0] hover:bg-[#5A32C0] text-white rounded-full px-6"
        >
          Book
        </Button>
      )}
    </div>
  );
}

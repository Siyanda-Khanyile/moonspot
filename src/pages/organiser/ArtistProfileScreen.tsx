import { ChevronLeft, Instagram, Facebook, Youtube, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Artist } from '@/types';

interface ArtistProfileScreenProps {
  artist: Artist;
  onBack: () => void;
  onBook: (artist: Artist) => void;
}

export function ArtistProfileScreen({ artist, onBack, onBook }: ArtistProfileScreenProps) {
  return (
    <div className="min-h-screen bg-[#1A1040] pb-24">
      {/* Header Image */}
      <div className="relative h-48">
        <img
          src={artist.bannerImageUrl || artist.photoUrl}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1040]" />
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="px-4 -mt-16 relative z-10">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            src={artist.photoUrl}
            alt={artist.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-[#1A1040]"
          />
        </div>

        {/* Name & Verification */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold text-white">{artist.name}</h1>
            {artist.isVerified && (
              <span className="text-[#6C3FE0]">
                <Check className="w-6 h-6" />
              </span>
            )}
          </div>
          <p className="text-[#A0A0C0]">{artist.category} | {artist.genre}</p>
          {artist.location && (
            <div className="flex items-center justify-center gap-1 text-sm text-[#A0A0C0] mt-1">
              <MapPin className="w-4 h-4" />
              <span>{artist.location}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-6">
          {artist.socialLinks?.facebook && (
            <a 
              href={artist.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#221550] flex items-center justify-center hover:bg-[#2A1B60] transition-colors"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
          )}
          {artist.socialLinks?.instagram && (
            <a 
              href={artist.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#221550] flex items-center justify-center hover:bg-[#2A1B60] transition-colors"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
          )}
          {artist.socialLinks?.youtube && (
            <a 
              href={artist.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#221550] flex items-center justify-center hover:bg-[#2A1B60] transition-colors"
            >
              <Youtube className="w-5 h-5 text-white" />
            </a>
          )}
          {artist.socialLinks?.spotify && (
            <a 
              href={artist.socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#221550] flex items-center justify-center hover:bg-[#2A1B60] transition-colors"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
          )}
        </div>

        {/* About Section */}
        {artist.bio && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">About</h2>
            <p className="text-[#A0A0C0] text-sm leading-relaxed">{artist.bio}</p>
          </div>
        )}

        {/* Real Name */}
        {artist.realName && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">Real Name</h2>
            <p className="text-[#A0A0C0] text-sm">{artist.realName}</p>
          </div>
        )}
      </div>

      {/* Book Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1A1040] to-transparent">
        <Button
          onClick={() => onBook(artist)}
          className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] text-white rounded-full font-semibold"
        >
          Book Artist
        </Button>
      </div>
    </div>
  );
}

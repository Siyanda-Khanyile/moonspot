import { useState } from 'react';
import { Search, ChevronLeft, Instagram, Facebook, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { browseCategories } from '@/data/mockData';
import type { Artist } from '@/types';

interface ArtistBrowseScreenProps {
  onBack: () => void;
  onViewArtist: (artist: Artist) => void;
  onBookArtist: (artist: Artist) => void;
}

export function ArtistBrowseScreen({ onBack, onViewArtist, onBookArtist }: ArtistBrowseScreenProps) {
  const { artists } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeCategory === 'all') return true;
    if (activeCategory === 'vocalist') return artist.category === 'Vocalist';
    if (activeCategory === 'artists') return artist.category === 'Musician';
    if (activeCategory === 'djs') return artist.category === 'DJ';
    if (activeCategory === 'performers') return ['Band', 'Rapper'].includes(artist.category);
    return true;
  });

  const trendingArtists = artists.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#1A1040] pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-2 -ml-2 text-white hover:text-[#A0A0C0] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-white">Moonspot</h1>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0]" />
          <Input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pl-10"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 mb-6">
        {browseCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-[#6C3FE0] text-white'
                : 'bg-[#221550] text-[#A0A0C0] hover:bg-[#2A1B60]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Trending Section */}
      {!searchQuery && (
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Trending</h2>
            <span className="text-sm text-[#A0A0C0]">Last month</span>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {trendingArtists.map((artist) => (
              <div
                key={artist.id}
                onClick={() => onViewArtist(artist)}
                className="flex-shrink-0 w-28 cursor-pointer"
              >
                <img
                  src={artist.photoUrl}
                  alt={artist.name}
                  className="w-28 h-28 rounded-2xl object-cover mb-2"
                />
                <p className="text-sm font-medium text-white truncate">{artist.name}</p>
                <p className="text-xs text-[#A0A0C0]">{artist.genre}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Browse List */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-white mb-3">
          {searchQuery ? 'Search Results' : 'Browse All'}
        </h2>
        <div className="space-y-3">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="flex items-center gap-4 p-4 bg-[#221550] rounded-xl"
            >
              <img
                src={artist.photoUrl}
                alt={artist.name}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 
                    onClick={() => onViewArtist(artist)}
                    className="font-semibold text-white truncate cursor-pointer hover:text-[#6C3FE0] transition-colors"
                  >
                    {artist.name}
                  </h3>
                  {artist.isVerified && (
                    <span className="text-[#6C3FE0]">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#A0A0C0]">{artist.category} | {artist.genre}</p>
                <div className="flex items-center gap-3 mt-2">
                  {artist.socialLinks?.instagram && (
                    <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-4 h-4 text-[#A0A0C0] hover:text-white transition-colors" />
                    </a>
                  )}
                  {artist.socialLinks?.facebook && (
                    <a href={artist.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <Facebook className="w-4 h-4 text-[#A0A0C0] hover:text-white transition-colors" />
                    </a>
                  )}
                  {artist.socialLinks?.youtube && (
                    <a href={artist.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4 text-[#A0A0C0] hover:text-white transition-colors" />
                    </a>
                  )}
                  {artist.socialLinks?.spotify && (
                    <a href={artist.socialLinks.spotify} target="_blank" rel="noopener noreferrer">
                      <svg className="w-4 h-4 text-[#A0A0C0] hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onBookArtist(artist)}
                  className="bg-[#6C3FE0] hover:bg-[#5A32C0] text-white text-xs rounded-full px-4"
                >
                  Book Artist
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

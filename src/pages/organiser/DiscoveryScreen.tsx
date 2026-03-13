import { useState } from 'react';
import { Search, SlidersHorizontal, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ArtistCard } from '@/components/artist/ArtistCard';
import { GenreTile } from '@/components/artist/GenreTile';
import { useAuth } from '@/contexts/AuthContext';
import { mockGenres, artistCategories } from '@/data/mockData';
import type { Artist } from '@/types';

interface DiscoveryScreenProps {
  onViewArtist: (artist: Artist) => void;
  onBookArtist: (artist: Artist) => void;
  onSearch: () => void;
}

export function DiscoveryScreen({ onViewArtist, onBookArtist, onSearch }: DiscoveryScreenProps) {
  const { currentUser, artists } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtists = artists.filter(artist => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'producers') return artist.category === 'Producer';
    if (activeCategory === 'bands') return artist.category === 'Band';
    if (activeCategory === 'electronic') return artist.genre === 'Electronic';
    if (activeCategory === 'afro-tech') return artist.genre === 'Afrobeat';
    if (activeCategory === 'amapiano') return artist.genre === 'Amapiano';
    return true;
  });

  const featuredArtists = filteredArtists.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#1A1040] pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.avatarUrl || 'https://via.placeholder.com/50'}
              alt={currentUser?.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-[#A0A0C0]">Welcome Back!</p>
              <p className="font-semibold text-white">{currentUser?.fullName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onSearch}
              className="p-2 rounded-full bg-[#221550] hover:bg-[#2A1B60] transition-colors"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-full bg-[#221550] hover:bg-[#2A1B60] transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Search Bars */}
        <div className="space-y-2 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0]" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pl-10"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0]" />
            <Input
              type="text"
              placeholder="Search artists, genres, venues..."
              className="w-full h-11 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pl-10 pr-10"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Mic className="w-5 h-5 text-[#A0A0C0]" />
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
          {artistCategories.map((category) => (
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
      </div>

      {/* Featured Near You */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-lg font-semibold text-white">Featured Near You</h2>
          <button className="text-sm text-[#6C3FE0]">See All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4">
          {featuredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onView={onViewArtist}
              onBook={onBookArtist}
              variant="horizontal"
            />
          ))}
        </div>
      </div>

      {/* Explore by Genre */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-white mb-3">Explore By Genre</h2>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-4">
          {mockGenres.map((genre) => (
            <GenreTile
              key={genre.id}
              name={genre.name}
              gradient={genre.gradient}
              icon={genre.icon}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

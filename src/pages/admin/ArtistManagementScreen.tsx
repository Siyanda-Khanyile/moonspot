import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import type { Artist } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ArtistManagementScreenProps {
  onAddArtist: () => void;
  onEditArtist: (artist: Artist) => void;
}

export function ArtistManagementScreen({ onAddArtist, onEditArtist }: ArtistManagementScreenProps) {
  const { artists, deleteArtist } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [artistToDelete, setArtistToDelete] = useState<Artist | null>(null);

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (artistToDelete) {
      deleteArtist(artistToDelete.id);
      setArtistToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1040] pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">Artist Management</h1>
          <Button
            onClick={onAddArtist}
            className="bg-[#6C3FE0] hover:bg-[#5A32C0] text-white rounded-full px-4 h-10"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0]" />
          <Input
            type="text"
            placeholder="Search artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mb-4">
        <div className="flex gap-3">
          <div className="flex-1 bg-[#221550] rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{artists.length}</p>
            <p className="text-xs text-[#A0A0C0]">Total Artists</p>
          </div>
          <div className="flex-1 bg-[#221550] rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-[#00C37A]">
              {artists.filter(a => a.isActive).length}
            </p>
            <p className="text-xs text-[#A0A0C0]">Active</p>
          </div>
          <div className="flex-1 bg-[#221550] rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-[#6C3FE0]">
              {artists.filter(a => a.isVerified).length}
            </p>
            <p className="text-xs text-[#A0A0C0]">Verified</p>
          </div>
        </div>
      </div>

      {/* Artists List */}
      <div className="px-4 py-2">
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
                  <h3 className="font-semibold text-white truncate">{artist.name}</h3>
                  {artist.isVerified && (
                    <span className="text-[#6C3FE0]">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#A0A0C0]">{artist.category} | {artist.genre}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    artist.isActive 
                      ? 'bg-[#00C37A]/20 text-[#00C37A]' 
                      : 'bg-[#7B7B9D]/20 text-[#7B7B9D]'
                  }`}>
                    {artist.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditArtist(artist)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-[#A0A0C0]" />
                </button>
                <button
                  onClick={() => setArtistToDelete(artist)}
                  className="p-2 rounded-full hover:bg-[#FF6B35]/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-[#FF6B35]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!artistToDelete} onOpenChange={() => setArtistToDelete(null)}>
        <DialogContent className="bg-[#221550] border-none text-white max-w-sm">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#FF6B35]/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <DialogTitle className="text-xl font-bold">Delete Artist?</DialogTitle>
            <DialogDescription className="text-[#A0A0C0]">
              Are you sure you want to remove {artistToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button
              onClick={() => setArtistToDelete(null)}
              className="flex-1 h-12 bg-[#2A1B60] hover:bg-[#3A2B70] text-white rounded-full font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="flex-1 h-12 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-full font-semibold"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

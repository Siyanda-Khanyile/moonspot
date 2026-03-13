import { useState } from 'react';
import { ChevronLeft, Camera, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import type { Artist } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface ArtistFormScreenProps {
  artist?: Artist | null;
  onBack: () => void;
  onSuccess: () => void;
}

export function ArtistFormScreen({ artist, onBack, onSuccess }: ArtistFormScreenProps) {
  const { addArtist, updateArtist } = useAuth();
  const isEditing = !!artist;

  const [name, setName] = useState(artist?.name || '');
  const [realName, setRealName] = useState(artist?.realName || '');
  const [genre, setGenre] = useState(artist?.genre || '');
  const [category, setCategory] = useState(artist?.category || '');
  const [bio, setBio] = useState(artist?.bio || '');
  const [location, setLocation] = useState(artist?.location || '');
  const [isVerified, setIsVerified] = useState(artist?.isVerified || false);
  const [isActive, setIsActive] = useState(artist?.isActive ?? true);
  const [instagram, setInstagram] = useState(artist?.socialLinks?.instagram || '');
  const [facebook, setFacebook] = useState(artist?.socialLinks?.facebook || '');
  const [youtube, setYoutube] = useState(artist?.socialLinks?.youtube || '');
  const [spotify, setSpotify] = useState(artist?.socialLinks?.spotify || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = name.trim() && genre.trim() && category.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    const artistData = {
      name: name.trim(),
      realName: realName.trim() || undefined,
      photoUrl: artist?.photoUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      bannerImageUrl: artist?.bannerImageUrl,
      genre: genre.trim(),
      category: category.trim(),
      bio: bio.trim() || undefined,
      location: location.trim() || undefined,
      isVerified,
      socialLinks: {
        instagram: instagram.trim() || undefined,
        facebook: facebook.trim() || undefined,
        youtube: youtube.trim() || undefined,
        spotify: spotify.trim() || undefined,
      },
      isActive,
    };

    if (isEditing && artist) {
      updateArtist(artist.id, artistData);
    } else {
      addArtist(artistData);
    }

    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#1A1040] pb-24">
      {/* Header */}
      <div className="flex items-center px-4 pt-4 pb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:text-[#A0A0C0] transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-white ml-2">
          {isEditing ? 'Edit Artist' : 'Add New Artist'}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-5">
        {/* Photo Upload Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#221550] flex items-center justify-center border-2 border-dashed border-[#6C3FE0]">
              <Camera className="w-8 h-8 text-[#6C3FE0]" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#6C3FE0] flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm text-white mb-2">Stage Name *</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter stage name"
            className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl"
          />
        </div>

        {/* Real Name */}
        <div>
          <label className="block text-sm text-white mb-2">Real Name</label>
          <Input
            type="text"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            placeholder="Enter real name (optional)"
            className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm text-white mb-2">Genre *</label>
          <Input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g., Amapiano, House, Afrobeat"
            className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-white mb-2">Category *</label>
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., DJ, Vocalist, Producer"
            className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-white mb-2">Location</label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Country"
            className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm text-white mb-2">Bio</label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Artist biography..."
            className="w-full bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl min-h-[100px] resize-none"
          />
        </div>

        {/* Social Links */}
        <div>
          <label className="block text-sm text-white mb-3">Social Links</label>
          <div className="space-y-3">
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0]" />
              <Input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Instagram URL"
                className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pl-10"
              />
            </div>
            <div className="relative">
              <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0]" />
              <Input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Facebook URL"
                className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pl-10"
              />
            </div>
            <div className="relative">
              <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0]" />
              <Input
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="YouTube URL"
                className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pl-10"
              />
            </div>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0C0]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <Input
                type="text"
                value={spotify}
                onChange={(e) => setSpotify(e.target.value)}
                placeholder="Spotify URL"
                className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pl-10"
              />
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Verified Artist</p>
              <p className="text-sm text-[#A0A0C0]">Show verified badge on profile</p>
            </div>
            <Switch
              checked={isVerified}
              onCheckedChange={setIsVerified}
              className="data-[state=checked]:bg-[#6C3FE0]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Active</p>
              <p className="text-sm text-[#A0A0C0]">Available for bookings</p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className="data-[state=checked]:bg-[#00C37A]"
            />
          </div>
        </div>
      </form>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1A1040] to-transparent">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] disabled:bg-[#6C3FE0]/50 text-white rounded-full font-semibold"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Artist' : 'Add Artist'}
        </Button>
      </div>
    </div>
  );
}

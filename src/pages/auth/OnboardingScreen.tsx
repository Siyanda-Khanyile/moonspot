import { useState } from 'react';
import { Mail, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingScreenProps {
  onContinueWithEmail: () => void;
  onSignIn: () => void;
}

export function OnboardingScreen({ onContinueWithEmail, onSignIn }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: 'Discover Amazing Artists',
      subtitle: 'Find the perfect performer for your next event',
    },
    {
      title: 'Easy Booking',
      subtitle: 'Book artists with just a few taps',
    },
    {
      title: 'Stay Connected',
      subtitle: 'Chat directly with artists and managers',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1040] flex flex-col relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1040]/50 via-[#1A1040] to-[#1A1040]" />
      
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 py-8">
        {/* Logo */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-2xl bg-[#6C3FE0] flex items-center justify-center mb-8 shadow-lg shadow-[#6C3FE0]/30">
            <span className="text-4xl font-bold text-white">m</span>
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            {slides[currentSlide].title}
          </h1>
          <p className="text-[#A0A0C0] text-center">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-6 bg-[#6C3FE0]' 
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Button
            onClick={onContinueWithEmail}
            className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] text-white rounded-full font-semibold"
          >
            <Mail className="w-5 h-5 mr-2" />
            Continue with email
          </Button>

          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-sm text-[#A0A0C0]">or sign up with</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <div className="flex justify-center gap-6">
            <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Facebook className="w-5 h-5 text-white" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Twitter className="w-5 h-5 text-white" />
            </button>
          </div>

          <p className="text-center text-sm text-[#A0A0C0] mt-6">
            Already have an account?{' '}
            <button onClick={onSignIn} className="text-[#6C3FE0] hover:text-[#7B4FF0] font-semibold">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

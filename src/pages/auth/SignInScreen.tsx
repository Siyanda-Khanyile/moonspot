import { useState } from 'react';
import { Eye, EyeOff, ChevronLeft, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface SignInScreenProps {
  onBack: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
  onSuccess: () => void;
}

export function SignInScreen({ onBack, onSignUp, onForgotPassword, onSuccess }: SignInScreenProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isValid = email.includes('@') && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        onSuccess();
      } else {
        setError('Invalid email or password. Try: admin@moonspot.com / password or organiser@demo.com / password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1040] flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:text-[#A0A0C0] transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-white ml-2">Sign In</h1>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-4">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-[#A0A0C0] mb-8">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-white mb-2">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-2">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0A0C0] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-[#6C3FE0] hover:text-[#7B4FF0]"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="text-[#FF6B35] text-sm">{error}</p>
          )}

          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] disabled:bg-[#6C3FE0]/50 text-white rounded-full font-semibold"
          >
            {isLoading ? 'Signing In...' : 'SIGN IN'}
          </Button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-sm text-[#A0A0C0]">or continue with</span>
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

        <p className="text-center text-sm text-[#A0A0C0] mt-8">
          Don't have an account yet?{' '}
          <button onClick={onSignUp} className="text-[#6C3FE0] hover:text-[#7B4FF0] font-semibold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

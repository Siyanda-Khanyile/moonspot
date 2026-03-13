import { useState } from 'react';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface SignUpScreenProps {
  onBack: () => void;
  onSignIn: () => void;
  onSuccess: () => void;
}

export function SignUpScreen({ onBack, onSignIn, onSuccess }: SignUpScreenProps) {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isValid = 
    fullName.trim().length > 0 &&
    email.includes('@') &&
    password.length >= 8 &&
    password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    setError('');

    try {
      const success = await register(fullName, email, password);
      if (success) {
        onSuccess();
      } else {
        setError('Registration failed. Please try again.');
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
        <h1 className="text-lg font-semibold text-white ml-2">Sign Up</h1>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-4">
        <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-[#A0A0C0] mb-8">Fill in your details to get started</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-white mb-2">Full Name</label>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl"
            />
          </div>

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
                placeholder="Minimum 8 characters"
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

          <div>
            <label className="block text-sm text-white mb-2">Confirm Password</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0A0C0] hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-[#FF6B35] text-xs mt-1">Passwords do not match</p>
            )}
          </div>

          {error && (
            <p className="text-[#FF6B35] text-sm">{error}</p>
          )}

          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] disabled:bg-[#6C3FE0]/50 text-white rounded-full font-semibold mt-4"
          >
            {isLoading ? 'Creating Account...' : 'SIGN UP'}
          </Button>
        </form>

        <p className="text-center text-sm text-[#A0A0C0] mt-6">
          Already have an account?{' '}
          <button onClick={onSignIn} className="text-[#6C3FE0] hover:text-[#7B4FF0] font-semibold">
            Sign In
          </button>
        </p>

        <p className="text-center text-xs text-[#A0A0C0] mt-8">
          By signing up, you agree to our{' '}
          <button className="text-[#6C3FE0] hover:text-[#7B4FF0]">Terms and Conditions</button>
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface PasswordRecoveryScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

type RecoveryStep = 'email' | 'code' | 'password';

export function PasswordRecoveryScreen({ onBack, onComplete }: PasswordRecoveryScreenProps) {
  const [step, setStep] = useState<RecoveryStep>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInboxModal, setShowInboxModal] = useState(false);

  const handleSendInstructions = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setShowInboxModal(true);
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length >= 4) {
      setStep('password');
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length >= 8 && newPassword === confirmPassword) {
      setShowSuccessModal(true);
    }
  };

  const renderEmailStep = () => (
    <>
      <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
      <p className="text-[#A0A0C0] mb-8">
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      <form onSubmit={handleSendInstructions} className="space-y-5">
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

        <Button
          type="submit"
          disabled={!email.includes('@')}
          className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] disabled:bg-[#6C3FE0]/50 text-white rounded-full font-semibold mt-4"
        >
          Send Instructions
        </Button>
      </form>
    </>
  );

  const renderCodeStep = () => (
    <>
      <h2 className="text-2xl font-bold text-white mb-2">Verify Code</h2>
      <p className="text-[#A0A0C0] mb-8">
        Enter the verification code sent to {email}
      </p>

      <form onSubmit={handleVerifyCode} className="space-y-5">
        <div>
          <label className="block text-sm text-white mb-2">Enter Code</label>
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 4-digit code"
            maxLength={6}
            className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl text-center text-2xl tracking-widest"
          />
        </div>

        <Button
          type="submit"
          disabled={code.length < 4}
          className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] disabled:bg-[#6C3FE0]/50 text-white rounded-full font-semibold mt-4"
        >
          Verify
        </Button>

        <p className="text-center text-sm text-[#A0A0C0]">
          Don't have a code?{' '}
          <button
            type="button"
            onClick={() => setStep('email')}
            className="text-[#6C3FE0] hover:text-[#7B4FF0] font-semibold"
          >
            Resend code
          </button>
        </p>
      </form>
    </>
  );

  const renderPasswordStep = () => (
    <>
      <h2 className="text-2xl font-bold text-white mb-2">New Password</h2>
      <p className="text-[#A0A0C0] mb-8">
        Create a new password for your account
      </p>

      <form onSubmit={handleUpdatePassword} className="space-y-5">
        <div>
          <label className="block text-sm text-white mb-2">New Password</label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-2">Confirm Password</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full h-12 bg-[#2A1B60] border-none text-white placeholder:text-[#A0A0C0]/50 rounded-xl"
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-[#FF6B35] text-xs mt-1">Passwords do not match</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={newPassword.length < 8 || newPassword !== confirmPassword}
          className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] disabled:bg-[#6C3FE0]/50 text-white rounded-full font-semibold mt-4"
        >
          Update Password
        </Button>
      </form>
    </>
  );

  return (
    <div className="min-h-screen bg-[#1A1040] flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4">
        <button 
          onClick={() => {
            if (step === 'email') onBack();
            else if (step === 'code') setStep('email');
            else setStep('code');
          }} 
          className="p-2 -ml-2 text-white hover:text-[#A0A0C0] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-white ml-2">
          {step === 'email' && 'Forgot Password'}
          {step === 'code' && 'Verify Code'}
          {step === 'password' && 'New Password'}
        </h1>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-4">
        {step === 'email' && renderEmailStep()}
        {step === 'code' && renderCodeStep()}
        {step === 'password' && renderPasswordStep()}
      </div>

      {/* Check Inbox Modal */}
      <Dialog open={showInboxModal} onOpenChange={setShowInboxModal}>
        <DialogContent className="bg-[#221550] border-none text-white max-w-sm">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#6C3FE0]/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-[#6C3FE0]" />
            </div>
            <DialogTitle className="text-xl font-bold">Check your inbox</DialogTitle>
            <DialogDescription className="text-[#A0A0C0]">
              We've sent you instructions to recover your account
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              setShowInboxModal(false);
              setStep('code');
            }}
            className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] text-white rounded-full font-semibold mt-4"
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-[#221550] border-none text-white max-w-sm">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#00C37A]/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-[#00C37A]" />
            </div>
            <DialogTitle className="text-xl font-bold">Password changed</DialogTitle>
            <DialogDescription className="text-[#A0A0C0]">
              Your password was successfully updated
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={onComplete}
            className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] text-white rounded-full font-semibold mt-4"
          >
            Sign In
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

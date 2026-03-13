import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AccountCreatedScreenProps {
  onSignIn: () => void;
}

export function AccountCreatedScreen({ onSignIn }: AccountCreatedScreenProps) {
  return (
    <div className="min-h-screen bg-[#1A1040] flex flex-col items-center justify-center px-6">
      <div className="text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-[#00C37A]/20 flex items-center justify-center mx-auto mb-6">
          <div className="flex">
            <Check className="w-10 h-10 text-[#00C37A]" />
            <Check className="w-10 h-10 text-[#00C37A] -ml-4" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Account created</h1>
        <p className="text-[#A0A0C0] mb-8">
          You can now explore more on our app
        </p>

        <Button
          onClick={onSignIn}
          className="w-full h-12 bg-[#6C3FE0] hover:bg-[#5A32C0] text-white rounded-full font-semibold"
        >
          SIGN IN
        </Button>
      </div>
    </div>
  );
}

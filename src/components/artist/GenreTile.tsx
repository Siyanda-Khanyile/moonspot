import { cn } from '@/lib/utils';

interface GenreTileProps {
  name: string;
  gradient: string;
  icon: string;
  onClick?: () => void;
  className?: string;
}

export function GenreTile({ name, gradient, icon, onClick, className }: GenreTileProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-shrink-0 w-32 h-24 rounded-2xl bg-gradient-to-br flex flex-col items-center justify-center',
        'hover:scale-105 transition-transform cursor-pointer',
        gradient,
        className
      )}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-white font-semibold text-sm">{name}</span>
    </button>
  );
}

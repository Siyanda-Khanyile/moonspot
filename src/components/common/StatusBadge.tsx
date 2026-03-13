import { cn } from '@/lib/utils';
import type { BookingStatus } from '@/types';

interface StatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'status-pending',
  },
  active: {
    label: 'Active',
    className: 'status-active',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'status-cancelled',
  },
  visited: {
    label: 'Visited',
    className: 'status-visited',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

import React from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  HelpCircle, 
  FileText, 
  LogOut, 
  ChevronRight,
  Moon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface AdminSettingsScreenProps {
  onLogout: () => void;
}

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
  showArrow?: boolean;
}

function SettingItem({ icon, label, onClick, danger, showArrow = true }: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-4 p-4 bg-[#221550] rounded-xl hover:bg-[#2A1B60] transition-colors',
        danger && 'hover:bg-[#FF6B35]/10'
      )}
    >
      <div className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center',
        danger ? 'bg-[#FF6B35]/20' : 'bg-[#6C3FE0]/20'
      )}>
        <span className={cn('w-5 h-5 flex items-center justify-center', danger ? 'text-[#FF6B35]' : 'text-[#6C3FE0]')}>
          {icon}
        </span>
      </div>
      <span className={cn(
        'flex-1 text-left font-medium',
        danger ? 'text-[#FF6B35]' : 'text-white'
      )}>
        {label}
      </span>
      {showArrow && <ChevronRight className="w-5 h-5 text-[#A0A0C0]" />}
    </button>
  );
}

export function AdminSettingsScreen({ onLogout }: AdminSettingsScreenProps) {
  const { currentUser, bookings, artists } = useAuth();

  return (
    <div className="min-h-screen bg-[#1A1040] pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-white mb-4">Settings</h1>
      </div>

      {/* Profile Card */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-4 p-4 bg-[#221550] rounded-xl">
          <img
            src={currentUser?.avatarUrl || 'https://via.placeholder.com/80'}
            alt={currentUser?.fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-white">{currentUser?.fullName}</h2>
            <p className="text-sm text-[#A0A0C0]">{currentUser?.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-[#6C3FE0]/20 text-[#6C3FE0] text-xs rounded-full capitalize">
              {currentUser?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-4 mb-6">
        <div className="bg-[#221550] rounded-xl p-4">
          <h3 className="text-sm font-medium text-[#A0A0C0] mb-3">Platform Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-white">{artists.length}</p>
              <p className="text-xs text-[#A0A0C0]">Artists</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-white">{bookings.length}</p>
              <p className="text-xs text-[#A0A0C0]">Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#00C37A]">
                {bookings.filter(b => b.status === 'active').length}
              </p>
              <p className="text-xs text-[#A0A0C0]">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="px-4 space-y-6">
        {/* Account */}
        <div>
          <h3 className="text-sm font-medium text-[#A0A0C0] mb-3 uppercase tracking-wide">Account</h3>
          <div className="space-y-2">
            <SettingItem
              icon={<User className="w-5 h-5" />}
              label="Edit Profile"
            />
            <SettingItem
              icon={<Lock className="w-5 h-5" />}
              label="Change Password"
            />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-sm font-medium text-[#A0A0C0] mb-3 uppercase tracking-wide">Preferences</h3>
          <div className="space-y-2">
            <SettingItem
              icon={<Bell className="w-5 h-5" />}
              label="Notifications"
            />
            <SettingItem
              icon={<Moon className="w-5 h-5" />}
              label="Dark Mode"
              showArrow={false}
            />
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-medium text-[#A0A0C0] mb-3 uppercase tracking-wide">Support</h3>
          <div className="space-y-2">
            <SettingItem
              icon={<HelpCircle className="w-5 h-5" />}
              label="Help Center"
            />
            <SettingItem
              icon={<FileText className="w-5 h-5" />}
              label="Terms & Conditions"
            />
          </div>
        </div>

        {/* Logout */}
        <div className="pt-4">
          <SettingItem
            icon={<LogOut className="w-5 h-5" />}
            label="Log Out"
            onClick={onLogout}
            danger
          />
        </div>
      </div>

      {/* App Version */}
      <div className="text-center mt-8">
        <p className="text-xs text-[#A0A0C0]">Moonspot Admin v1.0</p>
      </div>
    </div>
  );
}

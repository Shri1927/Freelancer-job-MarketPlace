import { useState } from 'react';
import { Lock, Shield, Key, Smartphone, AlertTriangle, LogOut } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export const SecuritySettings = ({ settings, onUpdate }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    if (onUpdate) {
      onUpdate(newSettings);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsChangingPassword(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsPasswordDialogOpen(false);
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const activeSessions = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, USA',
      lastActive: '2 hours ago',
      current: true,
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'New York, USA',
      lastActive: '1 day ago',
      current: false,
    },
  ];

  return (
    <SettingsSection
      title="Security"
      description="Manage your account security and authentication"
      icon={Lock}
    >
      {/* Two-Factor Authentication */}
      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Label htmlFor="twoFactor" className="font-medium cursor-pointer">
              Two-Factor Authentication
            </Label>
            {settings.twoFactor && (
              <Badge variant="default" className="gap-1">
                <Shield className="w-3 h-3" />
                Active
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account
          </p>
        </div>
        <Switch
          id="twoFactor"
          checked={settings.twoFactor || false}
          onCheckedChange={() => handleToggle('twoFactor')}
        />
      </div>

      {/* Login Alerts */}
      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
        <div className="flex-1">
          <Label htmlFor="loginAlerts" className="font-medium cursor-pointer">
            Login Alerts
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Get notified when someone logs into your account
          </p>
        </div>
        <Switch
          id="loginAlerts"
          checked={settings.loginAlerts !== false}
          onCheckedChange={() => handleToggle('loginAlerts')}
        />
      </div>

      {/* Change Password */}
      <div className="p-4 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Label className="font-medium">Password</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Last changed 3 months ago
            </p>
          </div>
          <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                  Enter your current password and choose a new one
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    placeholder="Enter new password"
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsPasswordDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleChangePassword}
                    disabled={isChangingPassword}
                    className="flex-1"
                  >
                    {isChangingPassword ? 'Changing...' : 'Change Password'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="font-medium">Active Sessions</Label>
          <Button variant="ghost" size="sm" className="text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out All
          </Button>
        </div>
        <div className="space-y-2">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{session.device}</p>
                  {session.current && (
                    <Badge variant="outline" className="text-xs">Current</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {session.location} • {session.lastActive}
                </p>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="text-destructive">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </SettingsSection>
  );
};










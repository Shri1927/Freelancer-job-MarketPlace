import { Shield, Eye, EyeOff, Lock, Globe, Users } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PrivacySettings = ({ settings, onUpdate }) => {
  const handleToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    if (onUpdate) {
      onUpdate(newSettings);
    }
  };

  const handleSelectChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value,
    };
    if (onUpdate) {
      onUpdate(newSettings);
    }
  };

  return (
    <SettingsSection
      title="Privacy & Visibility"
      description="Control who can see your information and activity"
      icon={Shield}
    >
      {/* Profile Visibility */}
      <div className="space-y-2">
        <Label htmlFor="profileVisibility">Profile Visibility</Label>
        <Select
          value={settings.profileVisibility || 'public'}
          onValueChange={(value) => handleSelectChange('profileVisibility', value)}
        >
          <SelectTrigger id="profileVisibility">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Public - Anyone can view your profile
              </div>
            </SelectItem>
            <SelectItem value="contacts">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Contacts Only - Only your contacts can view
              </div>
            </SelectItem>
            <SelectItem value="private">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Private - Only you can view
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Control who can see your profile information
        </p>
      </div>

      {/* Show Earnings */}
      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
        <div className="flex-1">
          <Label htmlFor="showEarnings" className="font-medium cursor-pointer">
            Show Earnings on Profile
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Display your total earnings on your public profile
          </p>
        </div>
        <Switch
          id="showEarnings"
          checked={settings.showEarnings || false}
          onCheckedChange={() => handleToggle('showEarnings')}
        />
      </div>

      {/* Show Portfolio */}
      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
        <div className="flex-1">
          <Label htmlFor="showPortfolio" className="font-medium cursor-pointer">
            Show Portfolio
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Make your portfolio visible to potential clients
          </p>
        </div>
        <Switch
          id="showPortfolio"
          checked={settings.showPortfolio !== false}
          onCheckedChange={() => handleToggle('showPortfolio')}
        />
      </div>

      {/* Show Skills */}
      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
        <div className="flex-1">
          <Label htmlFor="showSkills" className="font-medium cursor-pointer">
            Show Skills
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Display your skills on your profile
          </p>
        </div>
        <Switch
          id="showSkills"
          checked={settings.showSkills !== false}
          onCheckedChange={() => handleToggle('showSkills')}
        />
      </div>

      {/* Allow Messages */}
      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
        <div className="flex-1">
          <Label htmlFor="allowMessages" className="font-medium cursor-pointer">
            Allow Direct Messages
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Let clients send you direct messages
          </p>
        </div>
        <Switch
          id="allowMessages"
          checked={settings.allowMessages !== false}
          onCheckedChange={() => handleToggle('allowMessages')}
        />
      </div>

      {/* Data Sharing */}
      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
        <div className="flex-1">
          <Label htmlFor="dataSharing" className="font-medium cursor-pointer">
            Analytics & Data Sharing
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Help improve our platform by sharing anonymous usage data
          </p>
        </div>
        <Switch
          id="dataSharing"
          checked={settings.dataSharing || false}
          onCheckedChange={() => handleToggle('dataSharing')}
        />
      </div>
    </SettingsSection>
  );
};


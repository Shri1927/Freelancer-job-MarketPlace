import { Globe, Moon, Sun, Clock, Palette } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PreferencesSettings = ({ preferences, onUpdate }) => {
  const handleSelectChange = (key, value) => {
    const newPreferences = {
      ...preferences,
      [key]: value,
    };
    if (onUpdate) {
      onUpdate(newPreferences);
    }
  };

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
  ];

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  ];

  return (
    <SettingsSection
      title="Preferences"
      description="Customize your app experience"
      icon={Palette}
    >
      {/* Language */}
      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select
          value={preferences.language || 'en'}
          onValueChange={(value) => handleSelectChange('language', value)}
        >
          <SelectTrigger id="language" className="w-full">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Timezone */}
      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <Select
          value={preferences.timezone || 'UTC'}
          onValueChange={(value) => handleSelectChange('timezone', value)}
        >
          <SelectTrigger id="timezone" className="w-full">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {timezones.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Theme */}
      <div className="space-y-2">
        <Label htmlFor="theme">Theme</Label>
        <Select
          value={preferences.theme || 'light'}
          onValueChange={(value) => handleSelectChange('theme', value)}
        >
          <SelectTrigger id="theme" className="w-full">
            <div className="flex items-center gap-2">
              {preferences.theme === 'dark' ? (
                <Moon className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Sun className="w-4 h-4 text-muted-foreground" />
              )}
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                Light
              </div>
            </SelectItem>
            <SelectItem value="dark">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                Dark
              </div>
            </SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Choose your preferred color theme
        </p>
      </div>

      {/* Date Format */}
      <div className="space-y-2">
        <Label htmlFor="dateFormat">Date Format</Label>
        <Select
          value={preferences.dateFormat || 'MM/DD/YYYY'}
          onValueChange={(value) => handleSelectChange('dateFormat', value)}
        >
          <SelectTrigger id="dateFormat" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Currency */}
      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select
          value={preferences.currency || 'USD'}
          onValueChange={(value) => handleSelectChange('currency', value)}
        >
          <SelectTrigger id="currency" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="GBP">GBP (£)</SelectItem>
            <SelectItem value="JPY">JPY (¥)</SelectItem>
            <SelectItem value="CAD">CAD ($)</SelectItem>
            <SelectItem value="AUD">AUD ($)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </SettingsSection>
  );
};










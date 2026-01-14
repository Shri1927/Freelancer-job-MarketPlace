import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { PrivacySettings } from '@/components/settings/PrivacySettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { PreferencesSettings } from '@/components/settings/PreferencesSettings';
import { DangerZone } from '@/components/settings/DangerZone';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth';

const Settings = () => {
  const { signOut } = useAuthStore();
  
  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  // Mock profile data - Replace with API calls
  const [profile, setProfile] = useState({
    name: userInfo.name || 'John Doe',
    email: userInfo.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Experienced web developer with a passion for creating beautiful and functional applications.',
    location: 'New York, USA',
    title: 'Senior Full-Stack Developer',
    website: 'https://johndoe.dev',
    avatar: userInfo.avatar || '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    emailProjects: true,
    emailMessages: true,
    emailPayments: true,
    push: false,
    pushProjects: true,
    pushMessages: true,
    sms: false,
    smsPayments: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEarnings: false,
    showPortfolio: true,
    showSkills: true,
    allowMessages: true,
    dataSharing: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'America/New_York',
    theme: 'light',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
  });

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleNotificationsUpdate = (updatedNotifications) => {
    setNotifications(updatedNotifications);
  };

  const handlePrivacyUpdate = (updatedPrivacy) => {
    setPrivacy(updatedPrivacy);
  };

  const handleSecurityUpdate = (updatedSecurity) => {
    setSecurity(updatedSecurity);
  };

  const handlePreferencesUpdate = (updatedPreferences) => {
    setPreferences(updatedPreferences);
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    signOut();
    toast.success('Your account has been deleted');
  };

  const handleExportData = () => {
    toast.success('Data export initiated. You will receive an email shortly.');
  };

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out from all devices');
  };

  const handleSaveAll = () => {
    // In a real app, save all settings to the backend
    toast.success('All settings saved successfully');
  };

  return (
    <div className=" bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <Button onClick={handleSaveAll} size="lg" className="gap-2">
            <Save className="w-5 h-5" />
            Save All Changes
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 lg:w-auto lg:inline-flex">
           
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <NotificationSettings
              settings={notifications}
              onUpdate={handleNotificationsUpdate}
            />
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <PrivacySettings
              settings={privacy}
              onUpdate={handlePrivacyUpdate}
            />
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <SecuritySettings
              settings={security}
              onUpdate={handleSecurityUpdate}
            />
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <PreferencesSettings
              preferences={preferences}
              onUpdate={handlePreferencesUpdate}
            />
          </TabsContent>

          {/* Danger Zone Tab */}
          <TabsContent value="danger">
            <DangerZone
              onDeleteAccount={handleDeleteAccount}
              onExportData={handleExportData}
              onSignOut={handleSignOut}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;











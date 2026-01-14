import { Bell, Mail, Smartphone, MessageSquare, DollarSign, Briefcase, Users } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export const NotificationSettings = ({ settings, onUpdate }) => {
  const notificationGroups = [
    {
      title: 'Email Notifications',
      icon: Mail,
      settings: [
        {
          key: 'email',
          label: 'Email Notifications',
          description: 'Receive notifications via email',
        },
        {
          key: 'emailProjects',
          label: 'Project Updates',
          description: 'Get notified about project milestones and updates',
        },
        {
          key: 'emailMessages',
          label: 'New Messages',
          description: 'Receive email when you get new messages',
        },
        {
          key: 'emailPayments',
          label: 'Payment Notifications',
          description: 'Get notified about payments and withdrawals',
        },
      ],
    },
    {
      title: 'Push Notifications',
      icon: Smartphone,
      settings: [
        {
          key: 'push',
          label: 'Push Notifications',
          description: 'Receive push notifications in your browser',
        },
        {
          key: 'pushProjects',
          label: 'Project Alerts',
          description: 'Get push notifications for project updates',
        },
        {
          key: 'pushMessages',
          label: 'Message Alerts',
          description: 'Get push notifications for new messages',
        },
      ],
    },
    {
      title: 'SMS Notifications',
      icon: MessageSquare,
      settings: [
        {
          key: 'sms',
          label: 'SMS Notifications',
          description: 'Receive important updates via SMS',
        },
        {
          key: 'smsPayments',
          label: 'Payment Alerts',
          description: 'Get SMS alerts for payment transactions',
        },
      ],
    },
  ];

  const handleToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    if (onUpdate) {
      onUpdate(newSettings);
    }
  };

  return (
    <SettingsSection
      title="Notification Preferences"
      description="Choose how you want to be notified about activities"
      icon={Bell}
    >
      {notificationGroups.map((group, groupIndex) => {
        const GroupIcon = group.icon;
        return (
          <div key={groupIndex}>
            {groupIndex > 0 && <Separator className="my-6" />}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <GroupIcon className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{group.title}</h3>
              </div>
              {group.settings.map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <Label htmlFor={setting.key} className="font-medium cursor-pointer">
                      {setting.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    id={setting.key}
                    checked={settings[setting.key] || false}
                    onCheckedChange={() => handleToggle(setting.key)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </SettingsSection>
  );
};










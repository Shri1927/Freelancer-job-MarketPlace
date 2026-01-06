import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Bell, Lock, CreditCard, Globe, Shield } from 'lucide-react'

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    privacy: {
      profileVisibility: 'public',
      showEarnings: false
    },
    security: {
      twoFactor: false,
      loginAlerts: true
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray/100 mb-2">Settings</h1>
        <p className="text-gray/70">Manage your account settings and preferences</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-/30 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-6 h-6 text-primary/70" />
          <h2 className="text-xl font-bold text-gray/100">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray/100">Email Notifications</p>
              <p className="text-sm text-gray/70">Receive updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/80"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray/100">Push Notifications</p>
              <p className="text-sm text-gray/70">Receive push notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/80"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-/30 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-primary/70" />
          <h2 className="text-xl font-bold text-gray/100">Privacy</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray/100 mb-2">Profile Visibility</label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => setSettings({
                ...settings,
                privacy: { ...settings.privacy, profileVisibility: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="contacts">Contacts Only</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray/100">Show Earnings</p>
              <p className="text-sm text-gray/70">Display earnings on profile</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showEarnings}
                onChange={(e) => setSettings({
                  ...settings,
                  privacy: { ...settings.privacy, showEarnings: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/80"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-/30 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-primary/70" />
          <h2 className="text-xl font-bold text-gray/100">Security</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray/100">Two-Factor Authentication</p>
              <p className="text-sm text-gray/70">Add an extra layer of security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactor}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, twoFactor: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/80"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray/100">Login Alerts</p>
              <p className="text-sm text-gray/70">Get notified of new logins</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.loginAlerts}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, loginAlerts: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/80"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-primary/80 hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors">
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>
    </motion.div>
  )
}

export default Settings











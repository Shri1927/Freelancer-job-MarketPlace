import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Save, X, Camera, Star, MapPin, Briefcase, Calendar } from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Full Stack Developer',
    location: 'New York, USA',
    bio: 'Experienced full stack developer with 5+ years of expertise in React, Node.js, and cloud technologies.',
    hourlyRate: 50,
    skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
    experience: '5 years',
    education: 'BS Computer Science',
    languages: ['English', 'Spanish']
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray/100 mb-2">Profile</h1>
          <p className="text-gray/70">Manage your professional profile</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-primary/70 hover:bg-primary/80 text-white rounded-lg transition-colors"
        >
          {isEditing ? <X className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray/30 p-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-32 h-32 bg-primary/70 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              JD
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-primary/70 text-white rounded-full hover:bg-primary/80 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 text-xl font-bold"
                />
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-primary/70 hover:bg-primary/80 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray/100 mb-1">{profile.name}</h2>
                <p className="text-lg text-gray/70 mb-4">{profile.title}</p>
                <div className="flex items-center gap-4 text-sm text-gray/70 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow/50 text-yellow/50" />
                    <span>4.8 Rating</span>
                  </div>
                </div>
                <p className="text-gray/80 mb-4">{profile.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/20 text-primary/80 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray/30 p-6">
          <h3 className="text-lg font-bold text-gray/100 mb-4">Experience</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray/100">{profile.experience} of Experience</p>
              <p className="text-sm text-gray/70">Full Stack Development</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray/30 p-6">
          <h3 className="text-lg font-bold text-gray/100 mb-4">Education</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray/100">{profile.education}</p>
              <p className="text-sm text-gray/70">University Name</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile











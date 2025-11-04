import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Briefcase, Calendar, Edit2, Save } from "lucide-react";
import { toast } from "sonner";
import usersData from "@/data/users.json";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(usersData[0]);

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <Card className="p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-4xl font-bold text-primary-foreground">
                {userData.name.charAt(0)}
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="text-2xl font-bold"
                    />
                    <Input
                      value={userData.role}
                      onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold mb-1">{userData.name}</h1>
                    <p className="text-xl text-muted-foreground mb-3">{userData.role}</p>
                  </>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {userData.rating} rating
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {userData.completedProjects} projects
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {userData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(userData.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* About Section */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            {isEditing ? (
              <Textarea
                value={userData.bio}
                onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                rows={4}
              />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{userData.bio}</p>
            )}
          </Card>

          {/* Skills Section */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <Button variant="outline" className="mt-4">
                Add Skill
              </Button>
            )}
          </Card>

          {/* Pricing Section */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Pricing</h2>
            <div className="flex items-center gap-4">
              {isEditing ? (
                <div className="flex-1 max-w-xs">
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    value={userData.hourlyRate}
                    onChange={(e) => setUserData({ ...userData, hourlyRate: e.target.value })}
                  />
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                  <p className="text-3xl font-bold text-primary">{userData.hourlyRate}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                ) : (
                  <p className="text-muted-foreground mt-1">{userData.email}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={userData.location}
                    onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                  />
                ) : (
                  <p className="text-muted-foreground mt-1">{userData.location}</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

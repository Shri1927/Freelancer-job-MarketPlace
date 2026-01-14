import { useState } from "react"
import { motion } from "framer-motion"
import ProfileHeader from "@/components/profile/ProfileHeader"
import OverviewSection from "@/components/profile/OverviewSection"
import WorkExperienceSection from "@/components/profile/WorkExperienceSection"
import EducationSection from "@/components/profile/EducationSection"
import ResumeSection from "@/components/profile/ResumeSection"
import LanguagesSection from "@/components/profile/LanguagesSection"
import HourlyRateSection from "@/components/profile/HourlyRateSection"
import PersonalDetailsSection from "@/components/profile/PersonalDetailsSection"
import profileAvatar from "@/assets/profile-avatar.jpg"

const Profile = () => {
  // Profile Info State
  const [profile, setProfile] = useState({
    name: "Sarah Anderson",
    title: "Full Stack Developer",
    email: "sarah.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, California",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "AWS",
      "Docker",
      "REST APIs"
    ],
    avatarUrl: profileAvatar
  })

  // Overview State
  const [overview, setOverview] = useState(
    "Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications. Passionate about clean code, user experience, and delivering high-quality solutions. Proven track record of successfully completing projects for clients across various industries including fintech, healthcare, and e-commerce."
  )

  // Work Experience State
  const [experiences, setExperiences] = useState([
    {
      id: "1",
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      startDate: "Mar 2021",
      endDate: "Present",
      description:
        "Leading development of enterprise web applications using React, Node.js, and PostgreSQL. Mentoring junior developers and implementing best practices for code quality and testing."
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "Digital Innovations Inc",
      location: "Remote",
      startDate: "Jan 2019",
      endDate: "Feb 2021",
      description:
        "Developed and maintained multiple client-facing applications. Collaborated with cross-functional teams to deliver features on time and within budget."
    },
    {
      id: "3",
      title: "Junior Web Developer",
      company: "StartUp Labs",
      location: "Austin, TX",
      startDate: "Jun 2018",
      endDate: "Dec 2018",
      description:
        "Built responsive web interfaces and integrated RESTful APIs. Participated in code reviews and agile development processes."
    }
  ])

  // Education State
  const [educations, setEducations] = useState([
    {
      id: "1",
      degree: "Master of Science",
      institution: "Stanford University",
      field: "Computer Science",
      startDate: "Sep 2016",
      endDate: "May 2018",
      description:
        "Specialized in Software Engineering and Distributed Systems. GPA: 3.8/4.0"
    },
    {
      id: "2",
      degree: "Bachelor of Science",
      institution: "University of California, Berkeley",
      field: "Computer Science",
      startDate: "Sep 2012",
      endDate: "May 2016",
      description:
        "Minor in Mathematics. Dean's List all semesters. GPA: 3.7/4.0"
    }
  ])

  // Resume State
  const [resume, setResume] = useState({
    fileName: "Resume.pdf",
    fileUrl: "#",
    uploadedAt: new Date().toISOString()
  })

  // Languages State
  const [languages, setLanguages] = useState([
    { id: "1", name: "English", proficiency: "Native" },
    { id: "2", name: "Spanish", proficiency: "Conversational" },
    { id: "3", name: "French", proficiency: "Basic" }
  ])

  // Hourly Rate State
  const [hourlyRate, setHourlyRate] = useState(85)

  // Personal Details State
  const [personalDetails, setPersonalDetails] = useState({
    dateOfBirth: "June 15, 1992",
    country: "United States",
    streetAddress: "123 Tech Street",
    aptSuite: "Apt 4B",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102"
  })

  // Generate unique ID helper
  const generateId = () =>
    Math.random()
      .toString(36)
      .substr(2, 9)

  // Work Experience Handlers
  const handleAddExperience = exp => {
    setExperiences([{ ...exp, id: generateId() }, ...experiences])
  }

  const handleUpdateExperience = exp => {
    setExperiences(experiences.map(e => (e.id === exp.id ? exp : e)))
  }

  const handleDeleteExperience = id => {
    setExperiences(experiences.filter(e => e.id !== id))
  }

  // Education Handlers
  const handleAddEducation = edu => {
    setEducations([{ ...edu, id: generateId() }, ...educations])
  }

  const handleUpdateEducation = edu => {
    setEducations(educations.map(e => (e.id === edu.id ? edu : e)))
  }

  const handleDeleteEducation = id => {
    setEducations(educations.filter(e => e.id !== id))
  }

  // Language Handlers
  const handleAddLanguage = lang => {
    setLanguages([...languages, { ...lang, id: generateId() }])
  }

  const handleUpdateLanguage = lang => {
    setLanguages(languages.map(l => (l.id === lang.id ? lang : l)))
  }

  const handleDeleteLanguage = id => {
    setLanguages(languages.filter(l => l.id !== id))
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className=" ">
        {/* Page Header */}
        <div
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your freelancer profile and showcase your skills
          </p>
        </div>

        {/* Profile Sections */}
        <div className="space-y-6">
          <ProfileHeader profile={profile} onUpdate={setProfile} />

          <OverviewSection overview={overview} onUpdate={setOverview} />

          <WorkExperienceSection
            experiences={experiences}
            onAdd={handleAddExperience}
            onUpdate={handleUpdateExperience}
            onDelete={handleDeleteExperience}
          />

          <EducationSection
            educations={educations}
            onAdd={handleAddEducation}
            onUpdate={handleUpdateEducation}
            onDelete={handleDeleteEducation}
          />

          <ResumeSection resume={resume} onUpdate={setResume} />

          <LanguagesSection
            languages={languages}
            onAdd={handleAddLanguage}
            onUpdate={handleUpdateLanguage}
            onDelete={handleDeleteLanguage}
          />

          <HourlyRateSection rate={hourlyRate} onUpdate={setHourlyRate} />

          <PersonalDetailsSection
            details={personalDetails}
            onUpdate={setPersonalDetails}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile

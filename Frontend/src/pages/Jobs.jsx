import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import jobsData from "@/data/jobs.json";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [experienceLevel, setExperienceLevel] = useState("all");

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || job.category === category;
    const matchesExperience = experienceLevel === "all" || job.experienceLevel === experienceLevel;
    
    return matchesSearch && matchesCategory && matchesExperience;
  });

  const categories = ["all", ...Array.from(new Set(jobsData.map(job => job.category)))];
  const experienceLevels = ["all", ...Array.from(new Set(jobsData.map(job => job.experienceLevel)))];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2">Find Your Next Project</h1>
          <p className="text-muted-foreground">Browse through thousands of available jobs</p>
        </div>

        {/* Filters */}
        <div className="bg-card p-6 rounded-lg shadow-soft mb-8 border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative md:col-span-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setCategory("all");
                setExperienceLevel("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </p>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {filteredJobs.map((job, index) => (
            <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.05}s` }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No jobs found matching your criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;

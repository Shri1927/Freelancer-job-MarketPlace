import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import Jobs from "./pages/Jobs.jsx"
import JobDetail from "./pages/JobDetail.jsx"
import DashboardRouter from "./pages/DashboardRouter.jsx"
import Profile from "./pages/Profile.jsx"
import NotFound from "./pages/NotFound.jsx"
import PostJob from "./pages/PostJob.jsx"
import InviteFreelancers from "./pages/InviteFreelancers.jsx"
import Messages from "./pages/Messages.jsx"
import CreateContract from "./pages/CreateContract.jsx"
import Workroom from "./pages/Workroom.jsx"
import Feedback from "./pages/Feedback.jsx"
import Contracts from "./pages/Contracts.jsx"
import { useAuthStore } from '../src/store/auth.js'
import OnboardingQuestionnaire from '../src/pages/create_profile/OnboardingQuestionnaire.jsx'
import ProfileSetup from '../src/pages/create_profile/ProfileSetup.jsx'
import RoleSelector from '../src/pages/create_profile/RoleSelector.jsx'
import ClientProfile from './pages/ClientProfile.jsx'
import MyProposals from "./pages/dashboard/freelancer/MyProposals.jsx"
import ActiveProjects from "./pages/dashboard/freelancer/ActiveProjects.jsx"
import FreelancerSidebar from "./pages/dashboard/freelancer/FreelancerSidebar.jsx"
import FreelancerDashboard from "./pages/dashboard/freelancer/FreelancerDashboard.jsx"
import JobDetails from "./pages/dashboard/freelancer/JobDetails.jsx"
import QuickApply from "./pages/dashboard/freelancer/QuickApply.jsx"
import Discover from "./pages/dashboard/freelancer/Discover.jsx"
import MilestonesTasks from "./pages/dashboard/freelancer/MilestonesPage.jsx"
import ClientLayout from "./pages/dashboard/client/ClientLayout.jsx"
import ClientDashboard from "./pages/dashboard/client/ClientDashboard.jsx"
import ClientProjects from "./pages/dashboard/client/Projects.jsx"
import ClientBilling from "./pages/dashboard/client/Billing.jsx"
import ClientInvoices from "./pages/dashboard/client/Invoices.jsx"
import ClientProfilePage from "./pages/dashboard/client/Profile.jsx"
import ClientReports from "./pages/dashboard/client/Reports.jsx"
import ClientAnalytics from "./pages/dashboard/client/Analytics.jsx"
import ClientActivityLog from "./pages/dashboard/client/ActivityLog.jsx"
import ClientSettings from "./pages/dashboard/client/Settings.jsx"
import ClientProjectDetails from "./pages/dashboard/client/ProjectDetails.jsx"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/invitations" element={<InviteFreelancers />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/contract" element={<CreateContract />} />
          <Route path="/workroom" element={<Workroom />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/client" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="projects" element={<ClientProjects />} />
            <Route path="projects/:id" element={<ClientProjectDetails />} />
            <Route path="billing" element={<ClientBilling />} />
            <Route path="invoices" element={<ClientInvoices />} />
            <Route path="reports" element={<ClientReports />} />
            <Route path="analytics" element={<ClientAnalytics />} />
            <Route path="activity" element={<ClientActivityLog />} />
            <Route path="profile" element={<ClientProfilePage />} />
            <Route path="settings" element={<ClientSettings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/questions" element={<OnboardingQuestionnaire />} />
          <Route path="/create" element={<ProfileSetup />} />
          <Route path="/role" element={<RoleSelector />} />
          <Route path="/clientaccount" element={<ClientProfile />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/mile" element={<MilestonesTasks />} />

          <Route path="/discover/jobss/:id" element={<JobDetails />} />
          <Route path="/discover/jobss/:id/proposal" element={<QuickApply />} />
          
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App

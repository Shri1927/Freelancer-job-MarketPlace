import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RoleSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the mode (signin or signup) from the state
  const mode = location.state?.mode || 'signin';

  const roles = [
    {
      title: "I'm a Client",
      description:
        "Looking to hire talented freelancers for your projects. Post jobs, review proposals, and collaborate with top talent.",
      buttonText: mode === 'signin' ? "Sign In as Client" : "Sign Up as Client",
      icon: "💼",
      roleType: "client",
      color: "orange",
    },
    {
      title: "I'm a Freelancer",
      description:
        "Showcase your skills and find exciting projects. Browse jobs, submit proposals, and build your freelance career.",
      buttonText: mode === 'signin' ? "Sign In as Freelancer" : "Sign Up as Freelancer",
      icon: "👥",
      roleType: "freelancer",
      color: "green",
    },
  ];

  const handleRoleSelect = (roleType) => {
    // FIXED: Navigate to the correct page based on mode
    if (mode === 'signin') {
      navigate('/signin', { state: { role: roleType } });
    } else {
      navigate('/signup', { state: { role: roleType } }); // This was the issue - it was going to signin instead of signup
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Welcome to FreelanceHub</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your role and start your freelance journey. Whether you're hiring talent or building your career, we have you covered.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center max-w-4xl mx-auto">
          {roles.map((role, idx) => (
            <div key={idx} className="flex">
              <div className="flex flex-col text-center shadow-medium rounded-3xl p-8 bg-card hover:-translate-y-2 hover:shadow-large transition duration-300 w-full border border-border">
                {/* Icon */}
                <div
                  className="mx-auto flex items-center justify-center rounded-full mb-6"
                  style={{
                    width: "90px",
                    height: "90px",
                    backgroundColor:
                      role.color === "orange" ? "hsl(28 90% 55% / 0.1)" : "#1987541a",
                    fontSize: "2.8rem",
                  }}
                >
                  {role.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground">{role.title}</h3>
                <p className="text-muted-foreground flex-grow mt-2">{role.description}</p>

                {/* Button */}
                <button
                  onClick={() => handleRoleSelect(role.roleType)}
                  className="mt-4 px-6 py-3 font-semibold text-primary-foreground rounded-lg transition-colors bg-primary hover:bg-primary-light"
                >
                  {role.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back to home link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary-light font-medium text-sm"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
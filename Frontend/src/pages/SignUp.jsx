// SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '../store/auth'

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp, signInWithGoogle, signInWithFacebook } = useAuthStore();

  // Get role from state (from RoleSelector or from SignIn) or default to 'freelancer'
  const role = location.state?.role || 'freelancer';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: role
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      console.log('[SignUp] Starting signup process...');
      console.log('[SignUp] Form data:', formData);

      const result = await signUp(
        formData.email,
        formData.password,
        formData.name,
        formData.role
      );

      console.log('[SignUp] Signup result:', result);

      if (result && result.success) {
        console.log('[SignUp] Signup successful! Storing user and redirecting...');
        
        const userPayload = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
          userType: result.user.role,
          avatar: result.user.avatar
        };

        // Store user data in localStorage
        localStorage.setItem('userInfo', JSON.stringify(userPayload));

        const redirectTo = '/dashboard';
        console.log('[SignUp] userType:', userPayload.userType);
        console.log('[SignUp] Redirecting to', redirectTo);

        // Let DashboardRouter decide the correct dashboard based on userType
        navigate(redirectTo);
      } else {
        const errorMessage = result?.error || 'Failed to create account. Please try again.';
        setError(errorMessage);
        console.error('[SignUp] Signup failed:', errorMessage);
      }
    } catch (err) {
      console.error('[SignUp] Unexpected error during signup:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    
    try {
      const result = await signInWithGoogle();
      if (result && result.success) {
        navigate('/');
      } else {
        setError(result?.error || 'Failed to sign in with Google');
      }
    } catch (err) {
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setError('');
    setLoading(true);
    
    try {
      const result = await signInWithFacebook();
      if (result && result.success) {
        navigate('/');
      } else {
        setError(result?.error || 'Failed to sign in with Facebook');
      }
    } catch (err) {
      setError('Failed to sign in with Facebook');
    } finally {
      setLoading(false);
    }
  };

  // Dynamic content based on role
  const roleConfig = {
    client: {
      title: 'Create your client account',
      subtitle: 'Join FreelanceHub and start hiring freelancers',
      signinText: 'Sign in to your client account',
      signinLink: '/signin'
    },
    freelancer: {
      title: 'Create your freelancer account',
      subtitle: 'Join FreelanceHub and start your freelancing journey',
      signinText: 'Sign in to your account',
      signinLink: '/signin'
    }
  };

  const config = roleConfig[role] || roleConfig.freelancer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{config.title}</h1>
          <p className="text-muted-foreground">{config.subtitle}</p>
        </div>

        <div className="bg-card rounded-2xl shadow-medium p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-background"
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-background"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Hidden role field */}
            <input type="hidden" name="role" value={formData.role} />

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-background"
                  placeholder="Create a password (min. 6 characters)"
                  required
                  disabled={loading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-background"
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-light text-primary-foreground font-medium py-3 rounded-lg transition-colors disabled:bg-primary-dark disabled:cursor-not-allowed flex items-center justify-center shadow-soft"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-background"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium text-foreground">Google</span>
              </button>

              <button
                type="button"
                onClick={handleFacebookSignIn}
                disabled={loading}
                className="flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-background"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium text-foreground">Facebook</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link 
                to={config.signinLink} 
                state={{ role }}
                className="text-primary hover:text-primary-light font-medium"
              >
                {config.signinText}
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useAuthStore } from '../store/auth'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, user, signOut } = useAuthStore()

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary-700' : 'text-gray-700 hover:text-primary-700'}`

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-semibold text-primary-700">FreeLanceHub</Link>
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" className={navLinkClass} end>Home</NavLink>
              <NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink>
              {isAuthenticated && user?.role === 'client' && (
                <NavLink to="/post-job" className={navLinkClass}>Post a Job</NavLink>
              )}
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
              <input type="text" placeholder="Search" className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md" />
                <Link to="/signin" className="px-3 py-2 text-sm font-medium text-gray-700">Sign in</Link>
                <Link to="/signup" className="px-3 py-2 text-sm font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700">Sign up</Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink to="/messages" className={navLinkClass}>Messages</NavLink>
                <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
                {user?.role === 'client' ? (
                  <NavLink to="/dashboard/client" className={navLinkClass}>Dashboard</NavLink>
                ) : (
                  <NavLink to="/dashboard/freelancer" className={navLinkClass}>Dashboard</NavLink>
                )}
                <button
                  onClick={() => { signOut(); navigate('/') }}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-700"
                >Sign out</button>
              </div>
            )}
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen(v => !v)}>
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 flex flex-col gap-2">
            <NavLink to="/" className={navLinkClass} end onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/jobs" className={navLinkClass} onClick={() => setOpen(false)}>Jobs</NavLink>
            {isAuthenticated && user?.role === 'client' && (
              <NavLink to="/post-job" className={navLinkClass} onClick={() => setOpen(false)}>Post a Job</NavLink>
            )}
            <div className="h-px bg-gray-200 my-2" />
            {!isAuthenticated ? (
              <>
                <Link to="/signin" className="px-3 py-2 text-sm" onClick={() => setOpen(false)}>Sign in</Link>
                <Link to="/signup" className="px-3 py-2 text-sm bg-primary-600 text-white rounded-md" onClick={() => setOpen(false)}>Sign up</Link>
              </>
            ) : (
              <>
                <NavLink to="/messages" className={navLinkClass} onClick={() => setOpen(false)}>Messages</NavLink>
                <NavLink to="/profile" className={navLinkClass} onClick={() => setOpen(false)}>Profile</NavLink>
                {user?.role === 'client' ? (
                  <NavLink to="/dashboard/client" className={navLinkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
                ) : (
                  <NavLink to="/dashboard/freelancer" className={navLinkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
                )}
                <button
                  onClick={() => { signOut(); setOpen(false); navigate('/') }}
                  className="px-3 py-2 text-left text-sm text-gray-700"
                >Sign out</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}



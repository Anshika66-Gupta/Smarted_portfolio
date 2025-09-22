import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">My Portfolio</Link>
          <div className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button aria-label="Toggle menu" className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => setOpen((v) => !v)}>
              <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-2 bg-white dark:bg-gray-900 rounded-lg mt-2 p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-700 dark:text-gray-300'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

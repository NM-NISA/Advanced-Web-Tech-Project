'use client';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    const storedRole = localStorage.getItem('role');

    setToken(storedToken);

    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');

    localStorage.removeItem('role');

    localStorage.removeItem('user');

    window.location.href = '/login';
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl font-bold"
      >
        Job Searching System
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/">Home</Link>

        <Link href="/about">About</Link>

        <Link href="/jobs">Jobs</Link>

        {token && role === 'jobseeker' && (
          <>
            <Link href="/dashboard">
              Dashboard
            </Link>
          </>
        )}

        {token && role === 'employer' && (
          <>
            <Link href="/employer">
              Employer Panel
            </Link>
          </>
        )}

        {token && role === 'admin' && (
          <>
            <Link href="/admin">
              Admin Panel
            </Link>
          </>
        )}

        {!token && (
          <>
            <Link href="/login">
              Login
            </Link>

            <Link href="/signup">
              Signup
            </Link>
          </>
        )}

        {token && (
          <button
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
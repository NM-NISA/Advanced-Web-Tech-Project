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
        JSS Job Portal
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/">Home</Link>

        <span>|</span>

        <Link href="/about">About</Link>

        <span>|</span>

        <Link href="/jobs">Jobs</Link>

        <span>|</span>

        {token && role === 'jobseeker' && (
          <>
            <Link href="/dashboard">
              Dashboard
            </Link>

            <span>|</span>
          </>
        )}

        {token && role === 'employer' && (
          <>
            <Link href="/employer">
              Dashboard
            </Link>

            <span>|</span>
          </>
        )}

        {token && role === 'admin' && (
          <>
            <Link href="/admin">
              Dashboard
            </Link>

            <span>|</span>
          </>
        )}

        {!token && (
          <>
            <Link href="/login">
              Login
            </Link>

            <span>|</span>

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
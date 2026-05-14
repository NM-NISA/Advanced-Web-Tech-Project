'use client';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();

  const [token, setToken] = useState<
    string | null
  >(null);

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);

    const storedToken =
      localStorage.getItem('token');

    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');

    setToken(null);

    router.push('/login');
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        Job Searching System
      </h1>

      <div className="space-x-6">
        <Link href="/">Home</Link>

        <Link href="/about">About</Link>

        <Link href="/jobs">Jobs</Link>

        {token ? (
          <>
            <Link href="/dashboard">
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              Login
            </Link>

            <Link href="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
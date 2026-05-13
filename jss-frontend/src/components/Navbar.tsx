'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        Job Searching System
      </h1>

      <div className="space-x-6">
        <Link href="/">Home</Link>

        <Link href="/about">About</Link>

        <Link href="/jobs">Jobs</Link>

        <Link href="/login">Login</Link>

        <Link href="/signup">Signup</Link>
      </div>
    </nav>
  );
}
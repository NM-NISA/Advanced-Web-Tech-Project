'use client';

import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function HomePage() {

  const router = useRouter();

  return (
    <div>
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/076/725/742/small/business-meeting-in-progress-with-people-analyzing-charts-and-using-technology-photo.jpeg')",
          }}
        ></div>

        <div className="absolute inset-0 bg-white/20"></div>

        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-5xl font-bold text-blue-700 mb-6">
            Find Your Dream Job
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Our Job Searching System helps
            employers post jobs and job seekers
            apply with professional CV upload
            and secure application tracking.
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => router.push('/jobs')}>
            Explore Jobs
          </button>
        </div>
      </section>
    </div>
  );
}
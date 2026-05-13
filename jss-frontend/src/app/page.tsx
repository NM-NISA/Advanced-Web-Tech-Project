import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <section className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl font-bold text-blue-700 mb-6">
            Find Your Dream Job
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Our Job Searching System helps
            employers post jobs and job seekers
            apply with professional CV upload
            and secure application tracking.
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Explore Jobs
          </button>
        </div>
      </section>
    </div>
  );
}
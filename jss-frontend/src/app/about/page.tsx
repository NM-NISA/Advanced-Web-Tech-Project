import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          About Our Platform
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          This Job Searching System is a
          modern recruitment platform built
          using Next.js, NestJS, PostgreSQL,
          and JWT authentication.
        </p>

        <p className="text-lg text-gray-700 mb-6">
          Employers can create job posts,
          manage applicants, and review CVs.
        </p>

        <p className="text-lg text-gray-700">
          Job seekers can search jobs,
          upload CVs, and track application
          status securely.
        </p>
      </div>
    </div>
  );
}
import React from "react";

const experiences = [
  {
    company: "SmartEd Solutions",
    logo: "/images/smarted-logo.png",
    role: "Frontend Developer",
    period: "Jan 2023 – Present",
    location: "Remote",
    description:
      "Developed and maintained scalable React applications, collaborated with cross-functional teams, and implemented modern UI/UX best practices.",
    skills: ["React", "Vite", "Tailwind CSS", "REST APIs"],
  },
  {
    company: "Tech Innovators",
    logo: "/images/techinnovators-logo.png",
    role: "Software Engineer Intern",
    period: "Jun 2022 – Dec 2022",
    location: "Bangalore, India",
    description:
      "Worked on backend APIs and contributed to the migration of legacy systems to Node.js and MongoDB.",
    skills: ["Node.js", "MongoDB", "Express"],
  },
  // Add more experiences as needed
];

export default function Experiences() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-12 px-4 sm:px-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-800 tracking-tight">
        Professional Experience
      </h1>
      <div className="max-w-3xl mx-auto">
        <ol className="relative border-l-4 border-blue-400">
          {experiences.map((exp, idx) => (
            <li key={idx} className="mb-12 ml-6 group">
              <span className="absolute flex items-center justify-center w-12 h-12 bg-white rounded-full -left-6 ring-4 ring-blue-200 shadow-md">
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="w-8 h-8 object-contain"
                />
              </span>
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform group-hover:scale-105 group-hover:shadow-xl">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-blue-700">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-700 font-medium">
                    {exp.company}
                  </span>
                  <span className="text-xs text-gray-400">{exp.location}</span>
                </div>
                <p className="text-gray-700 mt-2">{exp.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="text-center mt-12">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Let’s Connect
          </a>
        </div>
      </div>
    </div>
  );
}
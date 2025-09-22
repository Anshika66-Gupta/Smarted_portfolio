import { useState, useEffect } from 'react';

const experiences = [
  {
    id: 1,
    role: 'Senior Full-Stack Developer',
    company: 'TechCorp Solutions',
    period: '2023 - Present',
    duration: '1+ years',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Leading development of enterprise-scale applications and mentoring junior developers.',
    longDescription: 'Spearheading the development of microservices architecture for a SaaS platform serving 100K+ users. Implemented CI/CD pipelines reducing deployment time by 60% and led a team of 5 developers.',
    achievements: [
      'Reduced application load time by 40% through performance optimization',
      'Led migration from monolithic to microservices architecture',
      'Mentored 3 junior developers and improved team productivity by 25%',
      'Implemented automated testing increasing code coverage to 90%'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes'],
    metrics: { teamSize: '5', users: '100K+', performance: '+40%' },
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  {
    id: 2,
    role: 'Full-Stack Developer',
    company: 'InnovateLab',
    period: '2021 - 2023',
    duration: '2 years',
    location: 'Remote',
    type: 'Full-time',
    description: 'Developed full-stack web applications and collaborated with cross-functional teams.',
    longDescription: 'Built responsive web applications using modern JavaScript frameworks. Collaborated with designers and product managers to deliver user-centric solutions. Contributed to open-source projects and maintained high code quality standards.',
    achievements: [
      'Developed 15+ production applications with 99.9% uptime',
      'Improved user engagement by 35% through UX optimization',
      'Reduced bug reports by 60% through comprehensive testing',
      'Contributed to 3 open-source projects with 500+ GitHub stars'
    ],
    technologies: ['Vue.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'],
    metrics: { projects: '15+', uptime: '99.9%', engagement: '+35%' },
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'Digital Agency Pro',
    period: '2020 - 2021',
    duration: '1 year',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Specialized in creating responsive and interactive user interfaces.',
    longDescription: 'Focused on frontend development using React and modern CSS frameworks. Worked closely with clients to understand requirements and deliver pixel-perfect designs. Optimized applications for performance and accessibility.',
    achievements: [
      'Created 20+ responsive websites with mobile-first approach',
      'Improved Core Web Vitals scores by 50% across all projects',
      'Implemented accessibility features reaching WCAG 2.1 AA compliance',
      'Reduced bundle size by 30% through code optimization'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Figma', 'Webpack', 'Jest'],
    metrics: { websites: '20+', performance: '+50%', accessibility: 'WCAG 2.1' },
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  {
    id: 4,
    role: 'Junior Developer',
    company: 'StartupXYZ',
    period: '2019 - 2020',
    duration: '1 year',
    location: 'Austin, TX',
    type: 'Full-time',
    description: 'Started my professional journey building web applications from scratch.',
    longDescription: 'Began my career as a junior developer in a fast-paced startup environment. Learned modern development practices, version control, and collaborative workflows. Contributed to the company\'s growth from 10 to 50 employees.',
    achievements: [
      'Built first production application serving 1K+ users',
      'Learned agile development methodologies and best practices',
      'Contributed to company growth from 10 to 50 employees',
      'Completed 5 professional development courses'
    ],
    technologies: ['JavaScript', 'HTML', 'CSS', 'jQuery', 'Bootstrap', 'Git'],
    metrics: { users: '1K+', growth: '5x', courses: '5' },
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800'
  }
];


export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExperience((prev) => (prev + 1) % experiences.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-24">
      {/* Header */}
      <div className="text-center mb-20 sm:mb-24">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
          Professional Journey
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
          A timeline of my career progression, showcasing growth, achievements, and the technologies 
          I've mastered along the way.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="relative mb-24 sm:mb-32">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
        
        <div className="space-y-20 sm:space-y-24">
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white dark:bg-gray-800 border-4 border-indigo-500 rounded-full shadow-lg z-10"></div>
              
              {/* Experience Card */}
              <div className={`w-full sm:w-5/12 ${index % 2 === 0 ? 'sm:pr-12 lg:pr-16' : 'sm:pl-12 lg:pl-16'}`}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border-2 ${exp.borderColor} ${exp.bgColor} p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                    activeExperience === index ? 'scale-105 shadow-xl' : ''
                  }`}
                  onClick={() => setActiveExperience(index)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {exp.period}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {exp.duration}
                        </div>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="px-4 py-2 text-sm font-medium bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-full">
                        {exp.type}
                      </span>
                      <span className="px-4 py-2 text-sm font-medium bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-full">
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {exp.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                          {tech}
                        </span>
                      ))}
                      {exp.technologies.length > 4 && (
                        <span className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                          +{exp.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      {Object.entries(exp.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-2 sm:p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                          <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{value}</div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Experience Modal */}
      {experiences[activeExperience] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6 z-50" onClick={() => setActiveExperience(-1)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{experiences[activeExperience].role}</h3>
                  <p className="text-lg sm:text-xl text-indigo-600 dark:text-indigo-400 mb-1">{experiences[activeExperience].company}</p>
                  <p className="text-gray-500 dark:text-gray-400">{experiences[activeExperience].period}</p>
                </div>
                <button
                  onClick={() => setActiveExperience(-1)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-10 leading-relaxed text-base sm:text-lg">
                {experiences[activeExperience].longDescription}
              </p>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">Key Achievements</h4>
                  <ul className="space-y-4">
                    {experiences[activeExperience].achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        <svg className="w-5 h-5 text-green-500 mr-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {experiences[activeExperience].technologies.map((tech) => (
                      <span key={tech} className="px-4 py-2 text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


    </section>
  );
}
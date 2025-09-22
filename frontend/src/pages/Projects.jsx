import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with advanced features including real-time inventory management, payment processing, and admin dashboard.',
    longDescription: 'Built with React, Node.js, and MongoDB, this platform handles thousands of transactions daily with 99.9% uptime. Features include advanced search, recommendation engine, and mobile-responsive design.',
    image: '🛒',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    category: 'Full-Stack',
    github: 'https://github.com',
    live: 'https://example.com',
    features: ['Real-time inventory', 'Payment processing', 'Admin dashboard', 'Mobile responsive'],
    metrics: { users: '10K+', revenue: '$50K+', uptime: '99.9%' }
  },
  {
    id: 2,
    title: 'AI-Powered Analytics Dashboard',
    description: 'Intelligent data visualization platform with machine learning insights and predictive analytics for business intelligence.',
    longDescription: 'Developed using React, Python, and TensorFlow. Processes millions of data points to provide actionable insights and predictive analytics for business decision-making.',
    image: '📊',
    status: 'In Development',
    statusColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    tech: ['React', 'Python', 'TensorFlow', 'D3.js', 'PostgreSQL'],
    category: 'AI/ML',
    github: 'https://github.com',
    live: null,
    features: ['ML predictions', 'Real-time data', 'Custom dashboards', 'Export reports'],
    metrics: { accuracy: '94%', dataPoints: '1M+', users: '500+' }
  },
  {
    id: 3,
    title: 'Collaborative Task Manager',
    description: 'Team collaboration tool with real-time updates, project tracking, and integrated communication features.',
    longDescription: 'Built with Vue.js and Node.js, featuring real-time collaboration, file sharing, and project management tools. Supports teams of up to 100 members with advanced permission controls.',
    image: '📋',
    status: 'Open Source',
    statusColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    tech: ['Vue.js', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    category: 'Collaboration',
    github: 'https://github.com',
    live: 'https://example.com',
    features: ['Real-time updates', 'File sharing', 'Team chat', 'Project tracking'],
    metrics: { teams: '200+', tasks: '50K+', stars: '1.2K' }
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication, transaction management, and financial insights.',
    longDescription: 'Developed using React Native and Node.js with bank-level security. Features include biometric login, transaction categorization, spending analytics, and fraud detection.',
    image: '🏦',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Biometric Auth', 'Encryption'],
    category: 'FinTech',
    github: null,
    live: 'https://example.com',
    features: ['Biometric auth', 'Transaction tracking', 'Spending insights', 'Fraud detection'],
    metrics: { users: '25K+', transactions: '100K+', security: 'Bank-grade' }
  },
  {
    id: 5,
    title: 'IoT Smart Home Hub',
    description: 'Centralized control system for smart home devices with automation, energy monitoring, and security features.',
    longDescription: 'Built with React, Python, and IoT protocols. Integrates with 50+ device types, provides energy usage analytics, and includes advanced automation rules and security monitoring.',
    image: '🏠',
    status: 'In Development',
    statusColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    tech: ['React', 'Python', 'MQTT', 'Raspberry Pi', 'MongoDB'],
    category: 'IoT',
    github: 'https://github.com',
    live: null,
    features: ['Device control', 'Automation rules', 'Energy monitoring', 'Security alerts'],
    metrics: { devices: '50+', energy: '30% saved', uptime: '99.5%' }
  },
  {
    id: 6,
    title: 'Content Management System',
    description: 'Headless CMS with advanced content modeling, multi-language support, and API-first architecture.',
    longDescription: 'Built with Next.js and Node.js, featuring advanced content modeling, multi-language support, and API-first architecture. Powers 100+ websites with custom content types and workflows.',
    image: '📝',
    status: 'Open Source',
    statusColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    tech: ['Next.js', 'Node.js', 'GraphQL', 'MongoDB', 'Docker'],
    category: 'CMS',
    github: 'https://github.com',
    live: 'https://example.com',
    features: ['Content modeling', 'Multi-language', 'API-first', 'Custom workflows'],
    metrics: { websites: '100+', content: '1M+', performance: '95/100' }
  }
];

const categories = ['All', 'Full-Stack', 'AI/ML', 'Collaboration', 'FinTech', 'IoT', 'CMS'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Featured Projects
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A showcase of my most impactful projects, demonstrating expertise across various technologies 
          and industries. Each project represents a unique challenge and innovative solution.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Project Image/Icon */}
            <div className="h-48 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center relative overflow-hidden">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-500">
                {project.image}
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 rounded-full">
                  {project.category}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Code
                  </a>
                )}
                
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}

                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedProject(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Project Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{key}</div>
                      </div>
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
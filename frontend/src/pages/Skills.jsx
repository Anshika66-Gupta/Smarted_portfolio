import { useState } from 'react';

const skillCategories = {
  'Frontend Development': {
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    skills: [
      { name: 'React', level: 95, icon: '⚛️', description: 'Advanced component architecture and hooks' },
      { name: 'JavaScript', level: 90, icon: '🟨', description: 'ES6+, async programming, modern patterns' },
      { name: 'TypeScript', level: 85, icon: '🔷', description: 'Type safety and advanced TypeScript features' },
      { name: 'Tailwind CSS', level: 88, icon: '🎨', description: 'Utility-first styling and responsive design' },
      { name: 'Next.js', level: 80, icon: '▲', description: 'Full-stack React framework and SSR' },
      { name: 'Vue.js', level: 75, icon: '💚', description: 'Component-based architecture and reactivity' }
    ]
  },
  'Backend Development': {
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    skills: [
      { name: 'Node.js', level: 90, icon: '🟢', description: 'Server-side JavaScript and event-driven architecture' },
      { name: 'Express.js', level: 88, icon: '🚀', description: 'Web application framework and RESTful APIs' },
      { name: 'Python', level: 85, icon: '🐍', description: 'Django, Flask, and data science libraries' },
      { name: 'PostgreSQL', level: 82, icon: '🐘', description: 'Relational database design and optimization' },
      { name: 'MongoDB', level: 80, icon: '🍃', description: 'NoSQL database and document modeling' },
      { name: 'GraphQL', level: 75, icon: '🔺', description: 'Query language and schema design' }
    ]
  },
  'DevOps & Tools': {
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    skills: [
      { name: 'Docker', level: 85, icon: '🐳', description: 'Containerization and orchestration' },
      { name: 'AWS', level: 80, icon: '☁️', description: 'Cloud services and infrastructure' },
      { name: 'Git', level: 92, icon: '📚', description: 'Version control and collaborative workflows' },
      { name: 'CI/CD', level: 78, icon: '🔄', description: 'Continuous integration and deployment' },
      { name: 'Linux', level: 85, icon: '🐧', description: 'System administration and shell scripting' },
      { name: 'Kubernetes', level: 70, icon: '⚙️', description: 'Container orchestration and scaling' }
    ]
  },
  'Design & UX': {
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    skills: [
      { name: 'Figma', level: 88, icon: '🎭', description: 'UI/UX design and prototyping' },
      { name: 'Adobe XD', level: 80, icon: '🎨', description: 'User experience design and wireframing' },
      { name: 'Photoshop', level: 75, icon: '🖼️', description: 'Image editing and graphic design' },
      { name: 'User Research', level: 82, icon: '🔍', description: 'User testing and usability analysis' },
      { name: 'Prototyping', level: 85, icon: '📱', description: 'Interactive prototypes and user flows' }
    ]
  }
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend Development');

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Technical Expertise
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A comprehensive overview of my technical skills and expertise across different domains. 
          Each skill represents years of hands-on experience and continuous learning.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.keys(skillCategories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === category
                ? `bg-gradient-to-r ${skillCategories[category].color} text-white shadow-lg transform scale-105`
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories[activeCategory].skills.map((skill, index) => (
          <div
            key={skill.name}
            className={`group relative overflow-hidden rounded-2xl border-2 ${skillCategories[activeCategory].borderColor} ${skillCategories[activeCategory].bgColor} p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${skillCategories[activeCategory].color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                    {skill.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{skill.level}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Proficiency</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full transition-all duration-1000 ease-out relative`}
                    style={{ width: `${skill.level}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {skill.description}
              </p>

              {/* Skill Level Indicator */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < Math.floor(skill.level / 20)
                          ? `bg-gradient-to-r ${skillCategories[activeCategory].color}`
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {skill.level >= 90 ? 'Expert' : skill.level >= 75 ? 'Advanced' : skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                </span>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center group">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
            {Object.values(skillCategories).reduce((acc, category) => acc + category.skills.length, 0)}+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Technologies</div>
        </div>
        <div className="text-center group">
          <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
            {Object.keys(skillCategories).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Categories</div>
        </div>
        <div className="text-center group">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
            5+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Years Experience</div>
        </div>
        <div className="text-center group">
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
            100%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Continuous Learning</div>
        </div>
      </div>
    </section>
  );
}
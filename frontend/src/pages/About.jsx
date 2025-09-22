import { useState, useEffect } from 'react';

const achievements = [
  { number: '5+', label: 'Years Experience', icon: '🚀' },
  { number: '50+', label: 'Projects Completed', icon: '💼' },
  { number: '100%', label: 'Client Satisfaction', icon: '⭐' },
  { number: '24/7', label: 'Available', icon: '⏰' }
];

const values = [
  {
    title: 'Innovation',
    description: 'Always exploring new technologies and pushing the boundaries of what\'s possible.',
    icon: '💡'
  },
  {
    title: 'Quality',
    description: 'Committed to delivering high-quality solutions that exceed expectations.',
    icon: '🎯'
  },
  {
    title: 'Collaboration',
    description: 'Believing in the power of teamwork and open communication.',
    icon: '🤝'
  },
  {
    title: 'Growth',
    description: 'Continuously learning and adapting to stay ahead in the tech industry.',
    icon: '📈'
  }
];

export default function About() {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue((prev) => (prev + 1) % values.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        <div className="order-2 lg:order-1">
          <div className="mb-8">
            <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
          </div>
          
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              I'm a passionate software engineer with a love for creating beautiful, functional web applications. 
              With expertise in modern JavaScript frameworks and backend technologies, I specialize in building 
              scalable solutions that deliver exceptional user experiences.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community. I believe in continuous learning and staying 
              up-to-date with the latest industry trends.
            </p>
            <p>
              My goal is to bridge the gap between design and functionality, creating applications that are not 
              only technically sound but also visually appealing and user-friendly.
            </p>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative group">
            <div className="w-96 h-96 rounded-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <div className="w-88 h-88 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                <div className="text-8xl group-hover:scale-110 transition-transform duration-500">👩‍💻</div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow group-hover:animate-spin">
              <span className="text-2xl">✨</span>
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
              <span className="text-lg">🚀</span>
            </div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center shadow-lg animate-float">
              <span className="text-sm">💡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">My Values</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The principles that guide my work and shape my approach to every project
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 transform hover:-translate-y-2 ${
                currentValue === index
                  ? 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-2 border-indigo-200 dark:border-indigo-700 shadow-xl'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg'
              }`}
            >
              <div className="text-center">
                <div className={`text-4xl mb-4 transition-transform duration-300 ${
                  currentValue === index ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
              
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 ${
                currentValue === index ? 'opacity-100' : 'group-hover:opacity-100'
              }`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">By the Numbers</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A snapshot of my professional journey and achievements
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className="group text-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {achievement.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="text-center">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-3xl p-12 border border-indigo-200 dark:border-indigo-700">
            <div className="text-6xl mb-6">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              My Philosophy
            </h3>
            <blockquote className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed italic">
              "Technology should serve humanity, not the other way around. Every line of code I write, 
              every design decision I make, is guided by the principle of creating solutions that are 
              not just functional, but meaningful and accessible to everyone."
            </blockquote>
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              — Anshika Gupta, Software Engineer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
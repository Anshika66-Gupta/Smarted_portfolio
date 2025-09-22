import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const typingTexts = [
  "Full-Stack Developer",
  "React Specialist", 
  "UI/UX Enthusiast",
  "Problem Solver"
];

export default function Home() {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = typingTexts[currentText];
      
      if (isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length - 1));
      } else {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      }

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentText((prev) => (prev + 1) % typingTexts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentText]);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-300 dark:bg-indigo-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Anshika Gupta
                </span>
              </h1>
              <div className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300 h-12 flex items-center">
                <span className="text-indigo-600 dark:text-indigo-400">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              I craft beautiful, performant web experiences with modern technologies. 
              Passionate about creating solutions that make a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                to="/projects" 
                className="group inline-flex items-center justify-center px-8 py-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>View My Work</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                to="/contact" 
                className="group inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <span>Get In Touch</span>
                <svg className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:your@email.com" className="group p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative group">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <div className="w-72 h-72 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-500">👩‍💻</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow group-hover:animate-spin">
                <span className="text-2xl">✨</span>
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                <span className="text-lg">🚀</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">3+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
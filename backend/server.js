const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enhanced CORS configuration for React frontend
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:5173', // Vite default port
    'http://localhost:5174', // Vite alternative port
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With', 
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📡 ${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://techyanshika01_db_user:GSIRCQFAcPp3dmWt@cluster-smarted.livmqej.mongodb.net/portfolio?retryWrites=true&w=majority';
mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log('✅ MongoDB connected successfully');
    // Populate demo data after successful connection
    await populateDemoData();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    // Don't exit the process, let the server continue running
    console.log('Server will continue running without database connection');
  });

// Message model
const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
const Message = mongoose.model('Message', MessageSchema);

// About model
const AboutSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100
    },
    bio: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 2000
    },
    photo: { 
      type: String, 
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const About = mongoose.model('About', AboutSchema);

// Skills model
const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Tools'],
      trim: true
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    icon: {
      type: String,
      trim: true
    },
    color: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', SkillSchema);

// Experience model
const ExperienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    period: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    },
    longDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    achievements: [{
      type: String,
      trim: true,
      maxlength: 200
    }],
    technologies: [{
      type: String,
      trim: true,
      maxlength: 50
    }],
    metrics: {
      teamSize: String,
      users: String,
      performance: String,
      projects: String,
      uptime: String,
      engagement: String,
      websites: String,
      accessibility: String,
      growth: String,
      courses: String
    },
    color: {
      type: String,
      trim: true
    },
    bgColor: {
      type: String,
      trim: true
    },
    borderColor: {
      type: String,
      trim: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Experience = mongoose.model('Experience', ExperienceSchema);

// Project model
const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    category: {
      type: String,
      required: true,
      enum: ['AI/ML', 'Full-Stack', 'FinTech', 'IoT', 'CMS', 'Collaboration', 'Mobile', 'Web', 'Desktop'],
      trim: true
    },
    desc: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    longDesc: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    tech: [{
      type: String,
      trim: true,
      maxlength: 50
    }],
    status: {
      type: String,
      required: true,
      enum: ['Live', 'In Development', 'Open Source', 'Completed', 'On Hold'],
      trim: true
    },
    href: {
      type: String,
      trim: true
    },
    demoHref: {
      type: String,
      trim: true
    },
    metrics: {
      users: String,
      accuracy: String,
      uptime: String,
      revenue: String,
      orders: String,
      conversion: String,
      features: String,
      security: String,
      devices: String,
      latency: String,
      energySaving: String,
      blogs: String,
      articles: String,
      loadTime: String,
      concurrentUsers: String
    },
    features: [{
      type: String,
      trim: true,
      maxlength: 100
    }],
    image: {
      type: String,
      trim: true
    },
    order: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);

// Certification model
const CertificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    date: {
      type: String,
      required: true,
      trim: true
    },
    credentialId: {
      type: String,
      trim: true,
      maxlength: 50
    },
    credentialUrl: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    skills: [{
      type: String,
      trim: true,
      maxlength: 50
    }]
  },
  { timestamps: true }
);

const Certification = mongoose.model('Certification', CertificationSchema);

// Demo data population function
async function populateDemoData() {
  try {
    // Check if data already exists
    const existingSkills = await Skill.countDocuments();
    const existingExperiences = await Experience.countDocuments();
    const existingProjects = await Project.countDocuments();
    const existingCertifications = await Certification.countDocuments();

    if (existingSkills === 0) {
      console.log('📝 Populating Skills demo data...');
      const skillsData = [
        // Frontend Skills
        { name: 'React', category: 'Frontend', level: 90, description: 'Building dynamic and responsive user interfaces.', icon: '⚛️', color: '#61DAFB' },
        { name: 'JavaScript (ES6+)', category: 'Frontend', level: 95, description: 'Core language for web development, modern features.', icon: '🟨', color: '#F7DF1E' },
        { name: 'TypeScript', category: 'Frontend', level: 80, description: 'Adding type safety and improving code quality.', icon: '🔷', color: '#3178C6' },
        { name: 'Tailwind CSS', category: 'Frontend', level: 90, description: 'Rapid UI development with utility-first CSS.', icon: '🎨', color: '#06B6D4' },
        { name: 'HTML5/CSS3', category: 'Frontend', level: 95, description: 'Foundational web technologies, semantic markup, modern styling.', icon: '🌐', color: '#E34F26' },
        { name: 'Vite', category: 'Frontend', level: 85, description: 'Fast build tool for modern web projects.', icon: '⚡', color: '#646CFF' },
        
        // Backend Skills
        { name: 'Node.js', category: 'Backend', level: 85, description: 'Server-side JavaScript runtime for scalable applications.', icon: '🟢', color: '#339933' },
        { name: 'Express.js', category: 'Backend', level: 88, description: 'Minimalist web framework for Node.js.', icon: '🚀', color: '#000000' },
        { name: 'Python', category: 'Backend', level: 75, description: 'Versatile language for scripting, data analysis, and backend.', icon: '🐍', color: '#3776AB' },
        { name: 'RESTful APIs', category: 'Backend', level: 90, description: 'Designing and implementing robust API services.', icon: '🔌', color: '#FF6B6B' },
        { name: 'Authentication (JWT)', category: 'Backend', level: 80, description: 'Securing applications with token-based authentication.', icon: '🔐', color: '#FFD93D' },
        
        // Database Skills
        { name: 'MongoDB', category: 'Database', level: 85, description: 'NoSQL database for flexible data storage.', icon: '🍃', color: '#47A248' },
        { name: 'Mongoose', category: 'Database', level: 88, description: 'MongoDB object data modeling for Node.js.', icon: '📦', color: '#880000' },
        { name: 'PostgreSQL', category: 'Database', level: 70, description: 'Powerful open-source relational database.', icon: '🐘', color: '#336791' },
        { name: 'SQL', category: 'Database', level: 75, description: 'Querying and managing relational databases.', icon: '🗄️', color: '#CC2927' },
        
        // DevOps Skills
        { name: 'Git', category: 'DevOps', level: 90, description: 'Version control system for collaborative development.', icon: '📋', color: '#F05032' },
        { name: 'Docker', category: 'DevOps', level: 70, description: 'Containerization for consistent environments.', icon: '🐳', color: '#2496ED' },
        { name: 'CI/CD', category: 'DevOps', level: 65, description: 'Automating build, test, and deployment pipelines.', icon: '🔄', color: '#2088FF' },
        
        // Design Skills
        { name: 'Figma', category: 'Design', level: 70, description: 'Collaborative interface design tool.', icon: '🎨', color: '#F24E1E' },
        { name: 'Responsive Design', category: 'Design', level: 90, description: 'Building layouts that adapt to any screen size.', icon: '📱', color: '#FF6B6B' },
        { name: 'User Experience (UX)', category: 'Design', level: 80, description: 'Focusing on intuitive and enjoyable user journeys.', icon: '👤', color: '#4ECDC4' }
      ];
      
      await Skill.insertMany(skillsData);
      console.log('✅ Skills demo data populated successfully');
    }

    if (existingExperiences === 0) {
      console.log('📝 Populating Experience demo data...');
      const experiencesData = [
        {
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
          borderColor: 'border-blue-200 dark:border-blue-800',
          order: 1
        },
        {
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
          borderColor: 'border-green-200 dark:border-green-800',
          order: 2
        }
      ];
      
      await Experience.insertMany(experiencesData);
      console.log('✅ Experience demo data populated successfully');
    }

    if (existingProjects === 0) {
      console.log('📝 Populating Projects demo data...');
      const projectsData = [
        {
          title: 'AI-Powered Chatbot',
          category: 'AI/ML',
          desc: 'A conversational AI assistant integrated with various platforms.',
          longDesc: 'Developed a robust AI chatbot using natural language processing (NLP) and machine learning models. The bot can handle complex queries, provide personalized responses, and integrate with CRM systems. Features include sentiment analysis, intent recognition, and multi-language support.',
          tech: ['Python', 'TensorFlow', 'Flask', 'React', 'MongoDB'],
          status: 'Live',
          href: 'https://github.com/example/ai-chatbot',
          demoHref: 'https://ai-chatbot.example.com',
          metrics: { users: '10K+', accuracy: '92%', uptime: '99.9%' },
          features: ['Natural Language Processing', 'Sentiment Analysis', 'Multi-platform Integration', 'Scalable Architecture'],
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format&q=80',
          order: 1,
          featured: true
        },
        {
          title: 'E-Commerce Platform',
          category: 'Full-Stack',
          desc: 'A scalable online store with secure payment processing.',
          longDesc: 'Built a full-stack e-commerce platform from scratch, featuring product management, user authentication, shopping cart functionality, and secure payment gateway integration. Optimized for performance and SEO, providing a seamless shopping experience.',
          tech: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Stripe'],
          status: 'Live',
          href: 'https://github.com/example/ecommerce',
          demoHref: 'https://ecommerce.example.com',
          metrics: { revenue: '$50K+', orders: '2K+', conversion: '3.5%' },
          features: ['Product Catalog', 'User Authentication', 'Secure Payments', 'Order Management', 'Admin Dashboard'],
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format&q=80',
          order: 2,
          featured: true
        }
      ];
      
      await Project.insertMany(projectsData);
      console.log('✅ Projects demo data populated successfully');
    }

    if (existingCertifications === 0) {
      console.log('📝 Populating Certifications demo data...');
      const certificationsData = [
        {
          name: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          date: '2023',
          credentialId: 'AWS-DEV-123456',
          credentialUrl: 'https://aws.amazon.com/certification/',
          image: 'https://images.aws.amazon.com/certification/aws-certified-developer-associate.png',
          skills: ['AWS', 'Cloud Computing', 'Serverless', 'Lambda', 'API Gateway']
        },
        {
          name: 'React Developer Certification',
          issuer: 'Meta',
          date: '2022',
          credentialId: 'META-REACT-789012',
          credentialUrl: 'https://www.meta.com/careers/',
          image: 'https://react.dev/images/react-logo.png',
          skills: ['React', 'JavaScript', 'JSX', 'Hooks', 'State Management']
        }
      ];
      
      await Certification.insertMany(certificationsData);
      console.log('✅ Certifications demo data populated successfully');
    }

    console.log('🎉 All demo data populated successfully!');
  } catch (error) {
    console.error('❌ Error populating demo data:', error);
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// About API endpoints
// GET - Retrieve about information
app.get('/api/about', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Return static data if database is not connected
      const staticAboutData = {
        name: "Anshika Gupta",
        title: "Full-Stack Developer & UI/UX Designer",
        bio: "Passionate Full-Stack Developer with 5+ years of experience in creating innovative and user-centric web applications. I specialize in React, Node.js, and modern web technologies, with a strong focus on clean code, performance optimization, and exceptional user experiences.",
        shortDescription: "Crafting performant, accessible, and beautiful web experiences with a passion for innovation and clean code.",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
        education: [
          {
            degree: "Bachelor of Technology in Computer Science",
            institution: "Delhi Technological University",
            year: "2019-2023",
            gpa: "8.5/10"
          },
          {
            degree: "Full-Stack Web Development Certification",
            institution: "FreeCodeCamp",
            year: "2022",
            gpa: "N/A"
          }
        ],
        location: "New Delhi, India",
        email: "anshika.gupta@example.com",
        phone: "+91 98765 43210",
        socialLinks: {
          github: "https://github.com/anshikagupta",
          linkedin: "https://linkedin.com/in/anshikagupta",
          twitter: "https://twitter.com/anshikagupta",
          portfolio: "https://anshikagupta.dev"
        },
        skills: {
          frontend: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
          backend: ["Node.js", "Express.js", "Python", "GraphQL", "REST APIs", "MongoDB", "PostgreSQL"],
          tools: ["Git", "Docker", "AWS", "Figma", "VS Code", "Postman", "Jest"]
        },
        experience: {
          years: "5+",
          projects: "20+",
          clients: "15+",
          satisfaction: "100%"
        },
        languages: [
          { name: "English", proficiency: "Fluent" },
          { name: "Hindi", proficiency: "Native" },
          { name: "Spanish", proficiency: "Intermediate" }
        ],
        interests: [
          "Web Development",
          "UI/UX Design",
          "Open Source",
          "Machine Learning",
          "Photography",
          "Travel"
        ],
        availability: "Available for freelance projects",
        timezone: "IST (UTC+5:30)"
      };

      return res.json({
        success: true,
        data: staticAboutData,
        source: 'static',
        timestamp: new Date().toISOString()
      });
    }

    // Try to get data from database
    const aboutData = await About.findOne().sort({ createdAt: -1 });
    
    if (!aboutData) {
      // If no data in database, return static data
      const staticAboutData = {
        name: "Anshika Gupta",
        bio: "Passionate Full-Stack Developer with 5+ years of experience in creating innovative and user-centric web applications.",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
      };
      
      return res.json({
        success: true,
        data: staticAboutData,
        source: 'static',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: aboutData,
      source: 'database',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Get about data error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});

// POST - Create new about information
app.post('/api/about', async (req, res) => {
  try {
    const { name, bio, photo } = req.body;
    
    if (!name || !bio || !photo) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, bio, and photo are required' 
      });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false,
        message: 'Database not connected' 
      });
    }

    const aboutData = new About({ name, bio, photo });
    const savedAbout = await aboutData.save();
    
    res.status(201).json({
      success: true,
      message: 'About information created successfully',
      data: savedAbout
    });
  } catch (err) {
    console.error('Create about data error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});

// PUT - Update about information
app.put('/api/about/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, photo } = req.body;
    
    if (!name || !bio || !photo) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, bio, and photo are required' 
      });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false,
        message: 'Database not connected' 
      });
    }

    const updatedAbout = await About.findByIdAndUpdate(
      id,
      { name, bio, photo },
      { new: true, runValidators: true }
    );
    
    if (!updatedAbout) {
      return res.status(404).json({ 
        success: false,
        message: 'About information not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'About information updated successfully',
      data: updatedAbout
    });
  } catch (err) {
    console.error('Update about data error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});

// DELETE - Delete about information
app.delete('/api/about/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false,
        message: 'Database not connected' 
      });
    }

    const deletedAbout = await About.findByIdAndDelete(id);
    
    if (!deletedAbout) {
      return res.status(404).json({ 
        success: false,
        message: 'About information not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'About information deleted successfully',
      data: deletedAbout
    });
  } catch (err) {
    console.error('Delete about data error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});

// Legacy static about endpoint (keeping for backward compatibility)
app.get('/api/about/static', (req, res) => {
  const aboutData = {
    name: "Anshika Gupta",
    title: "Full-Stack Developer & UI/UX Designer",
    bio: "Passionate Full-Stack Developer with 5+ years of experience in creating innovative and user-centric web applications. I specialize in React, Node.js, and modern web technologies, with a strong focus on clean code, performance optimization, and exceptional user experiences.",
    shortDescription: "Crafting performant, accessible, and beautiful web experiences with a passion for innovation and clean code.",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    education: [
      {
        degree: "Bachelor of Technology in Computer Science",
        institution: "Delhi Technological University",
        year: "2019-2023",
        gpa: "8.5/10"
      },
      {
        degree: "Full-Stack Web Development Certification",
        institution: "FreeCodeCamp",
        year: "2022",
        gpa: "N/A"
      }
    ],
    location: "New Delhi, India",
    email: "anshika.gupta@example.com",
    phone: "+91 98765 43210",
    socialLinks: {
      github: "https://github.com/anshikagupta",
      linkedin: "https://linkedin.com/in/anshikagupta",
      twitter: "https://twitter.com/anshikagupta",
      portfolio: "https://anshikagupta.dev"
    },
    skills: {
      frontend: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
      backend: ["Node.js", "Express.js", "Python", "GraphQL", "REST APIs", "MongoDB", "PostgreSQL"],
      tools: ["Git", "Docker", "AWS", "Figma", "VS Code", "Postman", "Jest"]
    },
    experience: {
      years: "5+",
      projects: "20+",
      clients: "15+",
      satisfaction: "100%"
    },
    languages: [
      { name: "English", proficiency: "Fluent" },
      { name: "Hindi", proficiency: "Native" },
      { name: "Spanish", proficiency: "Intermediate" }
    ],
    interests: [
      "Web Development",
      "UI/UX Design", 
      "Open Source",
      "Machine Learning",
      "Photography",
      "Travel"
    ],
    availability: "Available for freelance projects",
    timezone: "IST (UTC+5:30)"
  };

  res.json({
    success: true,
    data: aboutData,
    timestamp: new Date().toISOString()
  });
});

// Skills API endpoint
app.get('/api/skills', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Return static data if database is not connected
      const staticSkillsData = {
        categories: {
          Frontend: [
            { name: 'React', level: 90, description: 'Building dynamic and responsive user interfaces.' },
            { name: 'JavaScript (ES6+)', level: 95, description: 'Core language for web development, modern features.' },
            { name: 'TypeScript', level: 80, description: 'Adding type safety and improving code quality.' },
            { name: 'Tailwind CSS', level: 90, description: 'Rapid UI development with utility-first CSS.' },
            { name: 'HTML5/CSS3', level: 95, description: 'Foundational web technologies, semantic markup, modern styling.' },
            { name: 'Vite', level: 85, description: 'Fast build tool for modern web projects.' }
          ],
          Backend: [
            { name: 'Node.js', level: 85, description: 'Server-side JavaScript runtime for scalable applications.' },
            { name: 'Express.js', level: 88, description: 'Minimalist web framework for Node.js.' },
            { name: 'Python', level: 75, description: 'Versatile language for scripting, data analysis, and backend.' },
            { name: 'RESTful APIs', level: 90, description: 'Designing and implementing robust API services.' },
            { name: 'Authentication (JWT)', level: 80, description: 'Securing applications with token-based authentication.' }
          ],
          Database: [
            { name: 'MongoDB', level: 85, description: 'NoSQL database for flexible data storage.' },
            { name: 'Mongoose', level: 88, description: 'MongoDB object data modeling for Node.js.' },
            { name: 'PostgreSQL', level: 70, description: 'Powerful open-source relational database.' },
            { name: 'SQL', level: 75, description: 'Querying and managing relational databases.' }
          ],
          DevOps: [
            { name: 'Git', level: 90, description: 'Version control system for collaborative development.' },
            { name: 'Docker', level: 70, description: 'Containerization for consistent environments.' },
            { name: 'CI/CD', level: 65, description: 'Automating build, test, and deployment pipelines.' }
          ],
          Design: [
            { name: 'Figma', level: 70, description: 'Collaborative interface design tool.' },
            { name: 'Responsive Design', level: 90, description: 'Building layouts that adapt to any screen size.' },
            { name: 'User Experience (UX)', level: 80, description: 'Focusing on intuitive and enjoyable user journeys.' }
          ]
        },
        summary: {
          totalSkills: 20,
          yearsCoding: 5,
          technologiesMastered: 15,
          averageProficiency: 90
        },
        certifications: [
          {
            name: 'AWS Certified Developer',
            issuer: 'Amazon Web Services',
            date: '2023',
            credentialId: 'AWS-DEV-123456'
          },
          {
            name: 'React Developer Certification',
            issuer: 'Meta',
            date: '2022',
            credentialId: 'META-REACT-789012'
          }
        ]
      };

      return res.json({
        success: true,
        data: staticSkillsData,
        source: 'static',
        timestamp: new Date().toISOString()
      });
    }

    // Get skills from database
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    const certifications = await Certification.find().sort({ date: -1 });

    // Group skills by category
    const categories = {};
    skills.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push({
        name: skill.name,
        level: skill.level,
        description: skill.description,
        icon: skill.icon,
        color: skill.color
      });
    });

    // Calculate summary statistics
    const totalSkills = skills.length;
    const averageProficiency = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills);

    const skillsData = {
      categories,
      summary: {
        totalSkills,
        yearsCoding: 5,
        technologiesMastered: totalSkills,
        averageProficiency
      },
      certifications: certifications.map(cert => ({
        name: cert.name,
        issuer: cert.issuer,
        date: cert.date,
        credentialId: cert.credentialId,
        credentialUrl: cert.credentialUrl,
        image: cert.image,
        skills: cert.skills
      }))
    };

    res.json({
      success: true,
      data: skillsData,
      source: 'database',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Get skills error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});

// Experience API endpoint
app.get('/api/experience', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Return static data if database is not connected
      const staticExperienceData = {
        experiences: [
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
          }
        ],
        summary: {
          totalExperience: '5+ years',
          companies: 4,
          positions: 4,
          totalProjects: 50
        }
      };

      return res.json({
        success: true,
        data: staticExperienceData,
        source: 'static',
        timestamp: new Date().toISOString()
      });
    }

    // Get experiences from database
    const experiences = await Experience.find().sort({ order: 1 });

    const experienceData = {
      experiences: experiences.map(exp => ({
        id: exp._id,
        role: exp.role,
        company: exp.company,
        period: exp.period,
        duration: exp.duration,
        location: exp.location,
        type: exp.type,
        description: exp.description,
        longDescription: exp.longDescription,
        achievements: exp.achievements,
        technologies: exp.technologies,
        metrics: exp.metrics,
        color: exp.color,
        bgColor: exp.bgColor,
        borderColor: exp.borderColor
      })),
      summary: {
        totalExperience: '5+ years',
        companies: experiences.length,
        positions: experiences.length,
        totalProjects: 50
      }
    };

    res.json({
      success: true,
      data: experienceData,
      source: 'database',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Get experience error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});

// Projects API endpoint
app.get('/api/projects', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Return static data if database is not connected
      const staticProjectsData = {
        projects: [
          {
            id: 1,
            title: 'AI-Powered Chatbot',
            category: 'AI/ML',
            desc: 'A conversational AI assistant integrated with various platforms.',
            longDesc: 'Developed a robust AI chatbot using natural language processing (NLP) and machine learning models. The bot can handle complex queries, provide personalized responses, and integrate with CRM systems. Features include sentiment analysis, intent recognition, and multi-language support.',
            tech: ['Python', 'TensorFlow', 'Flask', 'React', 'MongoDB'],
            status: 'Live',
            href: 'https://github.com/example/ai-chatbot',
            demoHref: 'https://ai-chatbot.example.com',
            metrics: { users: '10K+', accuracy: '92%', uptime: '99.9%' },
            features: ['Natural Language Processing', 'Sentiment Analysis', 'Multi-platform Integration', 'Scalable Architecture'],
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format&q=80'
          },
          {
            id: 2,
            title: 'E-Commerce Platform',
            category: 'Full-Stack',
            desc: 'A scalable online store with secure payment processing.',
            longDesc: 'Built a full-stack e-commerce platform from scratch, featuring product management, user authentication, shopping cart functionality, and secure payment gateway integration. Optimized for performance and SEO, providing a seamless shopping experience.',
            tech: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Stripe'],
            status: 'Live',
            href: 'https://github.com/example/ecommerce',
            demoHref: 'https://ecommerce.example.com',
            metrics: { revenue: '$50K+', orders: '2K+', conversion: '3.5%' },
            features: ['Product Catalog', 'User Authentication', 'Secure Payments', 'Order Management', 'Admin Dashboard'],
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format&q=80'
          }
        ],
        categories: ['All', 'AI/ML', 'Full-Stack', 'FinTech', 'IoT', 'CMS', 'Collaboration'],
        summary: {
          totalProjects: 6,
          liveProjects: 3,
          inDevelopment: 2,
          openSource: 1
        }
      };

      return res.json({
        success: true,
        data: staticProjectsData,
        source: 'static',
        timestamp: new Date().toISOString()
      });
    }

    // Get projects from database
    const projects = await Project.find().sort({ order: 1 });

    const projectsData = {
      projects: projects.map(project => ({
        id: project._id,
        title: project.title,
        category: project.category,
        desc: project.desc,
        longDesc: project.longDesc,
        tech: project.tech,
        status: project.status,
        href: project.href,
        demoHref: project.demoHref,
        metrics: project.metrics,
        features: project.features,
        image: project.image,
        featured: project.featured
      })),
      categories: ['All', 'AI/ML', 'Full-Stack', 'FinTech', 'IoT', 'CMS', 'Collaboration'],
      summary: {
        totalProjects: projects.length,
        liveProjects: projects.filter(p => p.status === 'Live').length,
        inDevelopment: projects.filter(p => p.status === 'In Development').length,
        openSource: projects.filter(p => p.status === 'Open Source').length
      }
    };

    res.json({
      success: true,
      data: projectsData,
      source: 'database',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Get projects error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not connected, but message received:', { name, email, message: message.substring(0, 50) + '...' });
      return res.status(201).json({ 
        message: 'Message received successfully (saved locally)', 
        id: 'local-' + Date.now() 
      });
    }
    
    const doc = await Message.create({ name, email, message });
    res.status(201).json({ 
      message: 'Message saved successfully', 
      id: doc._id 
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({ 
        message: 'Database not connected', 
        messages: [] 
      });
    }
    
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    res.json(messages);
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /api/health',
      'GET /api/about',
      'POST /api/about',
      'PUT /api/about/:id',
      'DELETE /api/about/:id',
      'GET /api/skills',
      'GET /api/experience',
      'GET /api/projects',
      'GET /api/contact',
      'POST /api/contact'
    ]
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Global Error Handler:', err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: errors
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
      field: field
    });
  }
  
  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('📦 MongoDB connection closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('📦 MongoDB connection closed.');
    process.exit(0);
  });
});

// Start server with enhanced logging
app.listen(port, () => {
  console.log('🚀 ===========================================');
  console.log('🚀 Portfolio Backend Server Started!');
  console.log('🚀 ===========================================');
  console.log(`🌐 Server running on: http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
  console.log(`📝 API Documentation:`);
  console.log(`   GET  /api/about     - Get about information`);
  console.log(`   POST /api/about     - Create about information`);
  console.log(`   PUT  /api/about/:id - Update about information`);
  console.log(`   GET  /api/skills    - Get skills data`);
  console.log(`   GET  /api/experience - Get experience data`);
  console.log(`   GET  /api/projects  - Get projects data`);
  console.log(`   GET  /api/contact   - Get contact messages`);
  console.log(`   POST /api/contact   - Submit contact form`);
  console.log(`🗄️  MongoDB Status: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('🚀 ===========================================');
  console.log('💡 Use Ctrl+C to stop the server');
  console.log('🔄 Nodemon is watching for file changes...');
});

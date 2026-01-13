import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Code2, Terminal, Cpu, Globe, Database, Layers, Github, Linkedin, Mail, 
  Sparkles, Zap, Network, Binary, Activity, GraduationCap, ChevronDown, 
  ExternalLink, ArrowUpRight
} from 'lucide-react';

// --- Configuration & Data ---

const projectsData = [
  {
    id: 'minicompiler',
    title: 'MiniCompiler',
    subtitle: 'System Engineering',
    description: 'A robust compiler built from scratch for a Python-like language using C++. Focuses on memory efficiency, Lexical Analysis (Flex), Parsing (Bison), and complex data structures.',
    tags: ["C++", "Flex", "Bison", "Compilers"],
    github: "https://github.com/yos4i/MiniCompiler",
    image: "/assets/minicompiler.png",
    color: "blue"
  },
  {
    id: 'seemanthink',
    title: 'Seemanthink',
    subtitle: 'Artificial Intelligence',
    description: 'AI semantic solver for the Semantle game. Utilizes Word2Vec and proprietary clustering algorithms to decipher semantic relationships and solve word puzzles efficiently.',
    tags: ["Python", "NLP", "Word2Vec", "AI"],
    github: "https://github.com/yos4i/Seemanthink",
    image: "/assets/seemanthink.png",
    color: "indigo"
  },
  {
    id: 'tmmpro',
    title: 'TMMPro',
    subtitle: 'Backend Architecture',
    description: 'Production-ready Task Management Microservice. Built with Java 17 & Spring Boot, featuring automated scheduling, JPA persistence, and a layered architectural design.',
    tags: ["Java", "Spring Boot", "Microservices"],
    github: "https://github.com/yos4i/TMMPro",
    image: "/assets/tmmpro.png",
    color: "green"
  },
  {
    id: 'empire',
    title: 'Empire',
    subtitle: 'Full Stack Web',
    description: 'Modern shift management platform. Features real-time updates for shift changes, algorithmic weekly schedule generation, and a responsive React frontend.',
    tags: ["React", "Firebase", "Tailwind"],
    github: "https://github.com/yos4i/Empire",
    image: "/assets/empire.png",
    color: "purple"
  },
  {
    id: 'pricetracker',
    title: 'Amazon Price Tracker',
    subtitle: 'Data Engineering',
    description: 'Automated ETL pipeline using n8n and Google Sheets to monitor and visualize Amazon RAM price volatility. Features real-time data scraping, automated cleaning, and interactive market trend analysis. Identified 244% price surge in DDR5 modules between Q4 2025 and Q1 2026.',
    tags: ["n8n", "ScraperAPI", "JavaScript", "Google Sheets", "ETL"],
    github: "https://github.com/yos4i/Amazon-Price-Tracker",
    image: "/assets/pricetracker.png",
    color: "orange"
  },
];

// Color Mapping
const colorVariants = {
  blue: { bg: "bg-blue-600", text: "text-blue-600", light: "bg-blue-50" },
  indigo: { bg: "bg-indigo-600", text: "text-indigo-600", light: "bg-indigo-50" },
  green: { bg: "bg-green-600", text: "text-green-600", light: "bg-green-50" },
  purple: { bg: "bg-purple-600", text: "text-purple-600", light: "bg-purple-50" },
  orange: { bg: "bg-orange-600", text: "text-orange-600", light: "bg-orange-50" }
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- Components ---

const SectionHeading = ({ title, subtitle, icon: Icon }) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
    className="mb-12"
  >
    <div className="flex items-center gap-3 mb-2">
      {Icon && <Icon className="text-blue-600" size={24} />}
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{title}</h2>
    </div>
    <div className="h-1 w-20 bg-blue-600 mb-4"></div>
    {subtitle && <p className="text-slate-500 dark:text-slate-400 font-medium">{subtitle}</p>}
  </motion.div>
);

const SkillCategory = ({ title, skills, icon: Icon, gradient }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all overflow-hidden text-center"
  >
    {/* Gradient background overlay on hover */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient}`}></div>

    {/* Icon with gradient background - centered */}
    <div className="relative z-10 mb-6 flex justify-center">
      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
        <Icon size={32} className="text-white" />
      </div>
    </div>

    {/* Title - centered */}
    <h3 className="relative z-10 font-black text-xl mb-6 text-slate-900 dark:text-white tracking-tight group-hover:text-white transition-colors duration-300">
      {title}
    </h3>

    {/* Skills - centered */}
    <div className="relative z-10 flex flex-wrap gap-2 justify-center">
      {skills.map(skill => (
        <span
          key={skill}
          className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 group-hover:bg-white/95 group-hover:text-slate-900 group-hover:border-white/50 transition-all"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

// --- THE STACKING CARD COMPONENT ---
const Card = ({ project, index, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(scrollYProgress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }} 
        className="relative flex flex-col md:flex-row w-full max-w-7xl h-[85vh] bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 origin-top"
      >
        {/* Content Side */}
        <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-between h-full relative z-10 bg-white dark:bg-slate-900">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl text-white shadow-lg ${colorVariants[project.color].bg}`}>
                {project.id === 'minicompiler' && <Terminal size={20} />}
                {project.id === 'seemanthink' && <Cpu size={20} />}
                {project.id === 'tmmpro' && <Database size={20} />}
                {project.id === 'empire' && <Globe size={20} />}
                {project.id === 'pricetracker' && <Activity size={20} />}
              </div>
              <span className={`text-sm font-bold uppercase tracking-widest ${colorVariants[project.color].text}`}>{project.subtitle}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              {project.title}
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
            
            <a 
              href={project.github}
              target="_blank"
              rel="noreferrer" 
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-transform hover:-translate-y-1 shadow-lg ${colorVariants[project.color].bg}`}
            >
              <Github size={20} /> View Project
            </a>
          </div>
        </div>

        {/* Image Side */}
        <div className={`w-full md:w-[60%] h-full relative overflow-hidden ${project.id === 'pricetracker' ? 'bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900' : 'bg-slate-100 dark:bg-slate-950'}`}>
          <motion.div style={{ scale: imageScale }} className="w-full h-full flex items-center justify-center p-8">
            <img
              src={project.image}
              alt={project.title}
              className={`${project.id === 'pricetracker' ? 'w-full h-full object-contain' : 'w-full h-full object-cover'}`}
              onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/1200x800/1e293b/FFF?text=Project+Preview";
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default function App() {
  const container = useRef(null);
  
  const githubUrl = "https://github.com/yos4i";
  const linkedinUrl = "https://www.linkedin.com/in/yossi-elbaz-289a21277/";
  const emailUrl = "mailto:yossi5196@gmail.com";

  return (
    <div ref={container} className="bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 text-slate-900 dark:text-slate-100">
      
      {/* --- HERO SECTION (Original) --- */}
      <section className="min-h-screen flex flex-col justify-center items-center relative px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-7xl md:text-9xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
            YOSSI<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ELBAZ</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 font-medium">
            Computer Science Graduate specializing in <span className="text-slate-900 dark:text-white underline decoration-blue-500 decoration-4">Systems Design</span>, <span className="text-slate-900 dark:text-white underline decoration-indigo-500 decoration-4">Cybersecurity</span> & <span className="text-slate-900 dark:text-white underline decoration-purple-500 decoration-4">AI</span>.
          </p>
          
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-8 px-8 py-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl">
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-all hover:scale-110"><Linkedin size={28} /></a>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-110"><Github size={28} /></a>
                <a href={emailUrl} className="text-slate-400 hover:text-red-500 transition-all hover:scale-110"><Mail size={28} /></a>
            </div>
          </div>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 opacity-30">
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* --- STACKING PROJECTS SECTION --- */}
      <section id="projects" className="relative pb-16">
        <div className="mb-16 px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                Featured Projects
              </h2>
            </motion.div>
        </div>
        
        <div className="w-full">
            {projectsData.map((project, i) => {
            const targetScale = 1 - ((projectsData.length - i) * 0.05);
            return (
                <Card 
                key={project.id} 
                index={i} 
                project={project} 
                range={[i * .25, 1]} 
                targetScale={targetScale} 
                />
            )
            })}
        </div>
      </section>

      {/* --- TECH ARSENAL --- */}
      <section className="relative py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Centered heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Technical Arsenal
            </h2>
          </motion.div>

          {/* Grid of skill cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <SkillCategory
              title="Programming"
              icon={Code2}
              skills={["C++", "Python", "C", "Java", "SQL", "Bash", "Assembly"]}
              gradient="from-blue-500 to-cyan-500"
            />
            <SkillCategory
              title="Core Systems"
              icon={Database}
              skills={["Compilers", "Operating Systems", "Multithreading", "Memory Management"]}
              gradient="from-purple-500 to-pink-500"
            />
            <SkillCategory
              title="Networking & Security"
              icon={Network}
              skills={["Socket Programming", "TCP/IP", "Cryptography", "Pentesting", "Secure Design"]}
              gradient="from-red-500 to-orange-500"
            />
            <SkillCategory
              title="AI & Data Science"
              icon={Binary}
              skills={["NLP", "Machine Learning", "Clustering", "Word2Vec", "NumPy", "Pandas", "Scikit-learn"]}
              gradient="from-green-500 to-emerald-500"
            />
            <SkillCategory
              title="Environment & Tools"
              icon={Layers}
              skills={["Linux", "Git", "GCC", "Firebase", "React", "Flex", "Bison"]}
              gradient="from-indigo-500 to-blue-500"
            />
            <SkillCategory
              title="Computer Science"
              icon={Binary}
              skills={["Data Structures", "Algorithms", "Complexity", "Automata"]}
              gradient="from-violet-500 to-purple-500"
            />
          </motion.div>
        </div>
      </section>

      {/* --- EDUCATION & LANGUAGES --- */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Education
            </h2>
          </motion.div>
          <div className="bg-slate-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-3xl font-black mb-2 tracking-tight">SAMI SHAMOON COLLEGE (SCE)</h3>
              <p className="text-blue-400 font-bold text-xl mb-2">B.Sc. in Computer Science</p>
              <p className="text-slate-400">2022 — 2025</p>
            </div>
            <div className="flex gap-12 relative z-10">
               <div className="text-center">
                  <p className="text-[10px] uppercase font-black text-slate-500 mb-2 tracking-[0.2em]">Hebrew</p>
                  <p className="text-2xl font-black">Native</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] uppercase font-black text-slate-500 mb-2 tracking-[0.2em]">English</p>
                  <p className="text-2xl font-black">Fluent</p>
               </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500 opacity-5 rounded-full"></div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
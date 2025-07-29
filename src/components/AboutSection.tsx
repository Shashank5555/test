import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  PaintBrush,
  MagnifyingGlass,
  Code,
  Palette,
  Pencil,
  Monitor,
  ArrowRight,
  Desktop,
  Gear,
  Globe,
  CheckCircle
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState(0);

  const expertiseCategories = [
    {
      name: 'Programming & Development',
      icon: Code,
      skills: ['Python', 'JavaScript', 'SQL & PostgreSQL', 'HTML/CSS', 'Git & GitHub', 'Docker & Jenkins']
    },
    {
      name: 'Machine Learning & AI',
      icon: Gear,
      skills: ['Machine Learning', 'Deep Learning & LLMs', 'Computer Vision', 'Natural Language Processing', 'Statistical Analysis']
    },
    {
      name: 'Data Analysis & Visualization',
      icon: Palette,
      skills: ['Data Visualization (Matplotlib, Seaborn)', 'Pandas', 'NumPy', 'Exploratory Data Analysis', 'Data Wrangling']
    },
    {
      name: 'Web Development & Cloud',
      icon: Globe,
      skills: ['Web Development (HTML/CSS/JS)', 'FastAPI', 'FlutterFlow', 'Cloud (DigitalOcean)', 'Cross-platform Apps']
    },
    {
      name: 'Tools & Technologies',
      icon: PaintBrush,
      skills: ['Jupyter Notebooks', 'VS Code', 'Modern ML Libraries', 'Microservices', 'Automated Processes']
    }
  ];

  const experiences = [
    {
      title: 'Python Developer – LVTLABS (USA)',
      description:
        'Leading development of cross‑platform applications and scalable microservices architecture. Implementing modern technologies and best practices to deliver robust, high‑performance solutions that meet enterprise requirements.',
    },
    {
      title: 'Systems Engineer – Tata Consultancy Services (India)',
      description:
        'Orchestrated end‑to‑end automation of complex business processes and seamless integration of data from multiple enterprise systems. Designed and implemented efficient data pipelines that improved operational efficiency by 40%.',
    },
  ];

  // Auto-change categories every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % expertiseCategories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [expertiseCategories.length]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Set initial states
    gsap.set([profileRef.current, contentRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });

    gsap.set(skillsRef.current?.children, {
      opacity: 0,
      scale: 0.8,
      filter: 'blur(5px)'
    });

    // Animate profile image from left
    tl.to(profileRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    })
    // Animate content from right
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    }, "-=0.7")
    // Animate skills with stagger
    .to(skillsRef.current?.children, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.5");


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden bg-background-secondary"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Photo & About Me */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Profile Image */}
          <div ref={profileRef} className="relative flex justify-center">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden transition-all duration-300">
              <img
                src="/lovable-uploads/6fbc99c3-45a2-47f6-9d79-25327a6dbe4a.png"
                alt="Sai Shashank Yerra - Data Scientist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* About Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl lg:text-4xl font-inter font-light text-foreground">
                About <span className="text-primary">Me</span>
              </h2>
              <div className="w-12 h-0.5 bg-primary/40 rounded-full"></div>
            </div>

            <div className="space-y-4 text-base text-muted-foreground font-inter font-light leading-relaxed">
              <p>
                I am a data scientist and software developer based in Baltimore, Maryland. I earned my Master of Professional Studies in Data Science from the University of Maryland, Baltimore County (UMBC) in May 2024, graduating with a GPA of 3.9/4.0.
              </p>
              <p>
                Prior to that, I completed a Bachelor of Technology in Information Technology from Gayatri Vidya Parishad College of Engineering in India.
              </p>
              <p>
                Currently, I work as a Python Developer at LVTLABS, where I build cross-platform apps and scalable microservices. Previously, I served as a Systems Engineer at Tata Consultancy Services, developing automated processes and integrating data from dozens of sources.
              </p>
              <p>
                I'm passionate about leveraging data to solve real-world problems—whether that means creating personalized recommendation systems, analysing social media to deliver targeted content, building accessible computer-vision tools or optimising healthcare outcomes with predictive models.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'Sai_Shashank_Yerra_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors duration-300"
              >
                Download Resume
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div ref={skillsRef} className="space-y-12 mb-20">
          <h3 className="text-3xl lg:text-4xl font-inter font-light text-foreground mb-12 text-center">
            Skills
          </h3>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Sidebar - Categories */}
            <div className="space-y-4">
              {expertiseCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(index)}
                    className={`w-full p-4 rounded-lg border text-left transition-colors duration-300 flex items-center gap-3 ${
                      activeCategory === index
                        ? 'bg-primary/10 border-primary/30 text-foreground'
                        : 'bg-background/50 border-muted-foreground/20 text-muted-foreground hover:border-muted-foreground/40'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activeCategory === index ? 'bg-primary/20' : 'bg-muted-foreground/10'
                      }`}
                    >
                      <IconComponent size={16} className={activeCategory === index ? 'text-primary' : 'text-muted-foreground'} />
                    </div>
                    <span className="text-sm font-inter">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Content - Skills */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  {(() => {
                    const IconComponent = expertiseCategories[activeCategory].icon;
                    return <IconComponent size={20} className="text-primary" />;
                  })()}
                </div>
                <h4 className="text-lg font-inter font-medium text-foreground">
                  {expertiseCategories[activeCategory].name}
                </h4>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {expertiseCategories[activeCategory].skills.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-container bg-card border border-border/50 rounded-lg p-3 flex items-center gap-2 hover:border-primary/30 transition-colors duration-300"
                  >
                    <CheckCircle size={14} className="text-primary" />
                    <span className="text-sm text-foreground font-inter">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="space-y-8">
          <h3 className="text-3xl lg:text-4xl font-inter font-light text-foreground mb-12 text-center">
            Experience
          </h3>
          {/* Experience cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="bg-card border border-border/50 rounded-lg p-6 space-y-2"
              >
                <h4 className="text-lg font-inter font-medium text-foreground">
                  {experience.title}
                </h4>
                <p className="text-sm text-muted-foreground font-inter leading-relaxed">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
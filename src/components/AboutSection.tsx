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
  Globe
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState(0);

  const expertiseCategories = [
    {
      name: 'Tools & Platforms',
      icon: PaintBrush,
      skills: ['Figma', 'Adobe Creative Cloud (Photoshop, Illustrator, InDesign)', 'Adobe XD', 'Axure RP', 'Framer', 'Miro', 'Notion', 'Zeplin']
    },
    {
      name: 'UX & Visual Design',
      icon: Palette,
      skills: ['HCI design principles', 'wireframing', 'prototyping', 'user flows', 'hi-fi mockups', 'design systems', 'IA', 'heuristic analysis', 'interaction design', 'storytelling', 'usability & A/B testing', 'user journey mapping', 'quantitative & qualitative research']
    },
    {
      name: 'Frameworks & Methodologies',
      icon: Gear,
      skills: ['Agile (Scrum)', 'Lean UX', 'Leanstack (Build-Measure-Learn cycles)', 'Design Thinking', 'Rapid prototyping']
    },
    {
      name: 'Technical Fluency & Development',
      icon: Code,
      skills: ['Front-end dev. (HTML5, CSS-Flexbox, Grid, SCSS)', 'JavaScript (ES6)', 'React.js', 'Bootstrap', 'Tailwind CSS', 'Git', 'GitHub', 'Netlify', 'VS Code', 'DevOps Concepts', 'Data & AI literacy']
    },
    {
      name: 'Accessibility & Standards',
      icon: Globe,
      skills: ['WCAG 2.1', 'semantic HTML', 'ARIA roles', 'responsive & mobile-first design', 'cross-browser testing']
    }
  ];

  const experiences = [
    {
      title: 'UI/UX Developer – Xcell IT Systems (USA)',
      description: 'At Xcell IT Systems, I led end-to-end UI/UX design and front-end development for a cloud-based platform serving diverse user roles. I collaborated in Agile teams, built scalable design systems, and developed responsive, accessible interfaces using React.js, HTML5, and CSS3.'
    },
    {
      title: 'UI/UX Designer – FlyEasy LLC (USA)',
      description: 'At FlyEasy, I drove user research, UX strategy, and interface design for AI-powered and AR-integrated travel solutions. My work spanned from concept to MVP, blending design thinking, usability testing, and cross-functional collaboration to deliver impactful digital products.'
    },
    {
      title: 'UI Designer – Urban Ecosystems (India)',
      description: 'I designed and optimized digital user journeys for mentorship platforms, using UX research and service design to boost user engagement. My chatbot prototypes and workflow redesigns directly improved retention and interaction metrics.'
    },
    {
      title: 'Visual Designer – Freelance (India)',
      description: 'As a freelance designer, I crafted brand identities, marketing campaigns, and web visuals by closely collaborating with clients. I integrated user feedback through iterative design processes and ran remote workshops to align creative goals with business needs.'
    }
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

    // Experience timeline animation with progress bar
    const experienceItems = experienceRef.current?.querySelectorAll('.experience-item');
    const progressBar = experienceRef.current?.querySelector('.progress-bar');
    
    if (experienceItems && progressBar) {
      gsap.set(experienceItems, { opacity: 0, y: 30 });
      
      ScrollTrigger.create({
        trigger: experienceRef.current,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => {
          // Animate progress bar
          progressBar.classList.add('active');
          
          // Animate experience items
          gsap.to(experienceItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          // Reset progress bar
          progressBar.classList.remove('active');
          
          // Reset experience items
          gsap.to(experienceItems, {
            opacity: 0,
            y: 30,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.in"
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Photo & About Me */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Profile Image */}
          <div ref={profileRef} className="relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_hsla(262,83%,58%,0.3)] cursor-glow"
                 onMouseMove={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = e.clientX - rect.left;
                   const y = e.clientY - rect.top;
                   e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                   e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                 }}>
              <img 
                src="/lovable-uploads/6fbc99c3-45a2-47f6-9d79-25327a6dbe4a.png"
                alt="Sai Charan - UI/UX Designer"
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
                Passionate UI/UX Designer with 5+ years creating digital experiences that solve real problems.
              </p>
              <p>
                I specialize in user-centered design, combining research with creative solutions.
              </p>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => console.log('Download Resume')}
                className="glow-button cursor-glow flex items-center gap-2"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              >
                Resume
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Expertise Section */}
        <div ref={skillsRef} className="space-y-12 mb-20">
          <h3 className="text-2xl font-inter font-light text-foreground mb-12 text-center">
            Expertise
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
                    className={`w-full p-4 rounded-lg border text-left transition-all duration-300 flex items-center gap-3 cursor-glow ${
                      activeCategory === index
                        ? 'bg-primary/10 border-primary/30 text-foreground'
                        : 'bg-background/50 border-muted-foreground/20 text-muted-foreground hover:border-muted-foreground/40'
                    }`}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                    }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeCategory === index ? 'bg-primary/20' : 'bg-muted-foreground/10'
                    }`}>
                      <IconComponent size={16} className={activeCategory === index ? 'text-primary' : 'text-muted-foreground'} />
                    </div>
                    <span className="text-sm font-inter">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Content - Skills */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
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
              
              <ul className="space-y-2">
                {expertiseCategories[activeCategory].skills.map((skill, index) => (
                  <li key={index} className="text-sm text-muted-foreground font-inter leading-relaxed flex items-start gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div ref={experienceRef} className="space-y-8">
          <h3 className="text-2xl font-inter font-light text-foreground mb-12 text-center">
            Experience
          </h3>

          {/* Progress Bar */}
          <div className="progress-bar mb-12">
            <div className="progress-fill"></div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-primary/30"></div>

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <div key={index} className="experience-item relative flex gap-6">
                  <div className="w-3 h-3 bg-primary rounded-full relative z-10 mt-1 shadow-lg shadow-primary/50"></div>
                  <div className="flex-1 space-y-2 bg-background/30 p-6 rounded-lg border border-muted-foreground/20 cursor-glow"
                       onMouseMove={(e) => {
                         const rect = e.currentTarget.getBoundingClientRect();
                         const x = e.clientX - rect.left;
                         const y = e.clientY - rect.top;
                         e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                         e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                       }}>
                    <h4 className="text-lg font-inter font-medium text-foreground">
                      {experience.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-inter leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'phosphor-react';

// Tilt effect function
const useTilt = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
};

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Create refs for each project card
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    {
      id: 1,
      title: "Book Recommendation System",
      description: "Personalised book recommendation engine using web scraping, large language models and a retrieval-augmented generation (RAG) strategy. An end-to-end recommendation engine that scrapes Goodreads, processes data and uses LLMs to deliver tailored reading lists.",
      image: "/lovable-uploads/0a8a7d36-8c6d-4886-a4c6-16b76959a79d.png",
      tags: ["Machine Learning", "LLMs", "Web Scraping"],
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 2,
      title: "Targeted Advertising via Tweets",
      description: "Analyses Twitter data with Hugging Face transformers to infer sentiments and deliver highly targeted ads. Analyses user sentiments and interests from tweets to serve personalised advertisements and content recommendations.",
      image: "/lovable-uploads/7c5be1fd-ede2-43b8-9216-08a8fcb93fe4.png",
      tags: ["NLP", "Sentiment Analysis", "Social Media"],
      color: "from-orange-500/20 to-yellow-500/20"
    },
    {
      id: 3,
      title: "Virtual Eye for the Blind",
      description: "Computer-vision app providing real-time audio descriptions of surroundings for visually impaired users. An assistive tool that combines object recognition and scene understanding to enhance navigation for those with low vision.",
      image: "/lovable-uploads/cb654374-72d7-4aff-8caf-8b78e4fff55a.png",
      tags: ["Computer Vision", "Accessibility", "Real-time"],
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: 4,
      title: "Medicare Payment Optimisation",
      description: "Predictive modelling to optimise healthcare costs and improve outcomes using complex Medicare datasets. Data-driven recommendations that enhance financial planning and resource allocation for more efficient healthcare.",
      image: "/lovable-uploads/26d5387c-8b28-428a-8214-29b336218dc1.png",
      tags: ["Healthcare", "Predictive Modeling", "Data Analysis"],
      color: "from-cyan-500/20 to-blue-500/20"
    }
  ];

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
    gsap.set(titleRef.current, {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });

    gsap.set(gridRef.current?.children, {
      opacity: 0,
      y: 80,
      scale: 0.8,
      filter: 'blur(10px)'
    });

    // Animate title
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    })
    // Animate cards with stagger
    .to(gridRef.current?.children, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.5");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleProjectClick = (projectId: number) => {
    console.log(`View project ${projectId}`);
    // Add project view logic here
  };

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden bg-background"
    >
      {/* Clean minimal background */}

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div ref={titleRef} className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bricolage font-light text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter font-light max-w-2xl mx-auto">
            A collection of innovative data science and machine learning projects that demonstrate my expertise in transforming complex data into actionable insights and building intelligent solutions.
          </p>
          <div className="w-16 h-0.5 bg-primary/60 rounded-full mx-auto"></div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const projectRef = useRef<HTMLDivElement>(null);
            projectRefs.current[index] = projectRef.current;
            useTilt(projectRef);
            
            return (
              <div
                key={project.id}
                ref={projectRef}
                className="group project-card cursor-pointer transition-transform duration-300"
                onClick={() => handleProjectClick(project.id)}
              >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden bg-background-secondary rounded-t-lg">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bricolage font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs font-inter bg-muted text-muted-foreground rounded-full border border-border group-hover:border-primary/30 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-3">
                  <button className="flex items-center gap-2 text-primary font-inter text-sm font-medium transition-all duration-300 group-hover:gap-3">
                    View Project
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
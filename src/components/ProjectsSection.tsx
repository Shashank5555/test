import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Travel Booking App",
      description: "Modern travel booking platform with intuitive user experience and seamless payment integration.",
      image: "/lovable-uploads/0a8a7d36-8c6d-4886-a4c6-16b76959a79d.png",
      tags: ["UI/UX", "Mobile", "Travel"],
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 2,
      title: "AI Learning Platform",
      description: "Educational platform powered by AI to personalize learning experiences for students.",
      image: "/lovable-uploads/7c5be1fd-ede2-43b8-9216-08a8fcb93fe4.png",
      tags: ["EdTech", "AI", "Web App"],
      color: "from-orange-500/20 to-yellow-500/20"
    },
    {
      id: 3,
      title: "Design System",
      description: "Comprehensive design system with reusable components for enterprise applications.",
      image: "/lovable-uploads/cb654374-72d7-4aff-8caf-8b78e4fff55a.png",
      tags: ["Design System", "Components", "Enterprise"],
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: 4,
      title: "Productivity Dashboard",
      description: "Clean and minimal dashboard for tracking productivity and managing daily tasks.",
      image: "/lovable-uploads/26d5387c-8b28-428a-8214-29b336218dc1.png",
      tags: ["Dashboard", "Productivity", "SaaS"],
      color: "from-cyan-500/20 to-blue-500/20"
    },
    {
      id: 5,
      title: "E-commerce Platform",
      description: "Modern e-commerce platform with advanced filtering and personalized recommendations.",
      image: "/lovable-uploads/291bd291-70e7-41ca-aeb9-d4b4d0125bbe.png",
      tags: ["E-commerce", "React", "Backend"],
      color: "from-pink-500/20 to-rose-500/20"
    },
    {
      id: 6,
      title: "University Portal",
      description: "Comprehensive portal for university students and faculty with academic management features.",
      image: "/lovable-uploads/adb983bd-559e-46a4-9a78-46b6ad9b994e.png",
      tags: ["Education", "Portal", "Institution"],
      color: "from-gray-500/20 to-slate-500/20"
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
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Clean minimal background */}

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div ref={titleRef} className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bricolage font-light text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter font-light max-w-2xl mx-auto">
            A showcase of my recent work spanning UI/UX design, web development, 
            and digital experiences that solve real-world problems.
          </p>
          <div className="w-16 h-0.5 bg-primary/60 rounded-full mx-auto"></div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group project-card cursor-glow cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
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
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
      // Set default text
      typewriterElement.textContent = 'Data Scientist';
      
      let animationInterval: NodeJS.Timeout;
      let isAnimating = false;
      
      const titles = ["Data Scientist", "Machine Learning Engineer", "Data Analyst"];
      let titleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      
      const typeWriter = () => {
        if (!isAnimating) return;
        
        const currentTitle = titles[titleIndex];
        
        if (!isDeleting) {
          // Typing
          typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
          charIndex++;
          
          if (charIndex === currentTitle.length) {
            // Pause before deleting
            setTimeout(() => {
              if (isAnimating) {
                isDeleting = true;
                typeWriter();
              }
            }, 2000);
            return;
          }
        } else {
          // Deleting
          typewriterElement.textContent = currentTitle.substring(0, charIndex);
          charIndex--;
          
          if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            if (isAnimating) {
              setTimeout(typeWriter, 300);
            }
            return;
          }
        }
        
        if (isAnimating) {
          setTimeout(typeWriter, isDeleting ? 50 : 100);
        }
      };
      
      const startAnimation = () => {
        if (!isAnimating) {
          isAnimating = true;
          titleIndex = 0;
          charIndex = 0;
          isDeleting = false;
          typeWriter();
        }
      };
      
      const stopAnimation = () => {
        isAnimating = false;
        clearTimeout(animationInterval);
        typewriterElement.textContent = 'Data Scientist';
        titleIndex = 0;
        charIndex = 0;
        isDeleting = false;
      };
      
      typewriterElement.addEventListener('mouseenter', startAnimation);
      typewriterElement.addEventListener('mouseleave', stopAnimation);
      
      return () => {
        typewriterElement.removeEventListener('mouseenter', startAnimation);
        typewriterElement.removeEventListener('mouseleave', stopAnimation);
        clearTimeout(animationInterval);
      };
    }

    // Parallax effect for Spline only
    gsap.to(splineRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleViewMyWork = () => {
    const projectsSection = document.querySelector('#projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    // Download resume
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Sai_Shashank_Yerra_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline 3D Model Background - Full Coverage */}
      <div 
        ref={splineRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ background: 'hsl(var(--background))' }}
      >
        <iframe 
          src='https://my.spline.design/aidatamodelinteraction-tx2TuJrxKEGAIu0y9Am2934X/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
          title="AI Data Model Interaction"
          style={{ background: 'hsl(var(--background))' }}
        />
      </div>

      {/* Hero Content - Center Positioned with Empty Space for 3D Model */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-screen">
          {/* Left Content */}
          <div className="lg:col-span-1 space-y-8 text-left">
            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bricolage font-light text-foreground leading-tight">
              Hi, I'm{' '}
              <span className="text-foreground">Sai Shashank Yerra</span>
              <br />
              <span className="typewriter text-foreground cursor-pointer"></span>
            </h1>

            {/* Subtitle */}
            <p 
              ref={subtitleRef}
              className="text-base md:text-lg text-muted-foreground font-inter font-light leading-relaxed"
            >
              Harnessing data, machine learning and modern web technologies to build intelligent products.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleViewMyWork}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center justify-center gap-3 group hover:bg-primary/90 transition-colors duration-300"
              >
                View My Work
                <ArrowRight 
                  size={18} 
                  className="transition-transform duration-300 group-hover:translate-x-1" 
                />
              </button>
              
              <button 
                onClick={handleDownloadCV}
                className="border border-border px-6 py-3 rounded-lg flex items-center justify-center gap-3 hover:border-primary/50 transition-colors duration-300"
              >
                <Download size={16} />
                Download Resume
              </button>
            </div>
          </div>

          {/* Center - Empty space for 3D model */}
          <div className="lg:col-span-1 hidden lg:block">
            {/* This space is intentionally left empty for the 3D model to show through */}
          </div>

          {/* Right Content - Skills */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="skill-card">Python</div>
              <div className="skill-card">Machine Learning</div>
              <div className="skill-card">Deep Learning & LLMs</div>
              <div className="skill-card">Data Visualization</div>
              <div className="skill-card">Web Development</div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-5 h-8 border border-border rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-muted-foreground rounded-full mt-2"></div>
        </div>
      </div>

      {/* Ambient glow elements */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>
      <div className="ambient-glow-3"></div>
    </section>
  );
};

export default HeroSection;
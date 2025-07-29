import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download } from 'phosphor-react';

// Register GSAP plugin for parallax scrolling
gsap.registerPlugin(ScrollTrigger);

/**
 * The hero section showcases a full-screen Spline model with the
 * developer's name and profession overlaid above the model and a
 * description with calls‑to‑action below. A continuous typewriter
 * animation cycles through professional titles without requiring
 * user interaction. The 3D model remains in the background and
 * parallax is applied on scroll.
 */
const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  // Initialise the typewriter animation on mount
  useEffect(() => {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const titles = ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeWriter = () => {
      const currentTitle = titles[titleIndex];
      if (!isDeleting) {
        // Typing characters
        typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentTitle.length) {
          // Pause at end of word before deleting
          setTimeout(() => {
            isDeleting = true;
            typeWriter();
          }, 2000);
          return;
        }
      } else {
        // Deleting characters
        typewriterElement.textContent = currentTitle.substring(0, charIndex);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          setTimeout(typeWriter, 300);
          return;
        }
      }
      setTimeout(typeWriter, isDeleting ? 50 : 100);
    };
    typeWriter();
  }, []);

  // Apply parallax scroll effect to the Spline iframe
  useEffect(() => {
    gsap.to(splineRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Scroll to projects section
  const handleViewMyWork = () => {
    const projectsSection = document.querySelector('#projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Download resume
  const handleDownloadCV = () => {
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
      {/* Background Spline model fills the entire section */}
      <div
        ref={splineRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ background: 'hsl(var(--background))' }}
      >
        <iframe
          src="https://my.spline.design/aidatamodelinteraction-tx2TuJrxKEGAIu0y9Am2934X/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="AI Data Model Interaction"
          style={{ background: 'hsl(var(--background))' }}
        />
      </div>

      {/* Overlay content positioned above and below the model */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col justify-between items-center min-h-screen py-16 text-center space-y-8">
        {/* Name and profession at the top */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bricolage font-light text-foreground leading-tight">
            Hi, I'm{' '}
            <span className="text-primary">Sai Shashank Yerra</span>
          </h1>
          <span className="typewriter block text-foreground text-lg md:text-2xl font-inter" />
        </div>

        {/* Description and call‑to‑action at the bottom */}
        <div className="space-y-8 max-w-3xl">
          <p className="text-base md:text-lg text-muted-foreground font-inter font-light leading-relaxed">
            Harnessing data, machine learning and modern web technologies to build intelligent products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleViewMyWork}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors duration-300"
            >
              View My Work
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-5 h-8 border border-border rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-muted-foreground rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
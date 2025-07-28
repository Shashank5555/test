import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ArrowUp } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });

    // Set initial states
    gsap.set(footerRef.current?.children, {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    });

    // Animate footer content
    tl.to(footerRef.current?.children, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Floating particles animation
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          y: -30,
          x: Math.random() * 40 - 20,
          duration: 4 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.5
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 lg:py-20 overflow-hidden grid-background"
    >
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary/40 rounded-full blur-sm"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-accent/30 rounded-full blur-sm"></div>
        <div className="absolute top-60 left-1/2 w-1.5 h-1.5 bg-secondary/40 rounded-full blur-sm"></div>
        <div className="absolute top-32 right-1/4 w-2.5 h-2.5 bg-primary/30 rounded-full blur-sm"></div>
        <div className="absolute top-16 left-2/3 w-1 h-1 bg-accent/50 rounded-full blur-sm"></div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-48 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          {/* Brand & Description */}
          <div className="space-y-6">
            <div className="text-2xl font-inter font-light text-foreground">
              <span className="text-primary">S</span>ai <span className="text-accent">C</span>haran
            </div>
            <p className="text-muted-foreground font-inter font-light leading-relaxed">
              Crafting digital experiences that bridge the gap between human needs 
              and technological possibilities.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Available for new projects</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-inter font-medium text-foreground">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 font-inter text-sm"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-inter font-medium text-foreground">
              Let's Connect
            </h3>
            <div className="space-y-3">
              <a 
                href="mailto:hello@saicharan.design"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300 font-inter text-sm"
              >
                hello@saicharan.design
              </a>
              <button
                onClick={() => handleLinkClick('#contact')}
                className="text-accent hover:text-accent-glow transition-colors duration-300 font-inter text-sm underline"
              >
                Start a project
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-inter">
            <span>© 2024 Made with</span>
            <Heart size={16} className="text-primary" weight="fill" />
            <span>by Sai Charan</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-inter">
              Scroll to top
            </span>
            <button
              onClick={scrollToTop}
              className="p-3 glass-card rounded-full hover-lift group transition-all duration-300"
            >
              <ArrowUp 
                size={16} 
                className="text-primary transition-transform duration-300 group-hover:-translate-y-1" 
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
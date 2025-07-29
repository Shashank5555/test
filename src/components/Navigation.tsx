import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navLinks = [{
    label: 'Home',
    href: '#home'
  }, {
    label: 'About',
    href: '#about'
  }, {
    label: 'Skills',
    href: '#about'
  }, {
    label: 'Projects',
    href: '#projects'
  }, {
    label: 'Certifications',
    href: '#certifications'
  }, {
    label: 'Contact',
    href: '#contact'
  }];
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (isMenuOpen) {
      // Mobile menu open animation
      gsap.fromTo(mobileMenuRef.current, {
        x: '100%',
        opacity: 0
      }, {
        x: '0%',
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });

      // Animate menu items
      gsap.fromTo(mobileMenuRef.current?.querySelectorAll('.menu-item'), {
        x: 50,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out"
      });
    }
  }, [isMenuOpen]);
  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <>
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-inter font-light text-foreground">
              <span className="text-primary">Sai</span> <span className="text-accent">Shashank</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace('#', '') || 
                                (link.href === '#about' && activeSection === 'about');
                return (
                  <button 
                    key={index} 
                    onClick={() => handleLinkClick(link.href)} 
                    className={`relative font-inter font-light transition-colors duration-300 group ${
                      isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300">
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div ref={mobileMenuRef} className="absolute top-0 right-0 w-full max-w-sm h-full glass-card border-l-2 border-primary/50" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="text-lg font-inter font-light text-foreground">
                Menu
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-foreground/60 hover:text-foreground transition-colors duration-300">
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-6">
              {navLinks.map((link, index) => <button key={index} onClick={() => handleLinkClick(link.href)} className="menu-item block w-full text-left text-xl font-inter font-light text-foreground/80 hover:text-primary transition-colors duration-300">
                  {link.label}
                </button>)}
              
              <div className="pt-6 border-t border-border/50">
                <button className="w-full text-center bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300" onClick={() => handleLinkClick('#contact')}>
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>}
    </>;
};
export default Navigation;
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  PaperPlaneTilt,
  EnvelopeSimple,
  User,
  ChatText,
  GithubLogo,
  LinkedinLogo,
  ArrowUp,
  Heart,
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Current year used in the footer attribution
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: GithubLogo, 
      label: 'GitHub', 
      url: 'https://github.com/Shashank5555', 
      color: 'hover:text-primary' 
    },
    { 
      icon: LinkedinLogo, 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/sai-shashank-yerra', 
      color: 'hover:text-accent' 
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
    gsap.set([formRef.current, socialRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });

    gsap.set(formRef.current?.querySelectorAll('.form-input'), {
      opacity: 0,
      x: -30,
      filter: 'blur(5px)'
    });

    gsap.set(socialRef.current?.querySelectorAll('.social-icon'), {
      opacity: 0,
      scale: 0.8,
      filter: 'blur(5px)'
    });

    // Animate form container
    tl.to(formRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    })
    // Animate form inputs
    .to(formRef.current?.querySelectorAll('.form-input'), {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.5")
    // Animate social section
    .to(socialRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    // Animate social icons
    .to(socialRef.current?.querySelectorAll('.social-icon'), {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    // Add success animation
    gsap.to('.submit-button', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden bg-background"
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-inter font-light text-foreground">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter font-light max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. 
            Let's create something amazing together.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-inter font-light text-foreground">
                Send me a <span className="text-accent">message</span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="form-input space-y-2">
                  <label className="flex items-center gap-2 text-foreground font-inter text-sm">
                    <User size={16} />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 glass-input border-2 border-border font-inter placeholder:text-muted-foreground rounded-lg"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Input */}
                <div className="form-input space-y-2">
                  <label className="flex items-center gap-2 text-foreground font-inter text-sm">
                    <EnvelopeSimple size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 glass-input border-2 border-border font-inter placeholder:text-muted-foreground rounded-lg"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Message Input */}
                <div className="form-input space-y-2">
                  <label className="flex items-center gap-2 text-foreground font-inter text-sm">
                    <ChatText size={16} />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-4 glass-input border-2 border-border font-inter placeholder:text-muted-foreground rounded-lg resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button bg-primary text-primary-foreground px-6 py-3 rounded-lg w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <PaperPlaneTilt 
                        size={20} 
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div ref={socialRef} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-inter font-light text-foreground">
                Get in <span className="text-primary">touch</span>
              </h3>
              
              <div className="space-y-6 text-muted-foreground font-inter font-light">
                <p className="text-lg leading-relaxed">
                  If you'd like to collaborate or just say hello, feel free to reach out!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <EnvelopeSimple size={20} className="text-primary" />
                    <a
                      href="mailto:saishashank15@gmail.com"
                      className="underline hover:text-primary transition-colors"
                    >
                      saishashank15@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Baltimore, MD, USA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Available for new opportunities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-inter font-light text-foreground">
                Follow <span className="text-accent">me</span>
              </h4>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon p-4 glass-card rounded-lg group ${social.color} transition-colors duration-300`}
                  >
                    <social.icon
                      size={24}
                      weight="fill"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
              
            </div>

          </div>
        </div>

        {/* Bottom utility section with scroll to top and attribution */}
        <div className="pt-12 flex flex-col items-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-primary/10 hover:border-primary hover:text-primary transition-colors duration-300"
          >
            <ArrowUp size={16} className="text-primary" />
            <span className="text-sm font-inter">Back to top</span>
          </button>
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-inter">
            <span>© {currentYear} Made with</span>
            <Heart size={12} className="text-primary" weight="fill" />
            <span>by Sai Shashank Yerra</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
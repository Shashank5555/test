import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Star, CheckCircle } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const certifications = [
    {
      id: 1,
      title: "Machine Learning",
      institution: "Stanford University (Coursera)",
      date: "Jul 2023",
      description: "Comprehensive course covering supervised and unsupervised learning algorithms, neural networks, and practical applications.",
      icon: Star,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 2,
      title: "Deep Learning Specialization",
      institution: "DeepLearning.AI",
      date: "Oct 2023",
      description: "Advanced specialization covering neural networks, convolutional networks, sequence models, and transformer architectures.",
      icon: GraduationCap,
      color: "from-orange-500/20 to-yellow-500/20"
    },
    {
      id: 3,
      title: "Applied Machine Learning in Python",
      institution: "University of Michigan (Coursera)",
      date: "Dec 2022",
      description: "Practical machine learning applications using Python, covering classification, regression, and clustering techniques.",
      icon: CheckCircle,
      color: "from-green-500/20 to-emerald-500/20"
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
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.5");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="certifications"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden bg-background-secondary"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-background opacity-30"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-48 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bricolage font-light text-foreground mb-6">
            Certifications
          </h2>
          <p className="text-lg text-muted-foreground font-inter font-light max-w-2xl mx-auto">
            Professional certifications and specialized training in machine learning, 
            deep learning, and data science from leading institutions.
          </p>
        </div>

        {/* Certifications Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="group relative"
            >
              <div className={`glass-card p-8 rounded-2xl hover-lift transition-all duration-500 bg-gradient-to-br ${cert.color} border border-border/50`}>
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <cert.icon size={32} className="text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-inter font-medium text-foreground mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-primary font-inter font-medium text-sm">
                      {cert.institution}
                    </p>
                    <p className="text-muted-foreground font-inter text-sm">
                      {cert.date}
                    </p>
                  </div>
                  
                  <p className="text-muted-foreground font-inter font-light leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection; 
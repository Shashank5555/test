import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import CertificationsSection from './CertificationsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Initialize any additional animations or locomotive scroll here
  };

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
    <div className="relative">
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([logoRef.current, percentageRef.current], { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    });

    // Animate logo in
    tl.to([logoRef.current, percentageRef.current], {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2
    });

    // Progress bar animation with percentage counter
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentageRef.current) {
          percentageRef.current.textContent = `${progress}%`;
        }
      },
      onComplete: () => {
        // Hold for a moment, then exit
        gsap.delayedCall(0.5, () => {
          // Exit animation
          gsap.to(preloaderRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              onLoadingComplete();
            }
          });
        });
      }
    }, "-=0.5");

    // Floating animation for logo
    gsap.to(logoRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, [onLoadingComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background grid-background"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Logo/Brand */}
      <div ref={logoRef} className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-inter font-light text-foreground text-glow">
          Sai Shashank
        </h1>
        <p className="text-xl md:text-2xl font-inter font-light text-muted-foreground mt-4 tracking-wide">
          Data Scientist & Developer
        </p>
      </div>

      {/* Progress Container */}
      <div className="w-80 md:w-96 space-y-4">
        {/* Progress Bar */}
        <div className="relative h-1 bg-muted/30 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full w-0 loading-bar rounded-full"
          />
        </div>

        {/* Percentage */}
        <div className="text-center">
          <span 
            ref={percentageRef}
            className="text-primary font-inter font-medium text-lg tracking-wider"
          >
            0%
          </span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="absolute bottom-20 text-center">
        <p className="text-muted-foreground font-inter text-sm tracking-widest uppercase">
          Loading Experience
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
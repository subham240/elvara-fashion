import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/hero/hero-slide-1.jpg',
    badge: 'The Spring Atelier 2026 Collection',
    title: 'TIMELESS BY DESIGN.',
    subtitle: 'Discover a considered collection of contemporary essentials, crafted for the art of everyday living.',
    primaryCta: { label: 'Explore Collection', href: '/collections/spring-atelier-2026' },
    secondaryCta: { label: 'Discover More', href: '/pages/our-story' },
  },
  {
    id: 2,
    image: '/images/hero/hero-slide-2.jpg',
    badge: 'Architectural Linen & Tailoring',
    title: 'THE ART OF REDUCTION.',
    subtitle: 'Pure French flax linen, fluid silhouettes, and double-pleated trousers crafted for effortless elegance.',
    primaryCta: { label: 'Shop Tailoring', href: '/collections/atelier-tailoring' },
    secondaryCta: { label: 'Spring Edit', href: '/collections/spring-atelier-2026' },
  },
  {
    id: 3,
    image: '/images/hero/hero-slide-3.jpg',
    badge: 'Contemporary Menswear',
    title: 'LESS, BUT BETTER.',
    subtitle: 'Substantial Oxford button-downs, 240 GSM combed cotton tees, and unstructured tailored blazers.',
    primaryCta: { label: 'Explore Menswear', href: '/collections/men' },
    secondaryCta: { label: 'Core Essentials', href: '/collections/core-essentials' },
  },
  {
    id: 4,
    image: '/images/hero/hero-slide-4.jpg',
    badge: 'Atelier Standards',
    title: 'BUILT BEYOND SEASONS.',
    subtitle: 'French interior seams, river shell buttons, and certified natural fibres woven to endure decades.',
    primaryCta: { label: 'Our Philosophy', href: '/pages/our-story' },
    secondaryCta: { label: 'Explore Accessories', href: '/collections/accessories' },
  },
];

export const HeroCampaign: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = right to left, -1 = left to right
  const touchStartX = useRef<number | null>(null);

  // Auto-slide right-to-left continuously every 5.5 seconds by default
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5500);
    return () => clearInterval(interval);
  }, [current]);

  const paginate = (newDirection: 1 | -1) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      // Swiped left -> advance right to left
      if (diff > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
    }
    touchStartX.current = null;
  };

  // Slide Animation Variants (Sliding from Right to Left)
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 1,
    }),
    center: {
      x: '0%',
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 32 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0.9,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 32 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  const activeSlide = slides[current];

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#141413] select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Sliding Images Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Subtle cinematic slow zoom on active image */}
          <motion.img
            src={activeSlide.image}
            alt={activeSlide.title}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5.5, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center filter brightness-[0.78]"
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Stage with Animated Typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#F5F1EA] py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Slide Category Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D5C7B5] bg-black/45 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-sm"
            >
              <Compass size={12} className="animate-spin-slow text-[#D5C7B5]" />
              <span>{activeSlide.badge}</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.08em] uppercase font-light leading-[1.04] text-[#F5F1EA] drop-shadow-sm"
            >
              {activeSlide.title}
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-sm sm:text-base md:text-lg text-[#EAE3D8]/90 max-w-2xl mx-auto font-light leading-relaxed tracking-wide font-sans drop-shadow-xs"
            >
              {activeSlide.subtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              <Link
                to={activeSlide.primaryCta.href}
                className="w-full sm:w-auto px-8 py-4 bg-[#F5F1EA] text-[#171717] text-xs uppercase tracking-[0.22em] font-medium hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 group"
              >
                <span>{activeSlide.primaryCta.label}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to={activeSlide.secondaryCta.href}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#F5F1EA]/70 text-[#F5F1EA] text-xs uppercase tracking-[0.22em] font-medium hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-xs flex items-center justify-center"
              >
                <span>{activeSlide.secondaryCta.label}</span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Luxury Slide Navigation Controls (Left & Right Chevrons) */}
      <div className="absolute inset-y-0 inset-x-4 sm:inset-x-8 flex items-center justify-between pointer-events-none z-20">
        <button
          onClick={() => paginate(-1)}
          className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all duration-300 group shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all duration-300 group shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Editorial Slide Indicators & Progress */}
      <div className="absolute bottom-8 inset-x-0 z-20 flex items-center justify-between max-w-7xl mx-auto px-6 sm:px-10">
        {/* Slide Counter: e.g. 01 / 04 */}
        <div className="hidden sm:flex items-center space-x-2 text-xs tracking-widest text-[#D5C7B5] font-light">
          <span className="font-semibold text-white">0{current + 1}</span>
          <span className="text-[#A99A87]">/</span>
          <span>0{slides.length}</span>
        </div>

        {/* Slide Navigation Bars */}
        <div className="flex items-center space-x-2.5 mx-auto sm:mx-0">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              className="relative py-2 group focus:outline-hidden"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div className="w-8 sm:w-12 h-[2px] bg-white/25 rounded-full overflow-hidden transition-all group-hover:bg-white/40">
                {current === idx && (
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: 5.5,
                      ease: 'linear',
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Continuous Autoplay Indicator */}
        <div className="hidden sm:flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#A99A87] uppercase font-light">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B5] animate-pulse" />
          <span>Atelier Runway Edit</span>
        </div>
      </div>
    </section>
  );
};

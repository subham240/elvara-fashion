import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroCampaign: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#171717]">
      {/* Background Hero Image with EKON-style reveal and subtle slow zoom */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <img
          src="/images/hero/spring-campaign.jpg"
          alt="ÉLVARA Spring Campaign"
          className="w-full h-full object-cover object-center filter brightness-[0.82]"
        />
        {/* Subtle cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#F5F1EA] py-20">
        {/* Staggered Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D5C7B5] mb-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10"
        >
          <Compass size={12} className="animate-spin-slow text-[#D5C7B5]" />
          <span>The Spring Atelier 2026 Collection</span>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.08em] uppercase font-light leading-[1.05] text-[#F5F1EA]"
        >
          Timeless By Design.
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-[#EAE3D8]/90 max-w-2xl mx-auto font-light leading-relaxed tracking-wide font-sans"
        >
          Discover a considered collection of contemporary essentials, crafted for the art of everyday living.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            to="/collections/women"
            className="w-full sm:w-auto px-8 py-4 bg-[#F5F1EA] text-[#171717] text-xs uppercase tracking-[0.22em] font-medium hover:bg-white transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 group"
          >
            <span>Explore Collection</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <Link
            to="/pages/our-story"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#F5F1EA]/60 text-[#F5F1EA] text-xs uppercase tracking-[0.22em] font-medium hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-xs flex items-center justify-center"
          >
            <span>Discover More</span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-[#D5C7B5] hidden sm:block"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] block mb-1">Scroll to Explore</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#D5C7B5] to-transparent mx-auto animate-pulse" />
      </motion.div>
    </section>
  );
};

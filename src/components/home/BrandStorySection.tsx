import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Feather, Scissors, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BrandStorySection: React.FC = () => {
  const pillars = [
    {
      icon: <Scissors size={20} className="text-[#34332F]" />,
      title: 'Architectural Cuts',
      desc: 'Precision patterning engineered to flatter every posture with relaxed grace.',
    },
    {
      icon: <Feather size={20} className="text-[#34332F]" />,
      title: 'Pure Natural Fibres',
      desc: 'Sourced from organic certified European linen mills and GOTS long-staple cotton farms.',
    },
    {
      icon: <Shield size={20} className="text-[#34332F]" />,
      title: 'Built Beyond Seasons',
      desc: 'Small-batch production and French-seam durability meant to endure decades.',
    },
  ];

  return (
    <section className="py-24 bg-[#EAE3D8]/50 border-t border-[#D5C7B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Story Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#A99A87] font-semibold block mb-3">
                Craftsmanship & Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-light uppercase tracking-wide leading-tight">
                The ÉLVARA Philosophy
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#6B6963] font-light leading-relaxed">
              We founded ÉLVARA with a singular conviction: that contemporary fashion should be quiet, generous, and enduring. Rather than chasing seasonal hype cycles, we craft timeless clothing that gives voice to calm confidence.
            </p>

            <p className="text-xs sm:text-sm text-[#6B6963] font-light leading-relaxed">
              Every seam, shell button, and drape is resolved with rigorous precision in our design atelier. We design essentials that seamlessly bridge relaxed comfort with tailored polish.
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#D5C7B5]">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="space-y-1.5">
                  <div className="p-2 bg-[#F5F1EA] w-fit rounded-xs border border-[#D5C7B5]">
                    {pillar.icon}
                  </div>
                  <h4 className="font-serif text-sm text-[#171717] font-medium pt-1">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] text-[#6B6963] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/pages/our-story"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#171717] hover:text-[#A99A87] transition-colors group"
              >
                <span>Read Full Brand Manifesto</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Image Atelier Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] bg-[#EAE3D8] overflow-hidden border border-[#D5C7B5]">
              <img
                src="/images/editorial/craftsmanship.jpg"
                alt="ÉLVARA Atelier Craftsmanship"
                loading="lazy"
                className="w-full h-full object-cover filter brightness-[0.94]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#EAE3D8] block">Atelier Journal</span>
                <p className="font-serif text-base mt-1">Honouring the natural textures of linen, silk, and wool.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

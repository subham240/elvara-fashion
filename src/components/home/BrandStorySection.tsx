import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BrandStorySection: React.FC = () => {
  const pillars = [
    {
      num: 'I',
      tag: 'POSTURE & DRAPE',
      title: 'Architectural Cut',
      desc: 'Precision patterning calibrated to flatter human movement with relaxed grace and clean lines.',
    },
    {
      num: 'II',
      tag: 'ORGANIC LOOM',
      title: 'Noble Natural Fibres',
      desc: 'Certified French flax linen, GOTS long-staple cotton, and unblended virgin wools that breathe.',
    },
    {
      num: 'III',
      tag: 'LIFELONG WEAR',
      title: 'Sartorial Longevity',
      desc: 'Small-batch production finished with French seams and natural river shell buttons.',
    },
  ];

  return (
    <section className="py-24 bg-[#F9EDF0] border-t border-[#E1A140]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Story Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A140] font-semibold block mb-3">
                Craftsmanship & Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#49111C] font-light uppercase tracking-wide leading-tight">
                The ÉLVARA Philosophy
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#49111C]/75 font-light leading-relaxed">
              We cut our clothes for longevity, not trend cycles. Every pattern starts in our Brahmapur, Odisha workshop with natural European linen, long-staple cotton, and Mongolian cashmere. The focus is simple: clean proportions, solid construction, and fabrics that soften with age.
            </p>

            <p className="text-xs sm:text-sm text-[#49111C]/75 font-light leading-relaxed">
              Each garment is finished with French interior seams, river shell buttons, and reinforced stress points for dependable daily wear.
            </p>

            {/* Editorial Atelier Pillars (Classic & Premium) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E1A140]">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif text-xl text-[#E1A140] font-light italic">
                      {pillar.num}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#E1A140] font-medium">
                      {pillar.tag}
                    </span>
                  </div>
                  <h4 className="font-serif text-base text-[#49111C] font-medium">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#49111C]/75 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/pages/our-story"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#49111C] hover:text-[#E1A140] transition-colors group"
              >
                <span>Read Full Brand Manifesto</span>
                <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
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
            <div className="relative aspect-[4/3] bg-[#F9EDF0] overflow-hidden border border-[#E1A140] shadow-sm">
              <img
                src="/images/categories/shirts.jpg"
                alt="ÉLVARA Atelier Craftsmanship"
                loading="lazy"
                className="w-full h-full object-cover filter brightness-[0.95] hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-[#F9EDF0]">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A140]">
                  Small Batch Production
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-light tracking-wide mt-1">
                  Engineered in Brahmapur, Odisha, Sourced Globally
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EditorialCampaign: React.FC = () => {
  return (
    <section className="py-24 bg-[#F9EDF0] overflow-hidden border-t border-[#E1A140]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Editorial Photography Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="aspect-[16/10] sm:aspect-[16/9] bg-[#F9EDF0] overflow-hidden border border-[#E1A140] shadow-xs">
              <img
                src="/images/editorial/less-but-better.jpg"
                alt="Less, But Better Editorial Campaign"
                loading="lazy"
                className="w-full h-full object-cover filter brightness-[0.94] hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </motion.div>

          {/* Text Narrative Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 lg:pl-4 space-y-6"
          >
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A140] font-semibold block mb-3">
                Editorial Manifesto
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#49111C] font-light uppercase tracking-tight leading-[1.08]">
                Less, But Better.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#49111C]/75 font-light leading-relaxed">
              Thoughtfully designed pieces. Effortless silhouettes. A wardrobe that goes beyond seasons.
            </p>

            <div className="pt-2 text-xs text-[#49111C] space-y-2 border-l border-[#E1A140] pl-4">
              <p className="font-medium tracking-wide uppercase text-[11px] text-[#49111C]">
                100% Traceable Natural Fabrics
              </p>
              <p className="text-[#49111C]/75 leading-relaxed">
                Crafted in small-batch runs using organic cotton poplin, European linen, and superfine wool.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/collections/core-essentials"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#49111C] text-[#F9EDF0] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#49111C] transition-all group shadow-sm"
              >
                <span>Explore The Collection</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

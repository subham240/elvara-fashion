import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { categoriesData } from '../../data/products';

export const ShopByCategory: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-2">
            Curated Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light uppercase tracking-wide">
            Shop by Category
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#6B6963] max-w-md mt-3 md:mt-0 font-light leading-relaxed">
          Refined wardrobe cornerstones designed to be worn together in endless harmonious permutations.
        </p>
      </div>

      {/* Grid of 6 Category Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categoriesData.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <Link
              to={cat.route}
              className="group block relative aspect-[3/4] bg-[#EAE3D8] overflow-hidden border border-[#D5C7B5]/70"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent flex flex-col justify-end p-4 text-[#F5F1EA]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] tracking-widest uppercase text-[#D5C7B5] block">
                      {cat.count}
                    </span>
                    <h3 className="font-serif text-lg text-white font-medium group-hover:text-[#EAE3D8] transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#171717] transition-all">
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

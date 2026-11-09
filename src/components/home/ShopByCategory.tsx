import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { categoriesData } from '../../data/products';

export const ShopByCategory: React.FC = () => {
  return (
    <section className="py-24 bg-[#F9EDF0] border-b border-[#E1A140]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A140] font-semibold block mb-2">
              Curated Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#49111C] font-light uppercase tracking-wide">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#49111C]/75 max-w-md mt-3 md:mt-0 font-light leading-relaxed">
            Wardrobe staples designed to be mixed, layered, and worn year-round in natural fibres.
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
                className="group block relative aspect-[3/4] bg-[#F9EDF0] overflow-hidden border border-[#E1A140] shadow-xs"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-4 text-[#F9EDF0]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] tracking-widest uppercase text-[#E1A140] block">
                        {cat.count}
                      </span>
                      <h3 className="font-serif text-lg text-[#F9EDF0] font-medium group-hover:text-[#F9EDF0] transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#F9EDF0]/20 backdrop-blur-xs flex items-center justify-center text-[#F9EDF0] group-hover:bg-[#F9EDF0] group-hover:text-[#49111C] transition-all">
                      <ArrowUpRight size={13} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

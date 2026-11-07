import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const BestSellersSection: React.FC = () => {
  // STRICT: Only products specifically marked isBestseller === true
  const bestSellers = products
    .filter((p) => p.isBestseller)
    .slice(0, 4);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-2">
          Most Coveted
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light uppercase tracking-wide">
          Best Sellers
        </h2>
        <p className="text-xs sm:text-sm text-[#6B6963] mt-2 font-light leading-relaxed">
          Our most requested pieces, built from organic cotton, French linen, and pure wool.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {bestSellers.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

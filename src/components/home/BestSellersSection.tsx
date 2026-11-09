import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const BestSellersSection: React.FC = () => {
  // Distinct Bestsellers across categories (all marked isBestseller, zero overlap with other homepage rows)
  const bestSellerIds = ['W002', 'M002', 'W004', 'A002'];
  const bestSellers = bestSellerIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[0] => Boolean(p));

  return (
    <section className="py-24 bg-[#49111C] text-[#F9EDF0] border-y border-[#49111C] relative overflow-hidden">
      {/* Ambient warm radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E1A140]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#E1A140] font-medium block mb-2.5">
            Curated Atelier Edit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F9EDF0] font-light uppercase tracking-wide">
            The Permanent Bestsellers
          </h2>
          <p className="text-xs sm:text-sm text-[#E1A140] mt-3 font-light leading-relaxed max-w-lg mx-auto">
            Our most requested pieces, celebrated for architectural drape, certified natural fibres, and enduring construction.
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
              <ProductCard product={product} variant="dark" />
            </motion.div>
          ))}
        </div>

        {/* Subtle Bottom Guarantee Banner */}
        <div className="mt-14 pt-8 border-t border-[#49111C]/80 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#E1A140] text-center sm:text-left gap-3">
          <span>Small Batch Production Runs</span>
          <span>100% GOTS Organic Cotton & French Flax Linen</span>
          <span>Complimentary Delivery Pan-India Above ₹2,999</span>
        </div>
      </div>
    </section>
  );
};

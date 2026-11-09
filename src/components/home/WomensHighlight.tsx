import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const WomensHighlight: React.FC = () => {
  // Distinct Women's products (exclusively women's fashion, no overlap with other sections)
  const womensHighlightIds = ['W001', 'W003', 'W008', 'W014'];
  const womensProducts = womensHighlightIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[0] => Boolean(p));

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E1A140]">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A140] font-semibold block mb-2">
            Spring Atelier 2026
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#49111C] font-light uppercase tracking-wide">
            Women's Collection
          </h2>
        </div>

        <Link
          to="/collections/women"
          className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-[0.2em] font-medium text-[#49111C] hover:text-[#E1A140] transition-colors group"
        >
          <span>View All Women ({products.filter((p) => p.gender === 'women').length} Styles)</span>
          <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {womensProducts.map((product, idx) => (
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

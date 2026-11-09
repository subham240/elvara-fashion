import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const MensHighlight: React.FC = () => {
  // Distinct Men's products (exclusively men's fashion, no overlap with other sections)
  const mensHighlightIds = ['M001', 'M003', 'M007', 'M011'];
  const mensProducts = mensHighlightIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[0] => Boolean(p));

  return (
    <section className="py-24 bg-[#F9EDF0]/55 border-y border-[#E1A140]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E1A140]">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A140] font-semibold block mb-2">
              Contemporary Staples
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#49111C] font-light uppercase tracking-wide">
              Men's Collection
            </h2>
          </div>

          <Link
            to="/collections/men"
            className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-[0.2em] font-medium text-[#49111C] hover:text-[#E1A140] transition-colors group"
          >
            <span>View All Men ({products.filter((p) => p.gender === 'men').length} Styles)</span>
            <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {mensProducts.map((product, idx) => (
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
      </div>
    </section>
  );
};

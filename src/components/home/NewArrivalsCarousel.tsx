import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const NewArrivalsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Distinct new arrival products across categories (no overlap with other homepage sections)
  const latestEditIds = ['W006', 'M005', 'W009', 'M004', 'W011', 'A004'];
  const newArrivals = latestEditIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[0] => Boolean(p));

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#EAE3D8]/40 border-y border-[#D5C7B5]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-2">
              Spring Atelier 2026
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light uppercase tracking-wide">
              The Latest Edit
            </h2>
          </div>

          {/* Carousel Arrows & View All Link */}
          <div className="flex items-center space-x-4">
            <Link
              to="/collections/new-arrivals"
              className="hidden sm:inline-flex items-center text-xs uppercase tracking-[0.2em] font-medium text-[#171717] hover:text-[#A99A87] transition-colors group mr-2"
            >
              <span>View All New</span>
              <ArrowRight size={13} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex space-x-2">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 border border-[#D5C7B5] bg-[#F5F1EA] hover:bg-white text-[#171717] flex items-center justify-center transition-colors"
                aria-label="Previous Products"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 border border-[#D5C7B5] bg-[#F5F1EA] hover:bg-white text-[#171717] flex items-center justify-center transition-colors"
                aria-label="Next Products"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex space-x-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newArrivals.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="min-w-[260px] sm:min-w-[290px] md:min-w-[310px] snap-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  variant?: 'light' | 'dark';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'light' }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useShop();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const isDark = variant === 'dark';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'Standard', selectedColor || product.colors[0], 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div
        className="group relative flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with EKON-style smooth zoom */}
        <div
          className={`relative aspect-[3/4] overflow-hidden border transition-colors duration-300 ${
            isDark
              ? 'bg-[#252422] border-[#383733]'
              : 'bg-[#EAE3D8] border-[#D5C7B5]/75 shadow-xs'
          }`}
        >
          <Link to={`/products/${product.slug}`} className="block w-full h-full">
            <motion.img
              src={product.image}
              alt={product.name}
              loading="lazy"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full h-full object-cover ${isDark ? 'filter brightness-[0.95]' : ''}`}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10 pointer-events-none">
            {product.isNewArrival && (
              <span
                className={`text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-1 backdrop-blur-xs ${
                  isDark
                    ? 'bg-[#F5F1EA] text-[#171717]'
                    : 'bg-[#171717]/95 text-[#F5F1EA]'
                }`}
              >
                New
              </span>
            )}
            {product.isBestseller && !product.isNewArrival && (
              <span
                className={`text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-1 backdrop-blur-xs ${
                  isDark
                    ? 'bg-[#D5C7B5] text-[#171717]'
                    : 'bg-[#34332F]/95 text-[#EAE3D8]'
                }`}
              >
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            aria-label="Save to Wishlist"
            className={`absolute top-3 right-3 p-2 backdrop-blur-xs rounded-full transition-colors shadow-xs z-10 ${
              isDark
                ? 'bg-[#171715]/80 text-[#F5F1EA] hover:text-red-400 border border-[#383733]'
                : 'bg-[#F5F1EA]/90 text-[#171717] hover:text-red-700'
            }`}
          >
            <motion.div whileTap={{ scale: 0.8 }} transition={{ duration: 0.15 }}>
              <Heart
                size={16}
                className={isFavorited ? 'fill-red-600 text-red-600' : isDark ? 'text-[#F5F1EA]' : 'text-[#171717]'}
              />
            </motion.div>
          </button>

          {/* Hover Actions Bar (Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex absolute bottom-3 inset-x-3 space-x-2 z-10"
          >
            <button
              onClick={handleQuickView}
              className={`flex-1 py-2 text-[10px] uppercase tracking-[0.16em] font-medium transition-colors shadow-xs flex items-center justify-center space-x-1 backdrop-blur-xs ${
                isDark
                  ? 'bg-[#2A2926]/95 hover:bg-[#34332F] text-[#F5F1EA] border border-[#484640]'
                  : 'bg-[#F5F1EA]/95 hover:bg-[#EAE3D8] text-[#171717] border border-[#D5C7B5]/60'
              }`}
            >
              <Eye size={12} />
              <span>Quick View</span>
            </button>
            <button
              onClick={handleQuickAdd}
              className={`flex-1 py-2 text-[10px] uppercase tracking-[0.16em] font-medium transition-colors shadow-xs flex items-center justify-center space-x-1 ${
                isDark
                  ? 'bg-[#F5F1EA] hover:bg-[#EAE3D8] text-[#171717]'
                  : 'bg-[#171717] hover:bg-[#34332F] text-[#F5F1EA]'
              }`}
            >
              <ShoppingBag size={12} />
              <span>Quick Add</span>
            </button>
          </motion.div>
        </div>

        {/* Product Information */}
        <div className="pt-3 pb-1 flex flex-col justify-between flex-1">
          <div>
            {/* Color Swatches */}
            {product.colors.length > 1 && (
              <div className="flex items-center space-x-1.5 mb-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-2.5 h-2.5 rounded-full border transition-all ${
                      selectedColor?.name === c.name
                        ? isDark
                          ? 'border-white scale-125 ring-1 ring-white/50'
                          : 'border-[#171717] scale-125 ring-1 ring-[#171717]/30'
                        : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            )}

            <span
              className={`text-[10px] tracking-[0.18em] uppercase font-medium block ${
                isDark ? 'text-[#D5C7B5]' : 'text-[#8C7D6B]'
              }`}
            >
              {product.category}
            </span>

            <Link
              to={`/products/${product.slug}`}
              className={`font-serif text-base mt-0.5 block leading-snug font-normal transition-colors ${
                isDark
                  ? 'text-[#F5F1EA] hover:text-[#D5C7B5]'
                  : 'text-[#171717] hover:text-[#8C7D6B]'
              }`}
            >
              {product.name}
            </Link>
          </div>

          {/* Pricing */}
          <div className="flex items-center space-x-2 mt-1.5">
            <span
              className={`text-xs font-semibold ${
                isDark ? 'text-[#F5F1EA]' : 'text-[#171717]'
              }`}
            >
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span
                className={`text-[11px] line-through ${
                  isDark ? 'text-[#A99A87]' : 'text-[#A99A87]'
                }`}
              >
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

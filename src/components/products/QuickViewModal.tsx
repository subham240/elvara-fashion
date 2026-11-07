import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product, ProductColor } from '../../types';
import { useShop } from '../../context/ShopContext';
import { formatCurrency } from '../../utils/formatCurrency';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Initialize selected size and color when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Standard');
      setSelectedColor(product.colors[0] || { name: 'Natural', hex: '#EAE3D8' });
      setQuantity(1);
      setAddedAnimation(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    if (!selectedColor) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative transform overflow-hidden bg-[#F5F1EA] text-left shadow-2xl transition-all sm:max-w-3xl w-full border border-[#D5C7B5]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-[#F5F1EA]/80 backdrop-blur-xs text-[#171717] hover:text-[#A99A87] transition-colors rounded-full"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image side */}
              <div className="aspect-[3/4] bg-[#EAE3D8] overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute bottom-4 left-4 p-2.5 bg-white/90 backdrop-blur-xs rounded-full text-[#171717] hover:text-red-700 transition-colors shadow-sm"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={17}
                    className={isInWishlist(product.id) ? 'fill-red-700 text-red-700' : ''}
                  />
                </button>
              </div>

              {/* Details side */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-2xl text-[#171717] mt-1 font-normal">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-base font-semibold text-[#171717]">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#A99A87] line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#6B6963] leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Color Selector */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-[#6B6963]">Colour:</span>
                      <span className="font-medium text-[#171717]">{selectedColor?.name}</span>
                    </div>
                    <div className="flex space-x-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${
                            selectedColor?.name === c.name
                              ? 'border-[#171717] scale-110'
                              : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-[#6B6963]">Size:</span>
                      <span className="font-medium text-[#171717]">{selectedSize}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                            selectedSize === s
                              ? 'border-[#171717] bg-[#171717] text-[#F5F1EA]'
                              : 'border-[#D5C7B5] bg-white text-[#171717] hover:border-[#34332F]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button
                    onClick={handleAdd}
                    className="w-full bg-[#171717] text-[#F5F1EA] py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#34332F] transition-colors flex items-center justify-center space-x-2"
                  >
                    {addedAnimation ? (
                      <>
                        <Check size={14} />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>Add to Bag • {formatCurrency(product.price)}</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <Link
                      to={`/products/${product.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center text-[11px] uppercase tracking-widest text-[#6B6963] hover:text-[#171717] transition-colors group"
                    >
                      <span>View Full Product Details</span>
                      <ArrowRight size={11} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

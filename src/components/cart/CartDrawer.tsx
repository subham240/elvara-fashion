import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { CheckoutModal } from './CheckoutModal';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useShop();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-screen max-w-md bg-[#F9EDF0] shadow-2xl flex flex-col border-l border-[#E1A140]"
              >
                {/* Header */}
                <div className="p-6 border-b border-[#E1A140] flex items-center justify-between bg-[#F9EDF0]/40">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag size={18} className="text-[#49111C]" />
                    <h2 className="font-serif text-xl tracking-[0.1em] uppercase text-[#49111C]">
                      Shopping Bag
                    </h2>
                    <span className="text-xs text-[#E1A140] font-medium font-sans">
                      ({cart.reduce((a, b) => a + b.quantity, 0)})
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 text-[#49111C]/75 hover:text-[#49111C] transition-colors"
                    aria-label="Close Shopping Bag"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Free Shipping Progress Indicator */}
                <div className="p-4 bg-[#F9EDF0]/70 border-b border-[#E1A140] text-xs">
                  {freeShippingRemaining > 0 ? (
                    <p className="text-[#49111C] font-medium mb-1.5">
                      Add <span className="font-semibold text-[#49111C]">{formatCurrency(freeShippingRemaining)}</span> more to qualify for <span className="underline">Complimentary Shipping</span>
                    </p>
                  ) : (
                    <p className="text-[#49111C] font-medium mb-1.5 flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-2" />
                      Complimentary Standard Shipping unlocked!
                    </p>
                  )}
                  <div className="w-full bg-[#E1A140] h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-[#49111C] h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${shippingProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E1A140]/60">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <ShoppingBag size={48} strokeWidth={1} className="text-[#E1A140] mb-4" />
                      <h3 className="font-serif text-lg text-[#49111C] font-medium">Your bag is empty</h3>
                      <p className="text-xs text-[#49111C]/75 max-w-xs mt-1.5 leading-relaxed">
                        Explore our timeless essentials curated for the contemporary wardrobe.
                      </p>
                      <Link
                        to="/collections/women"
                        onClick={() => setIsCartOpen(false)}
                        className="mt-6 inline-flex items-center text-xs uppercase tracking-[0.2em] bg-[#49111C] text-[#F9EDF0] px-6 py-3 font-medium hover:bg-[#49111C] transition-colors"
                      >
                        Explore Collection <ArrowRight size={13} className="ml-2" />
                      </Link>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="py-4 flex space-x-4">
                        <Link
                          to={`/products/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="w-20 h-24 shrink-0 bg-[#F9EDF0] overflow-hidden border border-[#E1A140]/80"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <Link
                                to={`/products/${item.product.slug}`}
                                onClick={() => setIsCartOpen(false)}
                                className="font-serif text-sm font-medium text-[#49111C] hover:text-[#E1A140] transition-colors"
                              >
                                {item.product.name}
                              </Link>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-[#E1A140] hover:text-red-700 transition-colors p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="flex items-center space-x-3 text-[11px] text-[#49111C]/75 mt-1">
                              <span>Size: {item.size}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <span
                                  className="w-2.5 h-2.5 rounded-full inline-block mr-1 border border-black/20"
                                  style={{ backgroundColor: item.color.hex }}
                                />
                                {item.color.name}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-[#E1A140] bg-[#F9EDF0]/60">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 text-[#49111C] hover:bg-[#F9EDF0] transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-2 text-xs font-medium text-[#49111C]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 text-[#49111C] hover:bg-[#F9EDF0] transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <span className="text-xs font-semibold text-[#49111C]">
                              {formatCurrency(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Subtotal & Checkout */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-[#E1A140] bg-[#F9EDF0]/50 space-y-3">
                    <div className="space-y-1.5 text-xs text-[#49111C]/75">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-medium text-[#49111C]">{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="font-medium text-[#49111C]">
                          {shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold text-[#49111C] pt-2 border-t border-[#E1A140]/60">
                        <span>Estimated Total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCheckoutModalOpen(true);
                      }}
                      className="w-full bg-[#49111C] text-[#F9EDF0] py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#49111C] transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={14} />
                    </button>

                    <div className="text-center">
                      <Link
                        to="/cart"
                        onClick={() => setIsCartOpen(false)}
                        className="text-[11px] uppercase tracking-widest text-[#49111C]/75 hover:text-[#49111C] underline transition-colors"
                      >
                        View Full Shopping Bag
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />
    </>
  );
};

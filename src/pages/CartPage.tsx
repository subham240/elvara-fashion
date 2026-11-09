import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/formatCurrency';
import { CheckoutModal } from '../components/cart/CheckoutModal';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useShop();

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="min-h-screen bg-[#F9EDF0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A140] font-semibold block mb-2">
            Your Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#49111C] font-light uppercase tracking-wide">
            Shopping Bag
          </h1>
          <p className="text-xs text-[#49111C]/75 mt-2">
            {cart.reduce((a, b) => a + b.quantity, 0)} {cart.reduce((a, b) => a + b.quantity, 0) === 1 ? 'item' : 'items'} in your bag.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto bg-[#F9EDF0]/45 border border-[#E1A140] p-8 shadow-xs">
            <ShoppingBag size={48} strokeWidth={1} className="text-[#E1A140] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#49111C]">Your shopping bag is empty</h3>
            <p className="text-xs text-[#49111C]/75 mt-2 leading-relaxed">
              Explore our current collection of timeless essentials and contemporary tailoring.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                to="/collections/women"
                className="px-6 py-3 bg-[#49111C] text-[#F9EDF0] text-xs uppercase tracking-widest font-medium hover:bg-[#49111C] transition-colors shadow-xs"
              >
                Shop Women
              </Link>
              <Link
                to="/collections/men"
                className="px-6 py-3 bg-[#F9EDF0] border border-[#E1A140] text-[#49111C] text-xs uppercase tracking-widest font-medium hover:bg-[#E1A140]/60 transition-colors"
              >
                Shop Men
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column (Cols 8) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Box */}
              <div className="bg-[#F9EDF0] border border-[#E1A140] p-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-[#49111C]">
                    {freeShippingRemaining > 0
                      ? `Add ${formatCurrency(freeShippingRemaining)} more for complimentary shipping`
                      : 'You have unlocked Complimentary Standard Shipping!'}
                  </span>
                  <span className="text-[#49111C]/75">{shippingProgress}%</span>
                </div>
                <div className="w-full bg-[#E1A140] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#49111C] h-full transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#E1A140] border-y border-[#E1A140] bg-[#F9EDF0]/35 px-4 sm:px-6 shadow-xs">
                {cart.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <Link
                        to={`/products/${item.product.slug}`}
                        className="w-20 h-28 bg-[#F9EDF0] overflow-hidden border border-[#E1A140] shrink-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="space-y-1">
                        <span className="text-[9px] tracking-widest uppercase text-[#E1A140]">
                          {item.product.category}
                        </span>
                        <Link
                          to={`/products/${item.product.slug}`}
                          className="font-serif text-lg text-[#49111C] hover:text-[#E1A140] transition-colors block"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center space-x-3 text-xs text-[#49111C]/75">
                          <span>Size: <strong className="text-[#49111C]">{item.size}</strong></span>
                          <span>•</span>
                          <span className="flex items-center">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block mr-1.5 border border-black/20"
                              style={{ backgroundColor: item.color.hex }}
                            />
                            {item.color.name}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-[#49111C] pt-1">
                          {formatCurrency(item.product.price)} each
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-[#E1A140]/40">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#E1A140] bg-[#F9EDF0]/60">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-[#49111C] hover:bg-[#F9EDF0] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#49111C]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-[#49111C] hover:bg-[#F9EDF0] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="font-serif text-base font-semibold text-[#49111C]">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#E1A140] hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary (Cols 4) */}
            <div className="lg:col-span-4">
              <div className="bg-[#F9EDF0] border border-[#E1A140] p-6 space-y-6 sticky top-28">
                <h3 className="font-serif text-xl uppercase tracking-wider text-[#49111C] pb-3 border-b border-[#E1A140]">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs text-[#49111C]/75">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#49111C]">{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#49111C]">
                      {shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated GST (Included)</span>
                    <span className="font-medium text-[#49111C]">{formatCurrency(Math.round(subtotal * 0.12))}</span>
                  </div>

                  <div className="pt-4 border-t border-[#E1A140] flex justify-between text-base font-semibold text-[#49111C]">
                    <span>Total Amount</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full bg-[#49111C] hover:bg-[#49111C] text-[#F9EDF0] py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>

                {/* Badges */}
                <div className="pt-2 space-y-2 text-[11px] text-[#49111C]/75 border-t border-[#E1A140]/60">
                  <div className="flex items-center space-x-2">
                    <Truck size={14} className="text-[#49111C]" />
                    <span>Complimentary express dispatch across India</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RefreshCw size={14} className="text-[#49111C]" />
                    <span>Hassle-free 15-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck size={14} className="text-[#49111C]" />
                    <span>Secure encrypted checkout & UPI payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
};

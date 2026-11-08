import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatCurrency } from '../../utils/formatCurrency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, shipping, total, clearCart, user } = useShop();
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    firstName: user ? user.name.split(' ')[0] : 'Aria',
    lastName: user ? user.name.split(' ')[1] || 'Sharma' : 'Sharma',
    email: user ? user.email : 'aria.sharma@elvara.com',
    phone: '+91 98765 43210',
    address: '42, Lodhi Estate, Near India Habitat Centre',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110003',
    paymentMethod: 'upi',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generated = 'ELV-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generated);
      setIsSubmitting(false);
      setStep('success');
      clearCart();
    }, 1200);
  };

  const handleFinish = () => {
    setStep('details');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
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
            className="relative transform overflow-hidden bg-[#F5F1EA] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-[#D5C7B5]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D5C7B5] px-6 py-4 bg-[#EAE3D8]/50">
              <div>
                <span className="font-serif text-xl tracking-[0.16em] uppercase text-[#171717]">
                  ÉLVARA
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#A99A87] ml-2">
                  Secure Checkout
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-[#6B6963] hover:text-[#171717] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {step === 'details' ? (
              <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
                {/* Order Summary Pill */}
                <div className="bg-[#EAE3D8]/40 border border-[#D5C7B5]/60 p-4 rounded-xs flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#6B6963]">Items in order: </span>
                    <span className="font-medium text-[#171717]">{cart.length} item(s)</span>
                  </div>
                  <div>
                    <span className="text-[#6B6963]">Total Payable: </span>
                    <span className="font-semibold text-sm text-[#171717]">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Contact & Shipping Details */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] mb-3">
                    1. Delivery Address
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[#6B6963] mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-[#EAE3D8]/45 focus:bg-[#FAF8F5] border border-[#D5C7B5] px-3 py-2 text-[#171717] focus:outline-hidden focus:border-[#171717] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#6B6963] mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-[#EAE3D8]/45 focus:bg-[#FAF8F5] border border-[#D5C7B5] px-3 py-2 text-[#171717] focus:outline-hidden focus:border-[#171717] transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[#6B6963] mb-1">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-[#EAE3D8]/45 focus:bg-[#FAF8F5] border border-[#D5C7B5] px-3 py-2 text-[#171717] focus:outline-hidden focus:border-[#171717] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#6B6963] mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-[#EAE3D8]/45 focus:bg-[#FAF8F5] border border-[#D5C7B5] px-3 py-2 text-[#171717] focus:outline-hidden focus:border-[#171717] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#6B6963] mb-1">State / Province</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full bg-[#EAE3D8]/45 focus:bg-[#FAF8F5] border border-[#D5C7B5] px-3 py-2 text-[#171717] focus:outline-hidden focus:border-[#171717] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#6B6963] mb-1">PIN Code</label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full bg-[#EAE3D8]/45 focus:bg-[#FAF8F5] border border-[#D5C7B5] px-3 py-2 text-[#171717] focus:outline-hidden focus:border-[#171717] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#6B6963] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#EAE3D8]/45 focus:bg-[#FAF8F5] border border-[#D5C7B5] px-3 py-2 text-[#171717] focus:outline-hidden focus:border-[#171717] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] mb-3">
                    2. Payment Method
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <label className={`border p-3 flex flex-col items-center text-center cursor-pointer transition-colors ${formData.paymentMethod === 'upi' ? 'border-[#171717] bg-[#EAE3D8]' : 'border-[#D5C7B5] bg-[#EAE3D8]/50'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <CreditCard size={18} className="mb-1 text-[#34332F]" />
                      <span className="font-medium text-[#171717]">Instant UPI / QR</span>
                      <span className="text-[10px] text-[#6B6963]">Google Pay, PhonePe</span>
                    </label>

                    <label className={`border p-3 flex flex-col items-center text-center cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-[#171717] bg-[#EAE3D8]' : 'border-[#D5C7B5] bg-[#EAE3D8]/50'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <ShieldCheck size={18} className="mb-1 text-[#34332F]" />
                      <span className="font-medium text-[#171717]">Credit / Debit Card</span>
                      <span className="text-[10px] text-[#6B6963]">Visa, Mastercard, RuPay</span>
                    </label>

                    <label className={`border p-3 flex flex-col items-center text-center cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-[#171717] bg-[#EAE3D8]' : 'border-[#D5C7B5] bg-[#EAE3D8]/50'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <Truck size={18} className="mb-1 text-[#34332F]" />
                      <span className="font-medium text-[#171717]">Cash on Delivery</span>
                      <span className="text-[10px] text-[#6B6963]">Pay on arrival</span>
                    </label>
                  </div>
                </div>

                {/* Total and Place order button */}
                <div className="pt-4 border-t border-[#D5C7B5] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#6B6963]">
                    <span>Shipping: {shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}</span>
                    <span className="mx-2">•</span>
                    <span className="text-[#171717] font-semibold text-sm">Total: {formatCurrency(total)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full sm:w-auto bg-[#171717] text-[#F5F1EA] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#34332F] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Securing Order...' : `Place Order • ${formatCurrency(total)}`}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center space-y-5">
                <div className="w-16 h-16 bg-[#34332F] text-[#F5F1EA] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block">
                    Order Confirmed
                  </span>
                  <h3 className="font-serif text-2xl text-[#171717] mt-1 font-medium">
                    Thank You, {formData.firstName}.
                  </h3>
                  <p className="text-xs text-[#6B6963] mt-2 max-w-md mx-auto leading-relaxed">
                    Your order <span className="font-semibold text-[#171717]">{orderId}</span> has been confirmed. A confirmation receipt has been dispatched to <span className="text-[#171717] font-medium">{formData.email}</span>.
                  </p>
                </div>

                <div className="bg-[#EAE3D8]/50 border border-[#D5C7B5] p-4 text-xs text-left max-w-md mx-auto space-y-1">
                  <p className="font-medium text-[#171717]">Delivery Estimate:</p>
                  <p className="text-[#6B6963]">3–5 business days to {formData.city}, {formData.pincode}</p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleFinish}
                    className="bg-[#171717] text-[#F5F1EA] px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#34332F] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

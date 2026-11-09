import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-24 bg-[#49111C] text-[#F9EDF0] border-t border-[#49111C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A140] font-semibold block">
            The Inner Circle
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase font-light tracking-wide text-[#F9EDF0]">
            A Little More ÉLVARA.
          </h2>
          <p className="text-xs sm:text-sm text-[#E1A140] max-w-lg mx-auto font-light leading-relaxed">
            Receive private previews of upcoming seasonal ateliers, bespoke fabric dispatches, and invitations to intimate trunk shows.
          </p>

          <form onSubmit={handleSubmit} className="pt-6 max-w-md mx-auto">
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#49111C] border border-[#E1A140]/40 p-4 rounded-xs text-xs text-[#F9EDF0] flex items-center justify-center space-x-2"
              >
                <Check size={16} className="text-[#E1A140]" />
                <span>You have been subscribed to the ÉLVARA private dispatch.</span>
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#49111C]/80 border border-[#E1A140]/40 px-4 py-3 text-xs text-[#F9EDF0] placeholder-[#E1A140] focus:outline-hidden focus:border-[#E1A140] transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#E1A140] text-[#49111C] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#F9EDF0] transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}
            <p className="text-[10px] text-[#E1A140]/70 mt-3">
              By subscribing, you agree to our Privacy Policy. Unsubscribe at any time with one click.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

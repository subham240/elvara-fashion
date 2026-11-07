import React from 'react';
import { motion } from 'framer-motion';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#171717] text-[#F5F1EA] text-[11px] sm:text-xs tracking-[0.2em] uppercase py-2 px-4 border-b border-[#34332F]/40 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-4 text-[10px] text-[#A99A87] tracking-widest">
          <span>INDIA (INR ₹)</span>
          <span>•</span>
          <span>EST. 2026</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto text-center font-medium text-[#F5F1EA]"
        >
          DISCOVER THE NEW SEASON — COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹2,999
        </motion.div>

        <div className="hidden md:flex items-center space-x-4 text-[10px] text-[#A99A87] tracking-widest">
          <span>HASSLE-FREE RETURNS</span>
          <span>•</span>
          <span>100% ORGANIC & RECYCLED</span>
        </div>
      </div>
    </div>
  );
};

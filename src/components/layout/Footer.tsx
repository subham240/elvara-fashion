import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171717] text-[#D5C7B5] pt-14 pb-8 border-t border-[#34332F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#34332F]/80">
          {/* Column 1 — ÉLVARA */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.22em] text-[#F5F1EA] uppercase block">
                ÉLVARA
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#A99A87] block mt-0.5">
                Timeless by Design
              </span>
            </div>
            <p className="text-xs text-[#A99A87] leading-relaxed max-w-xs font-light">
              Everyday tailoring and contemporary essentials made from certified natural fabrics.
            </p>
            <div className="flex items-center space-x-4 pt-1 text-[#D5C7B5]">
              {/* Subtle Instagram Icon */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F5F1EA] transition-colors p-1"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Subtle Pinterest Icon */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F5F1EA] transition-colors p-1"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.171-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — SHOP */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F5F1EA] block mb-4">
              Shop
            </span>
            <ul className="space-y-2.5 text-xs text-[#A99A87]">
              <li>
                <Link to="/collections/new-arrivals" className="hover:text-[#F5F1EA] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections/women" className="hover:text-[#F5F1EA] transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/collections/men" className="hover:text-[#F5F1EA] transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/collections/accessories" className="hover:text-[#F5F1EA] transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — CUSTOMER CARE & ATELIER CONCIERGE */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F5F1EA] block mb-4">
              Atelier Concierge
            </span>
            <ul className="space-y-2.5 text-xs text-[#A99A87]">
              <li>
                <a
                  href="mailto:subhamacharya731@gmail.com"
                  className="hover:text-[#F5F1EA] transition-colors block text-[11px] tracking-wide"
                >
                  subhamacharya731@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:6371830731"
                  className="hover:text-[#F5F1EA] transition-colors block text-[11px] tracking-wide"
                >
                  +91 6371830731
                </a>
              </li>
              <li className="text-[11px] text-[#A99A87] pt-1">
                Atelier: Brahmapur, Odisha
              </li>
              <li className="pt-2">
                <Link to="/pages/our-story" className="hover:text-[#F5F1EA] transition-colors block">
                  Shipping, FAQs & Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — INFORMATION */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F5F1EA] block mb-4">
              Information
            </span>
            <ul className="space-y-2.5 text-xs text-[#A99A87]">
              <li>
                <Link to="/pages/our-story" className="hover:text-[#F5F1EA] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/pages/our-story" className="hover:text-[#F5F1EA] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/pages/our-story" className="hover:text-[#F5F1EA] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A99A87]/80 gap-4">
          <div>
            <span>Copyright © 2026 ÉLVARA. All Rights Reserved.</span>
          </div>

          <div className="flex items-center space-x-2 text-[#D5C7B5]">
            <Globe size={13} />
            <span>India / INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

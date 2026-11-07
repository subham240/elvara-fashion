import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Navbar: React.FC = () => {
  const { cartCount, wishlistCount, setIsCartOpen, setIsSearchOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'women' | 'men' | 'collections' | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [location.pathname]);

  const womenCategories = [
    { name: 'All Women', href: '/collections/women' },
    { name: "Women's Shirts & Blouses", href: "/collections/women?category=Women%27s+Shirts" },
    { name: "Women's Dresses", href: "/collections/women?category=Women%27s+Dresses" },
    { name: "Women's Trousers", href: "/collections/women?category=Women%27s+Trousers" },
    { name: "Women's Tops & Knits", href: "/collections/women?category=Women%27s+Tops" },
    { name: "Women's Outerwear", href: "/collections/women?category=Women%27s+Outerwear" },
    { name: "Women's Jeans", href: "/collections/women?category=Women%27s+Jeans" },
  ];

  const menCategories = [
    { name: 'All Men', href: '/collections/men' },
    { name: "Men's Oxford & Casual Shirts", href: "/collections/men?category=Men%27s+Shirts" },
    { name: "Men's T-Shirts & Polos", href: "/collections/men?category=Men%27s+T-Shirts" },
    { name: "Men's Tailored Trousers & Chinos", href: "/collections/men?category=Men%27s+Trousers" },
    { name: "Men's Overshirts", href: "/collections/men?category=Men%27s+Overshirts" },
    { name: "Men's Blazers & Jackets", href: "/collections/men?category=Men%27s+Jackets" },
    { name: "Men's Denim", href: "/collections/men?category=Men%27s+Jeans" },
  ];

  const collectionsList = [
    { name: 'Spring Atelier 2026', desc: 'Fluid linen, sculptural tailoring, and organic cotton silhouettes.', href: '/collections/women?collection=Spring+Atelier+2026' },
    { name: 'Core Essentials', desc: 'Permanent collection designed for the art of everyday living.', href: '/collections/men?collection=Core+Essentials' },
    { name: 'Atelier Tailoring', desc: 'Double-pleated trousers, structured blazers, and virgin wool coats.', href: '/collections/women?collection=Atelier+Tailoring' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F1EA]/95 backdrop-blur-md shadow-xs border-b border-[#D5C7B5]/60 py-3.5'
          : 'bg-[#F5F1EA] py-5 border-b border-transparent'
      }`}
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#171717] hover:text-[#A99A87] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium uppercase tracking-[0.16em] text-[#34332F]">
            <Link
              to="/collections/new-arrivals"
              className="hover:text-[#171717] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#171717] hover:after:w-full after:transition-all after:duration-300"
            >
              New Arrivals
            </Link>

            {/* Women Mega Menu trigger */}
            <div
              className="relative py-1 cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('women')}
            >
              <Link
                to="/collections/women"
                className={`flex items-center space-x-1 hover:text-[#171717] transition-colors ${
                  activeMegaMenu === 'women' ? 'text-[#171717]' : ''
                }`}
              >
                <span>Women</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${activeMegaMenu === 'women' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* Men Mega Menu trigger */}
            <div
              className="relative py-1 cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('men')}
            >
              <Link
                to="/collections/men"
                className={`flex items-center space-x-1 hover:text-[#171717] transition-colors ${
                  activeMegaMenu === 'men' ? 'text-[#171717]' : ''
                }`}
              >
                <span>Men</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${activeMegaMenu === 'men' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            <Link
              to="/collections/accessories"
              className="hover:text-[#171717] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#171717] hover:after:w-full after:transition-all after:duration-300"
            >
              Accessories
            </Link>

            {/* Collections Mega Menu trigger */}
            <div
              className="relative py-1 cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('collections')}
            >
              <span
                className={`flex items-center space-x-1 hover:text-[#171717] transition-colors ${
                  activeMegaMenu === 'collections' ? 'text-[#171717]' : ''
                }`}
              >
                <span>Collections</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${activeMegaMenu === 'collections' ? 'rotate-180' : ''}`} />
              </span>
            </div>
          </nav>

          {/* Centered Logo */}
          <div className="flex-1 lg:flex-none text-center">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl md:text-[34px] tracking-[0.22em] text-[#171717] uppercase font-light transition-all group-hover:tracking-[0.25em] duration-300">
                ÉLVARA
              </span>
              <span className="block text-[8px] sm:text-[9px] tracking-[0.38em] text-[#A99A87] uppercase -mt-1 font-sans">
                TIMELESS BY DESIGN
              </span>
            </Link>
          </div>

          {/* Desktop & Mobile Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-[#171717]">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-[#A99A87] transition-colors relative group"
              aria-label="Search Products"
            >
              <Search size={19} strokeWidth={1.75} />
              <span className="hidden xl:inline-block ml-1 text-[11px] uppercase tracking-widest text-[#6B6963] group-hover:text-[#171717] transition-colors">
                Search
              </span>
            </button>

            {/* Account Link */}
            <Link
              to="/account"
              className="p-1.5 hover:text-[#A99A87] transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User size={19} strokeWidth={1.75} />
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-1.5 hover:text-[#A99A87] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={19} strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#34332F] text-[#F5F1EA] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium font-sans"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 hover:text-[#A99A87] transition-colors relative flex items-center"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} strokeWidth={1.75} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#171717] text-[#F5F1EA] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium font-sans"
                >
                  {cartCount}
                </motion.span>
              )}
              <span className="hidden xl:inline-block ml-1 text-[11px] uppercase tracking-widest text-[#6B6963] font-medium">
                Bag ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          DESKTOP MEGA MENUS (Warby Parker / Borbonese Inspired)
          ========================================= */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="hidden lg:block absolute top-full left-0 w-full bg-[#F5F1EA] border-b border-[#D5C7B5] shadow-xl z-30"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-8 py-10">
              {activeMegaMenu === 'women' && (
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-4">
                      Browse Women's Collection
                    </span>
                    <ul className="space-y-3">
                      {womenCategories.map((cat) => (
                        <li key={cat.name}>
                          <Link
                            to={cat.href}
                            className="text-sm text-[#171717] hover:text-[#A99A87] transition-colors flex items-center group font-medium"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all ml-2" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-4 border-l border-[#D5C7B5]/60 pl-8">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-4">
                      Curated Edits
                    </span>
                    <div className="space-y-4">
                      <Link to="/collections/women?collection=Spring+Atelier+2026" className="block group">
                        <h4 className="text-sm font-serif text-[#171717] group-hover:text-[#A99A87] transition-colors font-medium">
                          The Spring Atelier
                        </h4>
                        <p className="text-xs text-[#6B6963] mt-1 leading-relaxed">
                          Pure linen shirts, tailored wide-leg trousers, and bias silk slip dresses.
                        </p>
                      </Link>
                      <Link to="/collections/women?category=Women%27s+Trousers" className="block group">
                        <h4 className="text-sm font-serif text-[#171717] group-hover:text-[#A99A87] transition-colors font-medium">
                          Architectural Tailoring
                        </h4>
                        <p className="text-xs text-[#6B6963] mt-1 leading-relaxed">
                          Structured wool blazers and double-pleated relaxed trousers.
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <Link
                      to="/collections/women"
                      className="group block relative overflow-hidden aspect-[4/3] rounded-xs border border-[#D5C7B5]"
                    >
                      <img
                        src="/images/categories/women.jpg"
                        alt="Women's Editorial"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                        <span className="text-[10px] tracking-[0.25em] uppercase text-[#EAE3D8]">Featured Story</span>
                        <h3 className="font-serif text-lg tracking-wide mt-1">The Contemporary Silhouette</h3>
                        <span className="text-xs tracking-widest uppercase mt-2 text-[#D5C7B5] group-hover:underline flex items-center">
                          Shop The Edit <ArrowRight size={12} className="ml-1" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {activeMegaMenu === 'men' && (
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-4">
                      Browse Men's Collection
                    </span>
                    <ul className="space-y-3">
                      {menCategories.map((cat) => (
                        <li key={cat.name}>
                          <Link
                            to={cat.href}
                            className="text-sm text-[#171717] hover:text-[#A99A87] transition-colors flex items-center group font-medium"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all ml-2" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-4 border-l border-[#D5C7B5]/60 pl-8">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-4">
                      Curated Edits
                    </span>
                    <div className="space-y-4">
                      <Link to="/collections/men?category=Men%27s+Shirts" className="block group">
                        <h4 className="text-sm font-serif text-[#171717] group-hover:text-[#A99A87] transition-colors font-medium">
                          The Oxford & Linen Edit
                        </h4>
                        <p className="text-xs text-[#6B6963] mt-1 leading-relaxed">
                          Substantial cotton poplins, button-downs, and textured overshirts.
                        </p>
                      </Link>
                      <Link to="/collections/men?category=Men%27s+Trousers" className="block group">
                        <h4 className="text-sm font-serif text-[#171717] group-hover:text-[#A99A87] transition-colors font-medium">
                          Modern Relaxed Trousers
                        </h4>
                        <p className="text-xs text-[#6B6963] mt-1 leading-relaxed">
                          Italian cotton chinos and relaxed tailored wool trousers.
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <Link
                      to="/collections/men"
                      className="group block relative overflow-hidden aspect-[4/3] rounded-xs border border-[#D5C7B5]"
                    >
                      <img
                        src="/images/categories/men.jpg"
                        alt="Men's Editorial"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                        <span className="text-[10px] tracking-[0.25em] uppercase text-[#EAE3D8]">Featured Campaign</span>
                        <h3 className="font-serif text-lg tracking-wide mt-1">Effortless Modern Staples</h3>
                        <span className="text-xs tracking-widest uppercase mt-2 text-[#D5C7B5] group-hover:underline flex items-center">
                          Explore Collection <ArrowRight size={12} className="ml-1" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {activeMegaMenu === 'collections' && (
                <div className="grid grid-cols-3 gap-8">
                  {collectionsList.map((col) => (
                    <Link
                      key={col.name}
                      to={col.href}
                      className="p-6 bg-[#EAE3D8]/50 hover:bg-[#EAE3D8] transition-colors border border-[#D5C7B5]/60 group"
                    >
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#A99A87] font-semibold block mb-1">
                        Curated Series
                      </span>
                      <h4 className="font-serif text-lg text-[#171717] font-medium group-hover:text-[#A99A87] transition-colors">
                        {col.name}
                      </h4>
                      <p className="text-xs text-[#6B6963] mt-2 leading-relaxed">
                        {col.desc}
                      </p>
                      <span className="inline-flex items-center text-xs tracking-widest uppercase mt-4 text-[#171717] font-medium group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight size={12} className="ml-1" />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          MOBILE DRAWER MENU
          ========================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#F5F1EA] border-b border-[#D5C7B5] overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="space-y-4 text-sm uppercase tracking-[0.16em] font-medium text-[#171717]">
                <Link to="/collections/new-arrivals" className="block py-2 border-b border-[#EAE3D8]">
                  New Arrivals
                </Link>
                <Link to="/collections/women" className="block py-2 border-b border-[#EAE3D8]">
                  Women's Collection
                </Link>
                <Link to="/collections/men" className="block py-2 border-b border-[#EAE3D8]">
                  Men's Collection
                </Link>
                <Link to="/collections/accessories" className="block py-2 border-b border-[#EAE3D8]">
                  Accessories
                </Link>
                <Link to="/pages/our-story" className="block py-2 border-b border-[#EAE3D8]">
                  Our Story & Philosophy
                </Link>
                <Link to="/account" className="block py-2 border-b border-[#EAE3D8]">
                  My Account
                </Link>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs text-[#A99A87] tracking-widest uppercase">
                <span>Shipping to: India (₹)</span>
                <span>Customer Care</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

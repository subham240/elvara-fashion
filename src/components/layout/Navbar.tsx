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
      setIsScrolled(window.scrollY > 20);
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
    {
      name: 'Spring Atelier 2026',
      badge: 'RUNWAY EDIT',
      desc: 'Fluid linen, sculptural tailoring, and organic cotton silhouettes.',
      href: '/collections/spring-atelier-2026',
      image: '/images/hero/spring-campaign.jpg',
    },
    {
      name: 'Core Essentials',
      badge: 'PERMANENT ATELIER',
      desc: 'Everyday staples in organic cotton, French linen, and fine wool.',
      href: '/collections/core-essentials',
      image: '/images/editorial/less-but-better.jpg',
    },
    {
      name: 'Atelier Tailoring',
      badge: 'SARTORIAL DRAPE',
      desc: 'Double-pleated trousers, structured blazers, and virgin wool coats.',
      href: '/collections/atelier-tailoring',
      image: '/images/categories/men.jpg',
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F1EA]/95 backdrop-blur-md shadow-xs border-b border-[#D5C7B5]/60 py-3 sm:py-3.5'
          : 'bg-[#F5F1EA] py-4 sm:py-5 border-b border-[#EAE3D8]'
      }`}
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Mobile hamburger on left */}
          <div className="flex items-center lg:hidden z-10">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#171717] hover:text-[#A99A87] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[11px] font-medium uppercase tracking-[0.2em] text-[#34332F]">
            {/* Women Mega Menu trigger */}
            <div
              className="relative py-2 cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('women')}
            >
              <Link
                to="/collections/women"
                className={`flex items-center space-x-1 hover:text-[#171717] transition-colors ${
                  activeMegaMenu === 'women' ? 'text-[#171717]' : ''
                }`}
              >
                <span>Women</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${activeMegaMenu === 'women' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* Men Mega Menu trigger */}
            <div
              className="relative py-2 cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('men')}
            >
              <Link
                to="/collections/men"
                className={`flex items-center space-x-1 hover:text-[#171717] transition-colors ${
                  activeMegaMenu === 'men' ? 'text-[#171717]' : ''
                }`}
              >
                <span>Men</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${activeMegaMenu === 'men' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* Collections Mega Menu trigger */}
            <div
              className="relative py-2 cursor-pointer"
              onMouseEnter={() => setActiveMegaMenu('collections')}
            >
              <span
                className={`flex items-center space-x-1 hover:text-[#171717] transition-colors ${
                  activeMegaMenu === 'collections' ? 'text-[#171717]' : ''
                }`}
              >
                <span>Collections</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${activeMegaMenu === 'collections' ? 'rotate-180' : ''}`} />
              </span>
            </div>

            <Link
              to="/collections/new-arrivals"
              className="hover:text-[#171717] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#171717] hover:after:w-full after:transition-all after:duration-300"
            >
              The Edit
            </Link>

            <Link
              to="/pages/our-story"
              className="hover:text-[#171717] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#171717] hover:after:w-full after:transition-all after:duration-300"
            >
              Our Story
            </Link>
          </nav>

          {/* EXACT DEAD-CENTER BRAND LOGO */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto z-10">
            <Link to="/" className="inline-block group text-center select-none">
              <span className="font-serif text-2xl sm:text-3xl md:text-[32px] tracking-[0.24em] text-[#171717] uppercase font-light transition-all group-hover:tracking-[0.27em] duration-300 block">
                ÉLVARA
              </span>
              <span className="block text-[8px] sm:text-[9px] tracking-[0.38em] text-[#A99A87] uppercase -mt-0.5 font-sans font-medium">
                TIMELESS BY DESIGN
              </span>
            </Link>
          </div>

          {/* Desktop & Mobile Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-[#171717] z-10">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-[#A99A87] transition-colors relative group"
              aria-label="Search Products"
            >
              <Search size={19} strokeWidth={1.65} />
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
              <User size={19} strokeWidth={1.65} />
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-1.5 hover:text-[#A99A87] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={19} strokeWidth={1.65} />
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
              className="p-1.5 hover:text-[#A99A87] transition-colors relative flex items-center group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} strokeWidth={1.65} />
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
              <span className="hidden xl:inline-block ml-1 text-[11px] uppercase tracking-widest text-[#6B6963] group-hover:text-[#171717] font-medium transition-colors">
                Bag {cartCount > 0 && `(${cartCount})`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          DESKTOP MEGA MENUS
          ========================================= */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="hidden lg:block absolute top-full left-0 w-full bg-[#F5F1EA] border-b border-[#D5C7B5] shadow-xl z-30"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-8 py-10">
              {/* Women Mega Menu */}
              {activeMegaMenu === 'women' && (
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-4">
                      Browse Women's Atelier
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
                      Curated Series
                    </span>
                    <div className="space-y-4">
                      <Link to="/collections/spring-atelier-2026?gender=women" className="block group">
                        <h4 className="text-sm font-serif text-[#171717] group-hover:text-[#A99A87] transition-colors font-medium">
                          Spring Atelier 2026 Edit
                        </h4>
                        <p className="text-xs text-[#6B6963] mt-1 leading-relaxed">
                          French linen blouses, fluid silk midi dresses, and pleated trousers.
                        </p>
                      </Link>
                      <Link to="/collections/women?category=Women%27s+Trousers" className="block group">
                        <h4 className="text-sm font-serif text-[#171717] group-hover:text-[#A99A87] transition-colors font-medium">
                          The Wide-Leg Trouser
                        </h4>
                        <p className="text-xs text-[#6B6963] mt-1 leading-relaxed">
                          Double-pleated tailoring engineered for natural drape.
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
                        <span className="text-[10px] tracking-[0.25em] uppercase text-[#EAE3D8]">Spring Atelier 2026</span>
                        <h3 className="font-serif text-lg tracking-wide mt-1">Sculptural Feminine Tailoring</h3>
                        <span className="text-xs tracking-widest uppercase mt-2 text-[#D5C7B5] group-hover:underline flex items-center">
                          Explore Women's <ArrowRight size={12} className="ml-1" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {/* Men Mega Menu */}
              {activeMegaMenu === 'men' && (
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-4">
                      Browse Men's Atelier
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
                      Curated Series
                    </span>
                    <div className="space-y-4">
                      <Link to="/collections/core-essentials?gender=men" className="block group">
                        <h4 className="text-sm font-serif text-[#171717] group-hover:text-[#A99A87] transition-colors font-medium">
                          The Core Essentials Edit
                        </h4>
                        <p className="text-xs text-[#6B6963] mt-1 leading-relaxed">
                          Substantial cotton poplins, button-downs, and textured overshirts.
                        </p>
                      </Link>
                      <Link to="/collections/atelier-tailoring?gender=men" className="block group">
                        <h4 className="text-sm font-serif text-[#171717] group-hover:text-[#A99A87] transition-colors font-medium">
                          Atelier Tailoring & Chinos
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
                          Explore Men's <ArrowRight size={12} className="ml-1" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {/* Collections Mega Menu - Accurate Dedicated Links */}
              {activeMegaMenu === 'collections' && (
                <div>
                  <div className="mb-6 flex items-center justify-between border-b border-[#D5C7B5]/60 pb-3">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold">
                      Curated Atelier Series
                    </span>
                    <span className="text-[11px] text-[#6B6963] tracking-widest uppercase font-light">
                      All Collections Feature Men's & Women's Pieces
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {collectionsList.map((col) => (
                      <Link
                        key={col.name}
                        to={col.href}
                        className="group bg-[#EAE3D8]/50 hover:bg-[#EAE3D8] transition-all duration-300 border border-[#D5C7B5]/60 overflow-hidden flex flex-col"
                      >
                        <div className="aspect-[16/9] w-full overflow-hidden bg-[#171717] relative">
                          <img
                            src={col.image}
                            alt={col.name}
                            className="w-full h-full object-cover filter brightness-[0.85] group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3 bg-[#171717]/85 backdrop-blur-xs text-[#F5F1EA] text-[9px] px-2.5 py-1 tracking-[0.2em] uppercase font-medium">
                            {col.badge}
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h4 className="font-serif text-lg text-[#171717] font-medium group-hover:text-[#A99A87] transition-colors">
                              {col.name}
                            </h4>
                            <p className="text-xs text-[#6B6963] mt-1.5 leading-relaxed font-light">
                              {col.desc}
                            </p>
                          </div>
                          <span className="inline-flex items-center text-[11px] tracking-[0.2em] uppercase text-[#171717] font-medium pt-2 group-hover:translate-x-1 transition-transform">
                            Explore Collection <ArrowRight size={12} className="ml-1.5" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
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
                  The Edit (New Arrivals)
                </Link>
                <Link to="/collections/women" className="block py-2 border-b border-[#EAE3D8]">
                  Women's Atelier
                </Link>
                <Link to="/collections/men" className="block py-2 border-b border-[#EAE3D8]">
                  Men's Atelier
                </Link>

                <div className="py-2 border-b border-[#EAE3D8]">
                  <span className="text-[10px] text-[#A99A87] tracking-widest uppercase block mb-2 font-semibold">
                    Curated Collections
                  </span>
                  <div className="pl-3 space-y-2 text-xs tracking-wider normal-case font-serif text-[#34332F]">
                    <Link to="/collections/spring-atelier-2026" className="block hover:text-[#171717]">
                      • Spring Atelier 2026
                    </Link>
                    <Link to="/collections/core-essentials" className="block hover:text-[#171717]">
                      • Core Essentials
                    </Link>
                    <Link to="/collections/atelier-tailoring" className="block hover:text-[#171717]">
                      • Atelier Tailoring
                    </Link>
                  </div>
                </div>

                <Link to="/collections/accessories" className="block py-2 border-b border-[#EAE3D8]">
                  Accessories & Leather
                </Link>
                <Link to="/pages/our-story" className="block py-2 border-b border-[#EAE3D8]">
                  Our Story & Philosophy
                </Link>
                <Link to="/account" className="block py-2 border-b border-[#EAE3D8]">
                  My Account
                </Link>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-[#A99A87] tracking-widest uppercase">
                <span>Direct Atelier Shipping</span>
                <span>Hassle-Free Returns</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

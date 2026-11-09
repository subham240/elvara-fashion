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
      className={`sticky top-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? 'bg-[#F9EDF0]/75 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(23,23,23,0.06)] border-b border-[#E1A140]/60 py-1 sm:py-1.5'
          : 'bg-[#F9EDF0] py-3 sm:py-4 border-b border-[#F9EDF0]'
      }`}
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? 'h-9 sm:h-10' : 'h-12 sm:h-14'
          }`}
        >
          {/* Left Column: Category Navigation */}
          <div className="flex items-center justify-start flex-1">
            {/* Mobile hamburger on left */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 -ml-1 text-[#49111C] hover:text-[#E1A140] transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Desktop Left Nav Links */}
            <nav
              className={`hidden lg:flex items-center space-x-5 xl:space-x-6 uppercase tracking-[0.18em] text-[#49111C] font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'text-[10px]' : 'text-[11px]'
              }`}
            >
              {/* Women Mega Menu trigger */}
              <div
                className="relative py-1.5 cursor-pointer"
                onMouseEnter={() => setActiveMegaMenu('women')}
              >
                <Link
                  to="/collections/women"
                  className={`flex items-center space-x-1 hover:text-[#49111C] transition-colors ${
                    activeMegaMenu === 'women' ? 'text-[#49111C]' : ''
                  }`}
                >
                  <span>Women</span>
                  <ChevronDown size={10} className={`transition-transform duration-200 ${activeMegaMenu === 'women' ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              {/* Men Mega Menu trigger */}
              <div
                className="relative py-1.5 cursor-pointer"
                onMouseEnter={() => setActiveMegaMenu('men')}
              >
                <Link
                  to="/collections/men"
                  className={`flex items-center space-x-1 hover:text-[#49111C] transition-colors ${
                    activeMegaMenu === 'men' ? 'text-[#49111C]' : ''
                  }`}
                >
                  <span>Men</span>
                  <ChevronDown size={10} className={`transition-transform duration-200 ${activeMegaMenu === 'men' ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              {/* Accessories Link */}
              <Link
                to="/collections/accessories"
                className="hover:text-[#49111C] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#49111C] hover:after:w-full after:transition-all after:duration-300"
              >
                Accessories
              </Link>

              {/* Collections Mega Menu trigger */}
              <div
                className="relative py-1.5 cursor-pointer"
                onMouseEnter={() => setActiveMegaMenu('collections')}
              >
                <span
                  className={`flex items-center space-x-1 hover:text-[#49111C] transition-colors ${
                    activeMegaMenu === 'collections' ? 'text-[#49111C]' : ''
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown size={10} className={`transition-transform duration-200 ${activeMegaMenu === 'collections' ? 'rotate-180' : ''}`} />
                </span>
              </div>
            </nav>
          </div>

          {/* Center Column: EXACT PERFECT CENTER LOGO */}
          <div className="flex-none text-center px-4">
            <Link to="/" className="inline-block group text-center select-none py-0.5">
              <span
                className={`font-serif tracking-[0.24em] text-[#49111C] uppercase font-light transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:tracking-[0.27em] block leading-tight ${
                  isScrolled
                    ? 'text-lg sm:text-xl md:text-[21px]'
                    : 'text-2xl sm:text-3xl md:text-[27px]'
                }`}
              >
                ÉLVARA
              </span>
              <span
                className={`block uppercase font-sans font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isScrolled
                    ? 'text-[6px] sm:text-[6.5px] tracking-[0.34em] text-[#E1A140]/80 -mt-0.5'
                    : 'text-[7.5px] sm:text-[8px] tracking-[0.4em] text-[#E1A140] -mt-0.5'
                }`}
              >
                TIMELESS BY DESIGN
              </span>
            </Link>
          </div>

          {/* Right Column: Actions & Story */}
          <div
            className={`flex items-center justify-end flex-1 space-x-2.5 sm:space-x-4 xl:space-x-5 text-[#49111C] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? 'scale-[0.97] origin-right' : 'scale-100 origin-right'
            }`}
          >
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:text-[#E1A140] transition-colors relative flex items-center space-x-1"
              aria-label="Search Products"
            >
              <Search size={17} strokeWidth={1.65} />
              <span className="hidden xl:inline-block text-[10.5px] uppercase tracking-widest text-[#49111C]/75 font-medium">
                Search
              </span>
            </button>

            {/* Account Link */}
            <Link
              to="/account"
              className="p-1 hover:text-[#E1A140] transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User size={17} strokeWidth={1.65} />
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-1 hover:text-[#E1A140] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={17} strokeWidth={1.65} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#49111C] text-[#F9EDF0] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium font-sans"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 hover:text-[#E1A140] transition-colors relative flex items-center space-x-1"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={17} strokeWidth={1.65} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#49111C] text-[#F9EDF0] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium font-sans"
                >
                  {cartCount}
                </motion.span>
              )}
              <span className="hidden xl:inline-block text-[10.5px] uppercase tracking-widest text-[#49111C]/75 font-medium">
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
            className="hidden lg:block absolute top-full left-0 w-full bg-[#F9EDF0] border-b border-[#E1A140] shadow-xl z-30"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-8 py-10">
              {/* Women Mega Menu */}
              {activeMegaMenu === 'women' && (
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#E1A140] font-semibold block mb-4">
                      Browse Women's Atelier
                    </span>
                    <ul className="space-y-3">
                      {womenCategories.map((cat) => (
                        <li key={cat.name}>
                          <Link
                            to={cat.href}
                            className="text-sm text-[#49111C] hover:text-[#E1A140] transition-colors flex items-center group font-medium"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all ml-2" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-4 border-l border-[#E1A140]/60 pl-8">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#E1A140] font-semibold block mb-4">
                      Curated Series
                    </span>
                    <div className="space-y-4">
                      <Link to="/collections/spring-atelier-2026?gender=women" className="block group">
                        <h4 className="text-sm font-serif text-[#49111C] group-hover:text-[#E1A140] transition-colors font-medium">
                          Spring Atelier 2026 Edit
                        </h4>
                        <p className="text-xs text-[#49111C]/75 mt-1 leading-relaxed">
                          French linen blouses, fluid silk midi dresses, and pleated trousers.
                        </p>
                      </Link>
                      <Link to="/collections/women?category=Women%27s+Trousers" className="block group">
                        <h4 className="text-sm font-serif text-[#49111C] group-hover:text-[#E1A140] transition-colors font-medium">
                          The Wide-Leg Trouser
                        </h4>
                        <p className="text-xs text-[#49111C]/75 mt-1 leading-relaxed">
                          Double-pleated tailoring engineered for natural drape.
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <Link
                      to="/collections/women"
                      className="group block relative overflow-hidden aspect-[4/3] rounded-xs border border-[#E1A140]"
                    >
                      <img
                        src="/images/categories/women.jpg"
                        alt="Women's Editorial"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                        <span className="text-[10px] tracking-[0.25em] uppercase text-[#F9EDF0]">Spring Atelier 2026</span>
                        <h3 className="font-serif text-lg tracking-wide mt-1">Sculptural Feminine Tailoring</h3>
                        <span className="text-xs tracking-widest uppercase mt-2 text-[#E1A140] group-hover:underline flex items-center">
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
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#E1A140] font-semibold block mb-4">
                      Browse Men's Atelier
                    </span>
                    <ul className="space-y-3">
                      {menCategories.map((cat) => (
                        <li key={cat.name}>
                          <Link
                            to={cat.href}
                            className="text-sm text-[#49111C] hover:text-[#E1A140] transition-colors flex items-center group font-medium"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all ml-2" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-4 border-l border-[#E1A140]/60 pl-8">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#E1A140] font-semibold block mb-4">
                      Curated Series
                    </span>
                    <div className="space-y-4">
                      <Link to="/collections/core-essentials?gender=men" className="block group">
                        <h4 className="text-sm font-serif text-[#49111C] group-hover:text-[#E1A140] transition-colors font-medium">
                          The Core Essentials Edit
                        </h4>
                        <p className="text-xs text-[#49111C]/75 mt-1 leading-relaxed">
                          Substantial cotton poplins, button-downs, and textured overshirts.
                        </p>
                      </Link>
                      <Link to="/collections/atelier-tailoring?gender=men" className="block group">
                        <h4 className="text-sm font-serif text-[#49111C] group-hover:text-[#E1A140] transition-colors font-medium">
                          Atelier Tailoring & Chinos
                        </h4>
                        <p className="text-xs text-[#49111C]/75 mt-1 leading-relaxed">
                          Italian cotton chinos and relaxed tailored wool trousers.
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <Link
                      to="/collections/men"
                      className="group block relative overflow-hidden aspect-[4/3] rounded-xs border border-[#E1A140]"
                    >
                      <img
                        src="/images/categories/men.jpg"
                        alt="Men's Editorial"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                        <span className="text-[10px] tracking-[0.25em] uppercase text-[#F9EDF0]">Featured Campaign</span>
                        <h3 className="font-serif text-lg tracking-wide mt-1">Effortless Modern Staples</h3>
                        <span className="text-xs tracking-widest uppercase mt-2 text-[#E1A140] group-hover:underline flex items-center">
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
                  <div className="mb-6 flex items-center justify-between border-b border-[#E1A140]/60 pb-3">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#E1A140] font-semibold">
                      Curated Atelier Series
                    </span>
                    <span className="text-[11px] text-[#49111C]/75 tracking-widest uppercase font-light">
                      All Collections Feature Men's & Women's Pieces
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {collectionsList.map((col) => (
                      <Link
                        key={col.name}
                        to={col.href}
                        className="group bg-[#F9EDF0]/50 hover:bg-[#F9EDF0] transition-all duration-300 border border-[#E1A140]/60 overflow-hidden flex flex-col"
                      >
                        <div className="aspect-[16/9] w-full overflow-hidden bg-[#49111C] relative">
                          <img
                            src={col.image}
                            alt={col.name}
                            className="w-full h-full object-cover filter brightness-[0.85] group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3 bg-[#49111C]/85 backdrop-blur-xs text-[#F9EDF0] text-[9px] px-2.5 py-1 tracking-[0.2em] uppercase font-medium">
                            {col.badge}
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h4 className="font-serif text-lg text-[#49111C] font-medium group-hover:text-[#E1A140] transition-colors">
                              {col.name}
                            </h4>
                            <p className="text-xs text-[#49111C]/75 mt-1.5 leading-relaxed font-light">
                              {col.desc}
                            </p>
                          </div>
                          <span className="inline-flex items-center text-[11px] tracking-[0.2em] uppercase text-[#49111C] font-medium pt-2 group-hover:translate-x-1 transition-transform">
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
            className="lg:hidden bg-[#F9EDF0] border-b border-[#E1A140] overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="space-y-4 text-sm uppercase tracking-[0.16em] font-medium text-[#49111C]">
                <Link to="/collections/women" className="block py-2 border-b border-[#F9EDF0]">
                  Women's Atelier
                </Link>
                <Link to="/collections/men" className="block py-2 border-b border-[#F9EDF0]">
                  Men's Atelier
                </Link>
                <Link to="/collections/accessories" className="block py-2 border-b border-[#F9EDF0]">
                  Accessories & Leather
                </Link>

                <div className="py-2 border-b border-[#F9EDF0]">
                  <span className="text-[10px] text-[#E1A140] tracking-widest uppercase block mb-2 font-semibold">
                    Curated Collections
                  </span>
                  <div className="pl-3 space-y-2 text-xs tracking-wider normal-case font-serif text-[#49111C]">
                    <Link to="/collections/spring-atelier-2026" className="block hover:text-[#49111C]">
                      • Spring Atelier 2026
                    </Link>
                    <Link to="/collections/core-essentials" className="block hover:text-[#49111C]">
                      • Core Essentials
                    </Link>
                    <Link to="/collections/atelier-tailoring" className="block hover:text-[#49111C]">
                      • Atelier Tailoring
                    </Link>
                  </div>
                </div>

                <Link to="/collections/accessories" className="block py-2 border-b border-[#F9EDF0]">
                  Accessories & Leather
                </Link>
                <Link to="/account" className="block py-2 border-b border-[#F9EDF0]">
                  My Account
                </Link>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-[#E1A140] tracking-widest uppercase">
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

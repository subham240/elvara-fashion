import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, recentSearches, addRecentSearch, toggleWishlist, isInWishlist } = useShop();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.subcategory.toLowerCase().includes(trimmed) ||
        p.description.toLowerCase().includes(trimmed) ||
        p.collection.toLowerCase().includes(trimmed)
      );
    });
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query);
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectRecent = (term: string) => {
    setQuery(term);
    addRecentSearch(term);
    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        {/* Search Dialog Box */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-3xl mx-auto my-8 sm:my-16 bg-[#F5F1EA] shadow-2xl border border-[#D5C7B5] overflow-hidden"
        >
          {/* Input Header */}
          <form onSubmit={handleSubmit} className="flex items-center px-6 py-4 border-b border-[#D5C7B5] bg-[#EAE3D8]/50">
            <Search size={22} className="text-[#34332F] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search garments, tailoring, silk, linen, oxford shirts..."
              className="w-full bg-transparent border-none px-4 py-2 text-base text-[#171717] placeholder-[#A99A87] focus:outline-hidden font-sans"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-[#6B6963] hover:text-[#171717] mr-2"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-xs uppercase tracking-widest text-[#6B6963] hover:text-[#171717]"
            >
              Close
            </button>
          </form>

          {/* Body Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* If no query: show quick suggestions & recent searches */}
            {!query.trim() ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-3">
                    Recent Searches
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectRecent(term)}
                        className="text-xs bg-[#EAE3D8] hover:bg-[#D5C7B5] text-[#171717] px-3.5 py-1.5 rounded-xs transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-3">
                    Popular Categories
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { name: "Women's Linen", path: '/collections/women?category=Women%27s+Shirts' },
                      { name: 'Wide-Leg Trousers', path: '/collections/women?category=Women%27s+Trousers' },
                      { name: "Men's Oxford Shirts", path: '/collections/men?category=Men%27s+Shirts' },
                      { name: 'Leather Accessories', path: '/collections/accessories' },
                    ].map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 bg-[#EAE3D8]/50 border border-[#D5C7B5] hover:bg-[#EAE3D8] hover:border-[#171717] transition-all text-xs font-medium text-[#171717] block group shadow-2xs"
                      >
                        <span>{item.name}</span>
                        <ArrowRight size={12} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Live Results */
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#6B6963]">
                    {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} for "{query}"
                  </span>
                  {searchResults.length > 0 && (
                    <button
                      onClick={handleSubmit}
                      className="text-xs uppercase tracking-widest text-[#171717] underline font-medium"
                    >
                      View All
                    </button>
                  )}
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="font-serif text-lg text-[#171717]">No pieces found matching "{query}"</p>
                    <p className="text-xs text-[#6B6963] mt-2">
                      Try searching with broader terms such as "shirt", "trousers", "cashmere", or "blazer".
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {searchResults.slice(0, 6).map((product) => (
                      <div
                        key={product.id}
                        className="flex space-x-3 p-3 bg-[#EAE3D8]/50 border border-[#D5C7B5] hover:border-[#171717] hover:bg-[#EAE3D8] transition-all group relative shadow-2xs"
                      >
                        <Link
                          to={`/products/${product.slug}`}
                          onClick={() => {
                            addRecentSearch(query);
                            setIsSearchOpen(false);
                          }}
                          className="w-16 h-20 bg-[#EAE3D8] shrink-0 overflow-hidden"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>

                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <span className="text-[9px] tracking-widest uppercase text-[#A99A87] block">
                              {product.category}
                            </span>
                            <Link
                              to={`/products/${product.slug}`}
                              onClick={() => {
                                addRecentSearch(query);
                                setIsSearchOpen(false);
                              }}
                              className="font-serif text-sm text-[#171717] group-hover:text-[#A99A87] transition-colors font-medium line-clamp-1 mt-0.5"
                            >
                              {product.name}
                            </Link>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#171717]">
                              {formatCurrency(product.price)}
                            </span>
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="p-1 text-[#6B6963] hover:text-red-700 transition-colors"
                              aria-label="Wishlist"
                            >
                              <Heart
                                size={14}
                                className={isInWishlist(product.id) ? 'fill-red-700 text-red-700' : ''}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

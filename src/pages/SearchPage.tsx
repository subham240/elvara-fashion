import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { useShop } from '../context/ShopContext';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const { recentSearches, addRecentSearch } = useShop();

  const [selectedGender, setSelectedGender] = useState<'all' | 'women' | 'men'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      addRecentSearch(q);
    }
  }, [searchParams]);

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    let results = products.filter((p) => {
      const matchText =
        p.name.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.subcategory.toLowerCase().includes(trimmed) ||
        p.description.toLowerCase().includes(trimmed) ||
        p.collection.toLowerCase().includes(trimmed);

      const matchGender = selectedGender === 'all' || p.gender === selectedGender;
      return matchText && matchGender;
    });

    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    }

    return results;
  }, [query, selectedGender, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query);
      setSearchParams({ q: query });
    }
  };

  const handleSelectRecent = (term: string) => {
    setQuery(term);
    addRecentSearch(term);
    setSearchParams({ q: term });
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header Form */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A99A87] font-semibold block mb-2">
            The Atelier Directory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light uppercase tracking-wide mb-6">
            Search Catalogue
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search size={20} className="absolute left-4 text-[#6B6963]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by garment, fabric (linen, silk, wool), or style..."
              className="w-full bg-[#EAE3D8]/50 focus:bg-[#FAF8F5] border border-[#D5C7B5] pl-12 pr-12 py-3.5 text-sm text-[#171717] placeholder-[#A99A87] focus:outline-hidden focus:border-[#171717] transition-colors shadow-2xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSearchParams({});
                }}
                className="absolute right-4 text-[#6B6963] hover:text-[#171717]"
              >
                <X size={18} />
              </button>
            )}
          </form>

          {/* Recent Searches Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-[#A99A87] uppercase tracking-wider text-[10px]">Recent:</span>
            {recentSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleSelectRecent(term)}
                className="bg-[#EAE3D8] hover:bg-[#D5C7B5] text-[#171717] px-3 py-1 rounded-xs transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Filters & Results Meta */}
        {query.trim() && (
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-[#D5C7B5] mb-8 gap-4">
            <span className="text-xs uppercase tracking-widest text-[#6B6963]">
              Found <span className="font-semibold text-[#171717]">{searchResults.length}</span> pieces for "{query}"
            </span>

            <div className="flex items-center space-x-4 text-xs">
              {/* Gender selector */}
              <div className="flex border border-[#D5C7B5] bg-[#EAE3D8]/50">
                {(['all', 'women', 'men'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors ${
                      selectedGender === g
                        ? 'bg-[#171717] text-[#F5F1EA] font-medium'
                        : 'text-[#6B6963] hover:text-[#171717]'
                    }`}
                  >
                    {g === 'all' ? 'All' : g}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#EAE3D8]/50 border border-[#D5C7B5] px-3 py-1.5 text-xs text-[#171717] focus:outline-hidden"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {query.trim() ? (
          searchResults.length === 0 ? (
            <div className="py-20 text-center bg-[#EAE3D8]/45 border border-[#D5C7B5] p-8 shadow-xs">
              <h3 className="font-serif text-2xl text-[#171717]">No results found for "{query}"</h3>
              <p className="text-xs text-[#6B6963] mt-2 max-w-sm mx-auto leading-relaxed">
                Try searching with terms like "linen", "shirt", "dress", "trousers", or "overcoat".
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  to="/collections/women"
                  className="px-6 py-2.5 bg-[#171717] text-[#F5F1EA] text-xs uppercase tracking-widest font-medium hover:bg-[#34332F] transition-colors shadow-xs"
                >
                  Browse Women
                </Link>
                <Link
                  to="/collections/men"
                  className="px-6 py-2.5 bg-[#EAE3D8] border border-[#D5C7B5] text-[#171717] text-xs uppercase tracking-widest font-medium hover:bg-[#D5C7B5]/60 transition-colors"
                >
                  Browse Men
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )
        ) : (
          <div className="py-12 max-w-4xl mx-auto">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-4 text-center">
              Suggested Curations
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { name: "Women's Spring Atelier", count: '14 Styles', img: '/images/categories/women.jpg', link: '/collections/women' },
                { name: "Men's Core Essentials", count: '14 Styles', img: '/images/categories/men.jpg', link: '/collections/men' },
                { name: 'Leather Accessories', count: '6 Styles', img: '/images/categories/accessories.jpg', link: '/collections/accessories' },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="group relative aspect-[4/3] bg-[#EAE3D8] overflow-hidden border border-[#D5C7B5]"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[9px] uppercase tracking-widest text-[#D5C7B5]">{item.count}</span>
                    <h3 className="font-serif text-lg font-medium">{item.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

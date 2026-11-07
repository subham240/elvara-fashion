import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import { COLLECTIONS_DATA } from '../data/collections';
import { ProductCard } from '../components/products/ProductCard';
import type { Gender } from '../types';

interface CollectionPageProps {
  genderTarget?: Gender;
  collectionTarget?: string;
  title?: string;
  subtitle?: string;
  bannerImage?: string;
  isNewArrivalsOnly?: boolean;
  isAccessoriesOnly?: boolean;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  genderTarget,
  collectionTarget,
  title: propTitle,
  subtitle: propSubtitle,
  bannerImage: propBannerImage,
  isNewArrivalsOnly,
  isAccessoriesOnly,
}) => {
  const { collectionSlug } = useParams<{ collectionSlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine if this is a dedicated collection view
  const activeCollectionKey = collectionSlug || (collectionTarget ? collectionTarget.toLowerCase().replace(/\s+/g, '-') : null);
  const collectionMeta = activeCollectionKey ? COLLECTIONS_DATA[activeCollectionKey] : null;

  // Resolved titles and banner
  const pageTitle = propTitle || collectionMeta?.title || (searchParams.get('collection') ? `${searchParams.get('collection')} Collection` : 'Collection');
  const pageSubtitle = propSubtitle || collectionMeta?.subtitle || 'Explore a considered selection of contemporary silhouettes.';
  const pageBanner = propBannerImage || collectionMeta?.bannerImage || '/images/hero/spring-campaign.jpg';
  const pageBadge = collectionMeta?.badge || (isNewArrivalsOnly ? 'THE LATEST EDIT' : isAccessoriesOnly ? 'ACCESSORIES' : genderTarget ? `${genderTarget.toUpperCase()}'S ATELIER` : 'ÉLVARA CURATION');

  // Filters State
  const [selectedGenderTab, setSelectedGenderTab] = useState<'all' | 'women' | 'men'>(
    (searchParams.get('gender') as 'women' | 'men') || 'all'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'bestselling'>('featured');
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with URL query parameters
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
    const sort = searchParams.get('sort');
    if (sort) {
      setSelectedSort(sort as any);
    }
    const gen = searchParams.get('gender');
    if (gen === 'women' || gen === 'men') {
      setSelectedGenderTab(gen);
    }
  }, [searchParams]);

  // 1. Base filtering by collection / gender / category target
  const baseProducts = useMemo(() => {
    return products.filter((p) => {
      // If collection-specific page or query param
      if (collectionMeta) {
        if (p.collection !== collectionMeta.name) return false;
      } else if (collectionTarget) {
        if (p.collection.toLowerCase() !== collectionTarget.toLowerCase()) return false;
      } else if (searchParams.get('collection')) {
        if (p.collection.toLowerCase() !== searchParams.get('collection')?.toLowerCase()) return false;
      }

      // New arrivals constraint
      if (isNewArrivalsOnly) {
        return p.isNewArrival;
      }

      // Accessories constraint
      if (isAccessoriesOnly) {
        return p.category === 'Accessories';
      }

      // Explicit gender target via props (e.g. /collections/women)
      if (genderTarget === 'women') {
        return p.gender === 'women';
      }
      if (genderTarget === 'men') {
        return p.gender === 'men';
      }

      // Gender tab filtering for multi-gender collections
      if (selectedGenderTab === 'women') {
        return p.gender === 'women';
      }
      if (selectedGenderTab === 'men') {
        return p.gender === 'men';
      }

      return true;
    });
  }, [collectionMeta, collectionTarget, searchParams, isNewArrivalsOnly, isAccessoriesOnly, genderTarget, selectedGenderTab]);

  // Counts for gender tabs within this collection
  const collectionGenderCounts = useMemo(() => {
    if (!collectionMeta && !collectionTarget && !searchParams.get('collection')) {
      return null;
    }
    const collectionName = collectionMeta?.name || collectionTarget || searchParams.get('collection');
    const matched = products.filter((p) => p.collection.toLowerCase() === collectionName?.toLowerCase());
    return {
      all: matched.length,
      women: matched.filter((p) => p.gender === 'women').length,
      men: matched.filter((p) => p.gender === 'men').length,
    };
  }, [collectionMeta, collectionTarget, searchParams]);

  // Available categories within this specific selection
  const availableCategories = useMemo(() => {
    const set = new Set(baseProducts.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [baseProducts]);

  // Available sizes within this selection
  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    baseProducts.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return ['all', ...Array.from(set)];
  }, [baseProducts]);

  // 2. Active Filter & Sort Application
  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Size filter
    if (selectedSize !== 'all') {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    // Price filter
    result = result.filter((p) => p.price <= priceMax);

    // Sorting
    if (selectedSort === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (selectedSort === 'bestselling') {
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    } else if (selectedSort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [baseProducts, selectedCategory, selectedSize, selectedSort, priceMax]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleGenderTabChange = (tab: 'all' | 'women' | 'men') => {
    setSelectedGenderTab(tab);
    setSelectedCategory('all');
    if (tab === 'all') {
      searchParams.delete('gender');
    } else {
      searchParams.set('gender', tab);
    }
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('all');
    setSelectedSort('featured');
    setPriceMax(5000);
    searchParams.delete('category');
    searchParams.delete('sort');
    setSearchParams(searchParams);
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSize !== 'all' ? 1 : 0) +
    (priceMax < 5000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      {/* Editorial Banner */}
      <div className="relative h-64 sm:h-80 md:h-[420px] bg-[#171717] overflow-hidden">
        <img
          src={pageBanner}
          alt={pageTitle}
          className="w-full h-full object-cover filter brightness-[0.72] scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 text-[#F5F1EA]">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#D5C7B5] mb-2 font-medium">
            {pageBadge}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase tracking-[0.12em] font-light text-[#F5F1EA]">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#EAE3D8] mt-3 max-w-xl font-light leading-relaxed">
            {pageSubtitle}
          </p>

          {/* If collection view, show subtle indicator */}
          {(collectionMeta || collectionTarget) && (
            <div className="mt-4 flex items-center space-x-3 text-[11px] uppercase tracking-[0.25em] text-[#D5C7B5]">
              <span>Small Batch Atelier</span>
              <span>•</span>
              <span>100% Traceable Fibres</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Listing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Curated Collection Gender Segment Tabs (if multi-gender collection) */}
        {collectionGenderCounts && !genderTarget && (
          <div className="mb-8 border-b border-[#D5C7B5] pb-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold mr-2 hidden sm:inline">
                  Atelier Filter:
                </span>
                <button
                  onClick={() => handleGenderTabChange('all')}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-200 ${
                    selectedGenderTab === 'all'
                      ? 'bg-[#171717] text-[#F5F1EA] font-medium shadow-xs'
                      : 'bg-[#EAE3D8]/60 text-[#34332F] hover:bg-[#EAE3D8]'
                  }`}
                >
                  All Silhouettes ({collectionGenderCounts.all})
                </button>
                <button
                  onClick={() => handleGenderTabChange('women')}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-200 ${
                    selectedGenderTab === 'women'
                      ? 'bg-[#171717] text-[#F5F1EA] font-medium shadow-xs'
                      : 'bg-[#EAE3D8]/60 text-[#34332F] hover:bg-[#EAE3D8]'
                  }`}
                >
                  Women ({collectionGenderCounts.women})
                </button>
                <button
                  onClick={() => handleGenderTabChange('men')}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-200 ${
                    selectedGenderTab === 'men'
                      ? 'bg-[#171717] text-[#F5F1EA] font-medium shadow-xs'
                      : 'bg-[#EAE3D8]/60 text-[#34332F] hover:bg-[#EAE3D8]'
                  }`}
                >
                  Men ({collectionGenderCounts.men})
                </button>
              </div>

              <div className="text-xs text-[#A99A87] tracking-wider uppercase font-light">
                <span>Direct Atelier Dispatch</span>
              </div>
            </div>
          </div>
        )}

        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#D5C7B5] gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center space-x-2 bg-[#EAE3D8] px-4 py-2 text-xs uppercase tracking-widest text-[#171717] font-medium border border-[#D5C7B5]"
            >
              <SlidersHorizontal size={14} />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <span className="text-xs text-[#6B6963] uppercase tracking-widest">
              Showing <span className="font-semibold text-[#171717]">{filteredProducts.length}</span> Pieces
            </span>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-[#6B6963] uppercase tracking-wider">Sort by:</span>
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="bg-transparent border border-[#D5C7B5] px-3 py-1.5 text-xs text-[#171717] font-medium pr-8 focus:outline-hidden focus:border-[#171717] cursor-pointer"
              >
                <option value="featured">Featured Edit</option>
                <option value="newest">Newest Arrivals</option>
                <option value="bestselling">Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B6963]" />
            </div>
          </div>
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1 space-y-8 pr-6 border-r border-[#D5C7B5]/60">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717]">
                Refine Selection
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#A99A87] hover:text-[#171717] underline uppercase tracking-wider transition-colors"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#6B6963] font-medium mb-3">
                Categories
              </h4>
              <ul className="space-y-2 text-xs">
                {availableCategories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryChange(cat)}
                      className={`text-left w-full transition-colors flex items-center justify-between py-1 ${
                        selectedCategory === cat
                          ? 'font-semibold text-[#171717] pl-1 border-l-2 border-[#171717]'
                          : 'text-[#6B6963] hover:text-[#171717]'
                      }`}
                    >
                      <span className="capitalize">{cat === 'all' ? 'All Pieces' : cat}</span>
                      <span className="text-[10px] text-[#A99A87]">
                        {cat === 'all'
                          ? baseProducts.length
                          : baseProducts.filter((p) => p.category === cat).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#6B6963] font-medium mb-3">
                Sizes
              </h4>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-xs border transition-colors ${
                      selectedSize === size
                        ? 'border-[#171717] bg-[#171717] text-[#F5F1EA] font-medium'
                        : 'border-[#D5C7B5] bg-white text-[#171717] hover:border-[#34332F]'
                    }`}
                  >
                    {size === 'all' ? 'All Sizes' : size}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Filter */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6B6963] font-medium">
                  Max Price
                </span>
                <span className="font-semibold text-[#171717]">₹{priceMax}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="200"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#171717] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#A99A87] mt-1">
                <span>₹500</span>
                <span>₹5,000</span>
              </div>
            </div>
          </div>

          {/* Mobile Filters Drawer Modal */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden overflow-y-auto bg-[#F5F1EA] p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D5C7B5]">
                <h3 className="font-serif text-xl uppercase tracking-wider text-[#171717]">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#171717]"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#6B6963] font-semibold mb-3">
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availableCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-3 py-1.5 text-xs border ${
                          selectedCategory === cat
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-white text-[#171717] border-[#D5C7B5]'
                        }`}
                      >
                        {cat === 'all' ? 'All Pieces' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#6B6963] font-semibold mb-3">
                    Sizes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs border ${
                          selectedSize === size
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-white text-[#171717] border-[#D5C7B5]'
                        }`}
                      >
                        {size === 'all' ? 'All Sizes' : size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="uppercase tracking-widest text-[#6B6963] font-semibold">
                      Max Price: ₹{priceMax}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="200"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[#171717]"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-[#D5C7B5] flex gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 text-xs uppercase tracking-widest border border-[#D5C7B5] text-[#171717]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 text-xs uppercase tracking-widest bg-[#171717] text-[#F5F1EA]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center border border-[#D5C7B5]/60 bg-white/40 p-8">
                <h3 className="font-serif text-2xl text-[#171717]">No pieces matched your selection</h3>
                <p className="text-xs text-[#6B6963] mt-2 max-w-sm mx-auto leading-relaxed">
                  Adjust your filters or reset to browse the complete collection.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-6 py-2.5 bg-[#171717] text-[#F5F1EA] text-xs uppercase tracking-[0.2em]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

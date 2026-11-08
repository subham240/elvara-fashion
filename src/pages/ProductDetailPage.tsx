import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Ruler, Check, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/formatCurrency';
import type { ProductColor } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const product = products.find((p) => p.slug === slug);

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping'>('details');
  const [addedToast, setAddedToast] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedSize(product.sizes[0] || 'Standard');
      setSelectedColor(product.colors[0] || null);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#171717]">Piece Not Found</h2>
        <p className="text-xs text-[#6B6963] mt-2">
          The requested garment is not available in our current seasonal catalogue.
        </p>
        <Link
          to="/collections/women"
          className="mt-6 px-6 py-3 bg-[#171717] text-[#F5F1EA] text-xs uppercase tracking-widest"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  // Related products: MUST belong to same gender classification and relevant category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.gender === product.gender)
    .slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA] pt-6 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center space-x-2 text-[11px] text-[#A99A87] uppercase tracking-wider">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link
            to={product.gender === 'women' ? '/collections/women' : product.gender === 'men' ? '/collections/men' : '/collections/accessories'}
            className="hover:text-[#171717] transition-colors capitalize"
          >
            {product.gender}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#171717] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Gallery (Columns 7) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 shrink-0">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 bg-[#EAE3D8] overflow-hidden border transition-all ${
                    activeImage === img
                      ? 'border-[#171717] ring-1 ring-[#171717]'
                      : 'border-[#D5C7B5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Interactive Zoomable Image */}
            <div
              className="flex-1 aspect-[3/4] bg-[#EAE3D8] relative overflow-hidden border border-[#D5C7B5] cursor-crosshair group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={activeImage}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-200 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }
                    : undefined
                }
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-1.5 pointer-events-none">
                {product.isNewArrival && (
                  <span className="bg-[#171717] text-[#F5F1EA] text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1">
                    New Arrival
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-[#34332F] text-[#EAE3D8] text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Hover Zoom Hint */}
              <div className="hidden sm:block absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase tracking-widest px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Hover to Zoom
              </div>
            </div>
          </div>

          {/* Right Product Details (Columns 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header info */}
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-1">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light uppercase tracking-wide">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mt-3">
                <span className="text-xl font-semibold text-[#171717]">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#A99A87] line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-widest text-[#A99A87] bg-[#EAE3D8] px-2 py-0.5">
                  Taxes Included
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#6B6963] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div className="pt-2 border-t border-[#D5C7B5]/60">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#6B6963] uppercase tracking-wider">Colour</span>
                <span className="font-medium text-[#171717]">{selectedColor?.name}</span>
              </div>
              <div className="flex space-x-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor?.name === c.name
                        ? 'border-[#171717] scale-110 ring-2 ring-[#171717]/20'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector & Size Guide */}
            <div className="pt-2 border-t border-[#D5C7B5]/60">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#6B6963] uppercase tracking-wider">Select Size</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center space-x-1 text-[#171717] hover:text-[#A99A87] underline transition-colors"
                >
                  <Ruler size={13} />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2.5 text-xs font-medium border text-center transition-all ${
                      selectedSize === s
                        ? 'border-[#171717] bg-[#171717] text-[#F5F1EA] shadow-xs'
                        : 'border-[#D5C7B5] bg-[#EAE3D8]/50 text-[#171717] hover:bg-[#EAE3D8] hover:border-[#34332F]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="pt-4 space-y-3">
              <div className="flex space-x-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#D5C7B5] bg-[#EAE3D8]/50 px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-sm font-medium text-[#6B6963] hover:text-[#171717]"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold text-[#171717]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-sm font-medium text-[#6B6963] hover:text-[#171717]"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#171717] hover:bg-[#34332F] text-[#F5F1EA] py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center space-x-2 shadow-xs"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Bag • {formatCurrency(product.price * quantity)}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle Wishlist"
                  className="p-3.5 border border-[#D5C7B5] bg-[#EAE3D8]/50 hover:bg-[#EAE3D8] transition-colors"
                >
                  <Heart
                    size={18}
                    className={isInWishlist(product.id) ? 'fill-red-700 text-red-700' : 'text-[#171717]'}
                  />
                </button>
              </div>

              {addedToast && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#34332F] text-[#F5F1EA] text-xs py-2 px-3 flex items-center justify-center space-x-2"
                >
                  <Check size={14} className="text-[#D5C7B5]" />
                  <span>Added {product.name} ({selectedSize}) to your shopping bag.</span>
                </motion.div>
              )}
            </div>

            {/* Guarantees / Shipping info */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-[#D5C7B5]/60 text-[11px] text-[#6B6963]">
              <div className="flex flex-col items-center text-center p-2">
                <Truck size={16} className="text-[#171717] mb-1" />
                <span>Complimentary Shipping &gt; ₹2,999</span>
              </div>
              <div className="flex flex-col items-center text-center p-2">
                <RefreshCw size={16} className="text-[#171717] mb-1" />
                <span>15-Day Hassle-Free Returns</span>
              </div>
              <div className="flex flex-col items-center text-center p-2">
                <ShieldCheck size={16} className="text-[#171717] mb-1" />
                <span>100% Certified Fabrics</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="pt-4 border-t border-[#D5C7B5]/60 space-y-3">
              <div className="flex space-x-4 border-b border-[#D5C7B5]/60 text-xs">
                {(['details', 'fabric', 'shipping'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 uppercase tracking-widest transition-colors ${
                      activeTab === tab
                        ? 'font-semibold text-[#171717] border-b-2 border-[#171717]'
                        : 'text-[#6B6963] hover:text-[#171717]'
                    }`}
                  >
                    {tab === 'details' ? 'Details & Fit' : tab === 'fabric' ? 'Fabric & Care' : 'Delivery & Returns'}
                  </button>
                ))}
              </div>

              <div className="text-xs text-[#6B6963] leading-relaxed pt-2">
                {activeTab === 'details' && (
                  <ul className="list-disc list-inside space-y-1">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'fabric' && (
                  <p>{product.fabricAndCare}</p>
                )}
                {activeTab === 'shipping' && (
                  <p>{product.deliveryInfo}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section (Strictly matching gender) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-[#D5C7B5]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-1">
              Complete the Ensemble
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-light uppercase tracking-wide">
              Related Pieces
            </h3>
          </div>
          <Link
            to={product.gender === 'women' ? '/collections/women' : '/collections/men'}
            className="text-xs uppercase tracking-widest text-[#171717] hover:text-[#A99A87] underline"
          >
            Explore More
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#F5F1EA] max-w-lg w-full p-6 sm:p-8 border border-[#D5C7B5] shadow-2xl relative">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-[#6B6963] hover:text-[#171717]"
            >
              ✕
            </button>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-1">
              Atelier Measurement Standard
            </span>
            <h3 className="font-serif text-2xl text-[#171717] uppercase tracking-wider mb-4">
              Size Guide ({product.gender === 'women' ? "Women's Fit" : "Men's Fit"})
            </h3>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D5C7B5] text-[#171717]">
                    <th className="py-2">Size</th>
                    <th className="py-2">Bust / Chest (in)</th>
                    <th className="py-2">Waist (in)</th>
                    <th className="py-2">Hip (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D5C7B5]/60 text-[#6B6963]">
                  <tr>
                    <td className="py-2 font-medium text-[#171717]">XS / 28</td>
                    <td className="py-2">32–34</td>
                    <td className="py-2">25–26</td>
                    <td className="py-2">35–36</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#171717]">S / 30</td>
                    <td className="py-2">35–36</td>
                    <td className="py-2">27–28</td>
                    <td className="py-2">37–38</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#171717]">M / 32</td>
                    <td className="py-2">37–39</td>
                    <td className="py-2">29–31</td>
                    <td className="py-2">39–41</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#171717]">L / 34</td>
                    <td className="py-2">40–42</td>
                    <td className="py-2">32–34</td>
                    <td className="py-2">42–44</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#171717]">XL / 36</td>
                    <td className="py-2">43–45</td>
                    <td className="py-2">35–37</td>
                    <td className="py-2">45–47</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-[#A99A87] mt-4 leading-relaxed">
              Measurements reflect true body dimensions. For a more relaxed silhouette, we recommend choosing one size up.
            </p>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="mt-6 w-full py-3 bg-[#171717] text-[#F5F1EA] text-xs uppercase tracking-widest font-medium"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

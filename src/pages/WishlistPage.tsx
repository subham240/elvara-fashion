import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { formatCurrency } from '../utils/formatCurrency';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, moveToCartFromWishlist } = useShop();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F9EDF0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A140] font-semibold block mb-2">
            Your Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#49111C] font-light uppercase tracking-wide">
            Saved Pieces
          </h1>
          <p className="text-xs text-[#49111C]/75 mt-2">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'piece' : 'pieces'} saved in your private archive.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto bg-[#F9EDF0]/45 border border-[#E1A140] p-8 shadow-xs">
            <Heart size={44} strokeWidth={1} className="text-[#E1A140] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#49111C]">Your wishlist is currently empty</h3>
            <p className="text-xs text-[#49111C]/75 mt-2 leading-relaxed">
              Explore our contemporary essentials and save your favourite silhouettes for future consideration.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                to="/collections/women"
                className="px-6 py-3 bg-[#49111C] text-[#F9EDF0] text-xs uppercase tracking-widest font-medium hover:bg-[#49111C] transition-colors shadow-xs"
              >
                Explore Women
              </Link>
              <Link
                to="/collections/men"
                className="px-6 py-3 bg-[#F9EDF0] border border-[#E1A140] text-[#49111C] text-xs uppercase tracking-widest font-medium hover:bg-[#E1A140]/60 transition-colors"
              >
                Explore Men
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#F9EDF0]/40 border border-[#E1A140] flex flex-col justify-between group overflow-hidden shadow-xs"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-[#F9EDF0] overflow-hidden">
                  <Link to={`/products/${product.slug}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-[#F9EDF0]/90 backdrop-blur-xs text-[#49111C]/75 hover:text-red-700 transition-colors rounded-full"
                    aria-label="Remove from Wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] tracking-widest uppercase text-[#E1A140] block">
                      {product.category}
                    </span>
                    <Link
                      to={`/products/${product.slug}`}
                      className="font-serif text-base text-[#49111C] hover:text-[#E1A140] transition-colors block mt-0.5 line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center space-x-2 mt-1.5">
                      <span className="text-xs font-semibold text-[#49111C]">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-[#E1A140] line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to bag button */}
                  <div className="pt-4 mt-2 border-t border-[#E1A140]/60">
                    <button
                      onClick={() => moveToCartFromWishlist(product.id)}
                      className="w-full py-2.5 bg-[#49111C] text-[#F9EDF0] hover:bg-[#49111C] text-[10px] uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <ShoppingBag size={12} />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

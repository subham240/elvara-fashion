import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, ProductColor, CartItem, UserAccount } from '../types';
import { products } from '../data/products';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string, size?: string, color?: ProductColor) => void;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  cartCount: number;
  wishlistCount: number;
  user: UserAccount | null;
  loginUser: (email: string, name: string) => void;
  logoutUser: () => void;
  addRecentSearch: (query: string) => void;
  recentSearches: string[];
}

const FREE_SHIPPING_THRESHOLD = 2999;
const STANDARD_SHIPPING_COST = 199;

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const initialMockUser: UserAccount = {
  name: 'Subham Acharya',
  email: 'subhamacharya731@gmail.com',
  addresses: [
    {
      id: 'addr-1',
      street: 'Hillpatna Main Road, Near Ramalingam Park',
      city: 'Brahmapur',
      state: 'Odisha',
      postalCode: '760001',
      isDefault: true,
    },
    {
      id: 'addr-2',
      street: '12B, Silver Beach Estate, Juhu Tara Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400049',
      isDefault: false,
    }
  ],
  orders: [
    {
      id: 'ELV-89421',
      date: '24 Oct 2026',
      itemsCount: 2,
      total: 4698,
      status: 'Delivered',
    },
    {
      id: 'ELV-90114',
      date: '02 Nov 2026',
      itemsCount: 1,
      total: 2499,
      status: 'In Transit',
    }
  ]
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('elvara_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('elvara_wishlist');
      return saved ? JSON.parse(saved) : ['W001', 'M001', 'A002'];
    } catch {
      return ['W001', 'M001', 'A002'];
    }
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('elvara_searches');
      return saved ? JSON.parse(saved) : ['Linen Blouse', 'Wide Leg Trousers', 'Oxford Shirt', 'Leather Belt'];
    } catch {
      return ['Linen Blouse', 'Wide Leg Trousers', 'Oxford Shirt', 'Leather Belt'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('elvara_user');
      return saved ? JSON.parse(saved) : initialMockUser;
    } catch {
      return initialMockUser;
    }
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('elvara_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('elvara_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('elvara_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('elvara_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('elvara_user');
    }
  }, [user]);

  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    setCart((prev) => {
      const itemKey = `${product.id}-${size}-${color.name}`;
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          product,
          size,
          color,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const moveToCartFromWishlist = (productId: string, size?: string, color?: ProductColor) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const selectedSize = size || product.sizes[0] || 'Standard';
    const selectedColor = color || product.colors[0] || { name: 'Natural', hex: '#EAE3D8' };
    addToCart(product, selectedSize, selectedColor, 1);
    toggleWishlist(productId);
  };

  const addRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      return [trimmed, ...filtered].slice(0, 6);
    });
  };

  const loginUser = (email: string, name: string) => {
    setUser({
      ...initialMockUser,
      email,
      name: name || email.split('@')[0],
    });
  };

  const logoutUser = () => {
    setUser(null);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = subtotal + shipping;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        subtotal,
        shipping,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        cartCount,
        wishlistCount,
        user,
        loginUser,
        logoutUser,
        addRecentSearch,
        recentSearches,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

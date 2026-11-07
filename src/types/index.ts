export type Gender = 'women' | 'men' | 'unisex';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  category: string;
  subcategory: string;
  description: string;
  details: string[];
  fabricAndCare: string;
  deliveryInfo: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  collection: string;
  isNewArrival: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export interface FilterState {
  gender?: Gender | 'all';
  category?: string;
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'bestselling';
}

export interface UserAccount {
  name: string;
  email: string;
  addresses: {
    id: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    isDefault: boolean;
  }[];
  orders: {
    id: string;
    date: string;
    itemsCount: number;
    total: number;
    status: 'Delivered' | 'In Transit' | 'Processing';
  }[];
}

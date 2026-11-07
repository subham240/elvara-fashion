import type { Product } from '../types';

export const products: Product[] = [
  // ==========================================
  // WOMEN'S COLLECTION (Strictly Women's Fashion)
  // ==========================================
  {
    id: 'W001',
    slug: 'essential-linen-blouse',
    name: 'Essential Linen Blouse',
    gender: 'women',
    category: "Women's Shirts",
    subcategory: 'Shirts',
    description: 'Woven from 100% French flax linen, this relaxed blouse features a band collar, dropped shoulders, and natural river shell buttons.',
    details: [
      '100% organic French flax linen',
      'Relaxed, fluid silhouette with subtle side vents',
      'Concealed placket with natural river shell buttons',
      'Pre-washed for a soft, lived-in drape that improves over time'
    ],
    fabricAndCare: '100% Linen. Machine wash cold on gentle cycle with similar colors. Line dry in shade. Warm iron if desired.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999. Standard delivery within 3–5 business days.',
    price: 2199,
    originalPrice: 2799,
    image: '/images/women/essential-linen-blouse.jpg',
    gallery: [
      '/images/women/essential-linen-blouse.jpg',
      '/images/categories/shirts.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Ivory', hex: '#F5F1EA' },
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Spring Atelier 2026',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'W002',
    slug: 'relaxed-cotton-shirt',
    name: 'Relaxed Cotton Shirt',
    gender: 'women',
    category: "Women's Shirts",
    subcategory: 'Shirts',
    description: 'Cut from crisp 80s two-ply organic cotton poplin with extended cuffs, a point collar, and a curved hemline.',
    details: [
      '100% GOTS-certified long-staple cotton poplin',
      'Modern point collar and clean mother-of-pearl buttons',
      'Elongated silhouette with curved hemline',
      'Tailored rear box pleat for fluid motion'
    ],
    fabricAndCare: '100% Organic Cotton. Machine wash delicate at 30°C. Do not tumble dry. Medium steam iron.',
    deliveryInfo: 'Complimentary shipping on orders above ₹2,999. Delivered in plastic-free recycled packaging.',
    price: 1899,
    originalPrice: 2399,
    image: '/images/women/relaxed-cotton-shirt.jpg',
    gallery: [
      '/images/women/relaxed-cotton-shirt.jpg',
      '/images/women/oversized-poplin-shirt.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure White', hex: '#FAF9F6' },
      { name: 'Cream', hex: '#EAE3D8' },
      { name: 'Taupe', hex: '#A99A87' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 52
  },
  {
    id: 'W003',
    slug: 'tailored-wide-leg-trousers',
    name: 'Tailored Wide-Leg Trousers',
    gender: 'women',
    category: "Women's Trousers",
    subcategory: 'Trousers',
    description: 'Tailored with double front pleats, a structured high-rise waistband, and an elongated wide-leg cut that breaks over footwear.',
    details: [
      'Premium lightweight wool-viscose blend with natural stretch',
      'High waist with structured inner waistband and bar-tack closure',
      'Dual deep slant pockets and back welt pockets',
      'Clean unhemmed interior finish allowing custom length adjustment'
    ],
    fabricAndCare: '65% Viscose, 30% Virgin Wool, 5% Elastane. Dry clean recommended. Alternatively gentle cool hand wash.',
    deliveryInfo: 'Express delivery available across all Indian metros in 48–72 hours.',
    price: 2499,
    originalPrice: 3199,
    image: '/images/women/tailored-wide-leg-trousers.jpg',
    gallery: [
      '/images/women/tailored-wide-leg-trousers.jpg',
      '/images/categories/trousers.jpg'
    ],
    sizes: ['26', '28', '30', '32', '34'],
    colors: [
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Taupe', hex: '#A99A87' },
      { name: 'Black', hex: '#171717' }
    ],
    inStock: true,
    collection: 'Atelier Tailoring',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 64
  },
  {
    id: 'W004',
    slug: 'classic-midi-dress',
    name: 'Classic Midi Dress',
    gender: 'women',
    category: "Women's Dresses",
    subcategory: 'Dresses',
    description: 'A column midi dress cut from structured matte crepe with clean seams, a boat neckline, and a subtle back slit.',
    details: [
      'Substantial matte crepe with graceful drape',
      'Subtle back slit for ease of movement',
      'Concealed invisible Japanese YKK zipper at centre back',
      'Unlined body for light, featherweight comfort'
    ],
    fabricAndCare: '70% Recycled Poly, 30% Fine Cotton. Hand wash cold or dry clean. Hang dry away from direct sunlight.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999. Hassle-free 15-day return policy.',
    price: 2799,
    originalPrice: 3499,
    image: '/images/women/classic-midi-dress.jpg',
    gallery: [
      '/images/women/classic-midi-dress.jpg',
      '/images/categories/dresses.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Cream', hex: '#EAE3D8' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Spring Atelier 2026',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 41
  },
  {
    id: 'W005',
    slug: 'minimal-knit-top',
    name: 'Minimal Knit Top',
    gender: 'women',
    category: "Women's Tops",
    subcategory: 'Tops',
    description: 'A 16-gauge micro-ribbed knit top in mercerized cotton with a mock neck and clean-finished armholes.',
    details: [
      'Fine 16-gauge mercerised cotton with silk touch finish',
      'Refined micro-rib stitch with excellent recovery',
      'Fitted silhouette that tucks smoothly into high-waist trousers',
      'Ribbed neckline, hem and armhole trims'
    ],
    fabricAndCare: '85% Mercerised Cotton, 15% Silk. Hand wash cold. Dry flat on clean towel. Store folded.',
    deliveryInfo: 'Fast dispatch within 24 hours. Free exchanges for size.',
    price: 1399,
    originalPrice: 1799,
    image: '/images/women/minimal-knit-top.jpg',
    gallery: [
      '/images/women/minimal-knit-top.jpg',
      '/images/categories/women.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Warm Ivory', hex: '#F5F1EA' },
      { name: 'Taupe', hex: '#A99A87' },
      { name: 'Black', hex: '#171717' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 29
  },
  {
    id: 'W006',
    slug: 'structured-blazer',
    name: 'Structured Blazer',
    gender: 'women',
    category: "Women's Outerwear",
    subcategory: 'Outerwear',
    description: 'A tailored single-breasted blazer with clean notched lapels, softly padded shoulders, and a relaxed straight cut inspired by menswear tailoring.',
    details: [
      'Mid-weight structured wool blend with subtle twill texture',
      'Single horn-effect button closure with minimalist sleeve cuffs',
      'Interior piped seams with 100% cupro lining',
      'Dual flap pockets and tailored chest welt pocket'
    ],
    fabricAndCare: '55% Wool, 45% Polyester; Lining: 100% Cupro. Specialist dry clean only.',
    deliveryInfo: 'Ships in custom garment bag with branded hanger. Free shipping included.',
    price: 3699,
    originalPrice: 4499,
    image: '/images/women/structured-blazer.jpg',
    gallery: [
      '/images/women/structured-blazer.jpg',
      '/images/women/sculpted-wool-blazer.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Atelier Tailoring',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 33
  },
  {
    id: 'W007',
    slug: 'everyday-straight-fit-jeans',
    name: 'Everyday Straight-Fit Jeans',
    gender: 'women',
    category: "Women's Jeans",
    subcategory: 'Jeans',
    description: 'Crafted from authentic 13.5 oz organic denim with just a hint of comfort stretch. Cut with a high waist and a clean, straight leg that breaks softly over boots or sandals.',
    details: [
      '98% Organic cotton, 2% Recycled elastane',
      'Classic 5-pocket construction with antique brass rivets',
      'Zip fly with custom ÉLVARA engraved shank button',
      'Subtle vintage rinse free of harsh chemical distressing'
    ],
    fabricAndCare: 'Machine wash inside out in cold water. Hang to air dry. Wash sparingly to maintain denim character.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999.',
    price: 2199,
    originalPrice: 2699,
    image: '/images/women/everyday-straight-fit-jeans.jpg',
    gallery: [
      '/images/women/everyday-straight-fit-jeans.jpg'
    ],
    sizes: ['26', '28', '30', '32', '34'],
    colors: [
      { name: 'Vintage Blue', hex: '#4B6B94' },
      { name: 'Washed Black', hex: '#2A2926' },
      { name: 'Ecru', hex: '#ECE8DF' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 57
  },
  {
    id: 'W008',
    slug: 'pleated-midi-skirt',
    name: 'Pleated Midi Skirt',
    gender: 'women',
    category: "Women's Skirts",
    subcategory: 'Skirts',
    description: 'Precision knife-pleated midi skirt engineered to hold its shape. Features permanent heat-set pleats and an elasticated grosgrain waistband.',
    details: [
      'Permanent heat-set sharp pleats in fine twill',
      'Comfort-stretch concealed inner waist band',
      'Falls gracefully to mid-calf length',
      'Lightweight fluid motion with every stride'
    ],
    fabricAndCare: '100% Recycled Technical Twill. Gentle machine wash in mesh bag. Do not iron pleats directly.',
    deliveryInfo: 'Delivered in 3–5 business days. Complimentary shipping available.',
    price: 1999,
    originalPrice: 2499,
    image: '/images/women/pleated-midi-skirt.jpg',
    gallery: [
      '/images/women/pleated-midi-skirt.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Cream', hex: '#EAE3D8' },
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Spring Atelier 2026',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 19
  },
  {
    id: 'W009',
    slug: 'cashmere-trench-coat',
    name: 'Cashmere Trench Coat',
    gender: 'women',
    category: "Women's Outerwear",
    subcategory: 'Outerwear',
    description: 'A luxurious drape trench cut from an ultra-soft wool-cashmere blend. Features wide storm flaps, storm collar, and a self-fabric tie belt for defined silhouette.',
    details: [
      '75% Superfine Wool, 25% Cashmere',
      'Double-breasted storm flap with tonal horn buttons',
      'Full inner cupro lining with piped interior pocket',
      'Raglan sleeves allowing effortless layering over chunky knitwear'
    ],
    fabricAndCare: 'Wool & Cashmere. Specialist dry clean only. Store on wooden hanger in breathable garment cover.',
    deliveryInfo: 'Complimentary white-glove courier shipping included on all outerwear.',
    price: 4299,
    originalPrice: 5299,
    image: '/images/women/cashmere-trench-coat.jpg',
    gallery: [
      '/images/women/cashmere-trench-coat.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Atelier Tailoring',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 24
  },
  {
    id: 'W010',
    slug: 'ribbed-knit-cardigan',
    name: 'Ribbed Knit Cardigan',
    gender: 'women',
    category: "Women's Knitwear",
    subcategory: 'Knitwear',
    description: 'A 7-gauge organic cotton cardigan with a V-neckline, tortoiseshell buttons, and a slightly cropped hem.',
    details: [
      'Pure organic combed cotton in a chunky 7-gauge fisherman rib',
      'Dropped shoulder seam with generous sleeves',
      'Wide ribbed hem band and cuffs that resist stretching',
      'Versatile as a standalone top or buttoned over camisoles'
    ],
    fabricAndCare: '100% Organic Cotton. Gentle hand wash cold. Dry flat. Never hang on a hanger.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999.',
    price: 1899,
    originalPrice: 2399,
    image: '/images/women/ribbed-knit-cardigan.jpg',
    gallery: [
      '/images/women/ribbed-knit-cardigan.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Ivory', hex: '#F5F1EA' },
      { name: 'Taupe', hex: '#A99A87' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 46
  },
  {
    id: 'W011',
    slug: 'silk-slip-dress',
    name: 'Silk Slip Dress',
    gender: 'women',
    category: "Women's Dresses",
    subcategory: 'Dresses',
    description: 'Cut on the bias for a liquid drape that glides over contours. Made from heavyweight sand-washed silk satin with a delicate cowl neckline and adjustable slim straps.',
    details: [
      '100% Sandwashed Mulberry Silk (22 momme weight)',
      'Graceful bias cut contours naturally without cling',
      'Subtle low back with French seam finishing throughout',
      'Ankle-grazing length with refined side vent'
    ],
    fabricAndCare: '100% Silk. Dry clean or gentle cool hand wash with specialized silk detergent. Iron inside out on low heat.',
    deliveryInfo: 'Express priority dispatch within 24 hours. Free returns within 15 days.',
    price: 3299,
    originalPrice: 3999,
    image: '/images/women/silk-slip-dress.jpg',
    gallery: [
      '/images/women/silk-slip-dress.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Cream', hex: '#EAE3D8' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Spring Atelier 2026',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 18
  },
  {
    id: 'W012',
    slug: 'high-rise-wool-trousers',
    name: 'High-Rise Wool Trousers',
    gender: 'women',
    category: "Women's Trousers",
    subcategory: 'Trousers',
    description: 'Refined straight-tapered trousers in fine tropical wool. Designed with crisp pressed front creases, side tab adjusters, and hidden interior pocketing.',
    details: [
      '100% Breathable tropical virgin wool woven in Italy',
      'Waist adjusters with polished gunmetal buckles',
      'Front zip fly with horn button tab closure',
      'Fully taped interior seams for all-day comfort'
    ],
    fabricAndCare: '100% Virgin Wool. Dry clean only. Steaming refreshes fabric between wears.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999.',
    price: 2599,
    originalPrice: 3299,
    image: '/images/women/high-rise-wool-trousers.jpg',
    gallery: [
      '/images/women/high-rise-wool-trousers.jpg'
    ],
    sizes: ['26', '28', '30', '32'],
    colors: [
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Sand', hex: '#D5C7B5' }
    ],
    inStock: true,
    collection: 'Atelier Tailoring',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 31
  },
  {
    id: 'W013',
    slug: 'oversized-poplin-shirt',
    name: 'Oversized Poplin Shirt',
    gender: 'women',
    category: "Women's Shirts",
    subcategory: 'Shirts',
    description: 'An oversized shirt in organic cotton poplin with dropped shoulders, a chest patch pocket, and a curved hem.',
    details: [
      'Crisp 100% organic cotton poplin',
      'Generous exaggerated silhouette with dropped shoulders',
      'Deep cuff detail with dual button adjustment',
      'Chest patch pocket with clean double-stitched perimeter'
    ],
    fabricAndCare: '100% Cotton. Machine wash delicate. Line dry in shade.',
    deliveryInfo: 'Ships within 2 business days.',
    price: 1799,
    originalPrice: 2299,
    image: '/images/women/oversized-poplin-shirt.jpg',
    gallery: [
      '/images/women/oversized-poplin-shirt.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pure White', hex: '#FAF9F6' },
      { name: 'Sand', hex: '#D5C7B5' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: false,
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 22
  },
  {
    id: 'W014',
    slug: 'wrap-linen-dress',
    name: 'Wrap Linen Dress',
    gender: 'women',
    category: "Women's Dresses",
    subcategory: 'Dresses',
    description: 'A wrap dress made from midweight Belgian flax linen with an interior tie, kimono-style sleeves, and deep on-seam side pockets.',
    details: [
      '100% Pure certified Belgian flax linen',
      'True wrap construction with tailored interior safety button',
      'Side seam pockets deep enough for phone and cardholder',
      'Unlined and breathable for supreme summer comfort'
    ],
    fabricAndCare: '100% Linen. Gentle machine wash in cold water. Reshape while damp.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999.',
    price: 2699,
    originalPrice: 3399,
    image: '/images/women/wrap-linen-dress.jpg',
    gallery: [
      '/images/women/wrap-linen-dress.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Warm Ivory', hex: '#F5F1EA' },
      { name: 'Taupe', hex: '#A99A87' }
    ],
    inStock: true,
    collection: 'Spring Atelier 2026',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 16
  },

  // ==========================================
  // MEN'S COLLECTION (Strictly Men's Fashion)
  // ==========================================
  {
    id: 'M001',
    slug: 'essential-oxford-shirt',
    name: 'Essential Oxford Shirt',
    gender: 'men',
    category: "Men's Shirts",
    subcategory: 'Shirts',
    description: 'A button-down shirt cut from heavy organic cotton Oxford cloth with mother-of-pearl buttons, a chest pocket, and a rear box pleat.',
    details: [
      '100% GOTS-certified organic cotton heavy Oxford weave',
      'Reinforced button-down collar with natural roll',
      'Rear box pleat with authentic locker loop',
      'Single rounded chest pocket and curved hemline'
    ],
    fabricAndCare: '100% Cotton. Warm machine wash. Tumble dry low or line dry in shade. Warm steam iron.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999. Fast delivery in 3–5 days.',
    price: 1999,
    originalPrice: 2599,
    image: '/images/men/essential-oxford-shirt.jpg',
    gallery: [
      '/images/men/essential-oxford-shirt.jpg',
      '/images/categories/men.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pure White', hex: '#FAF9F6' },
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 78
  },
  {
    id: 'M002',
    slug: 'relaxed-cotton-tee',
    name: 'Relaxed Cotton T-Shirt',
    gender: 'men',
    category: "Men's T-Shirts",
    subcategory: 'T-Shirts',
    description: 'Knitted from premium 240 GSM combed organic cotton with a dry, substantial hand feel. Designed with a structured ribbed crew collar that never sags after washing.',
    details: [
      '240 GSM heavyweight combed organic cotton jersey',
      'Reinforced 1x1 rib collar with twin-needle collar topstitching',
      'Slightly dropped shoulder for a contemporary drape',
      'Pre-shrunk fabric ensuring true-to-size wash durability'
    ],
    fabricAndCare: '100% Combed Organic Cotton. Machine wash cold with like colors. Do not bleach.',
    deliveryInfo: 'Express delivery across India. Free shipping over ₹2,999.',
    price: 999,
    originalPrice: 1299,
    image: '/images/men/relaxed-cotton-tee.jpg',
    gallery: [
      '/images/men/relaxed-cotton-tee.jpg',
      '/images/men/minimal-heavyweight-tee.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Warm Ivory', hex: '#F5F1EA' },
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Taupe', hex: '#A99A87' },
      { name: 'Black', hex: '#171717' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 114
  },
  {
    id: 'M003',
    slug: 'tailored-wide-leg-trousers-men',
    name: 'Tailored Wide-Leg Trousers',
    gender: 'men',
    category: "Men's Trousers",
    subcategory: 'Trousers',
    description: 'Tailored trousers in a wool-viscose blend with forward front pleats, an extension waistband, and a straight-leg drape.',
    details: [
      'Super 110s virgin wool and technical viscose blend',
      'Single forward pleat for ease of movement and sharp silhouette',
      'Concealed extension waistband with hook-and-bar fastening',
      'Corozo button-through back welt pockets'
    ],
    fabricAndCare: '60% Wool, 38% Viscose, 2% Elastane. Specialist dry clean only.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999.',
    price: 2599,
    originalPrice: 3299,
    image: '/images/men/tailored-wide-leg-trousers.jpg',
    gallery: [
      '/images/men/tailored-wide-leg-trousers.jpg'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Black', hex: '#171717' }
    ],
    inStock: true,
    collection: 'Atelier Tailoring',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 49
  },
  {
    id: 'M004',
    slug: 'minimalist-knit-polo',
    name: 'Minimalist Knit Polo',
    gender: 'men',
    category: "Men's Knitwear",
    subcategory: 'Knitwear',
    description: 'A knit polo in 14-gauge Italian merino wool and silk with an open spread collar and ribbed hems.',
    details: [
      '70% Extrafine Merino Wool, 30% Mulberry Silk',
      'Buttonless johnny collar with clean ribbed edges',
      'Ribbed hem and sleeve cuffs with subtle structure',
      'Breathable, temperature-regulating natural knit'
    ],
    fabricAndCare: 'Hand wash cool with wool-safe wash. Dry flat. Never hang or wring.',
    deliveryInfo: 'Dispatched within 24 hours in luxury recyclable packaging.',
    price: 2299,
    originalPrice: 2899,
    image: '/images/men/minimalist-knit-polo.jpg',
    gallery: [
      '/images/men/minimalist-knit-polo.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#EAE3D8' },
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Taupe', hex: '#A99A87' }
    ],
    inStock: true,
    collection: 'Spring Atelier 2026',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 35
  },
  {
    id: 'M005',
    slug: 'structured-overshirt',
    name: 'Structured Overshirt',
    gender: 'men',
    category: "Men's Overshirts",
    subcategory: 'Overshirts',
    description: 'An overshirt cut from 320 GSM combed cotton twill with dual chest flap pockets, horn buttons, and reinforced side gussets.',
    details: [
      '100% Heavyweight combed cotton twill',
      'Oversized chest patch pockets with concealed buttons',
      'Straight cut hem with side seam split',
      'Garment dyed for rich color depth and softened touch'
    ],
    fabricAndCare: '100% Cotton. Machine wash 30°C. Do not tumble dry. Warm iron.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999.',
    price: 2399,
    originalPrice: 2999,
    image: '/images/men/structured-overshirt.jpg',
    gallery: [
      '/images/men/structured-overshirt.jpg',
      '/images/men/corduroy-overshirt.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Taupe', hex: '#A99A87' },
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Sand', hex: '#D5C7B5' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 58
  },
  {
    id: 'M006',
    slug: 'everyday-straight-fit-denim',
    name: 'Everyday Straight-Fit Denim',
    gender: 'men',
    category: "Men's Jeans",
    subcategory: 'Jeans',
    description: 'Straight-leg jeans cut from 14 oz ring-spun cotton denim with solid copper rivets, a button fly, and chain-stitched hems.',
    details: [
      '100% Long-staple ring-spun cotton denim',
      'Solid copper hardware and reinforced stress points',
      'Button fly closure with custom ÉLVARA shank buttons',
      'Chain-stitched hem and waistband'
    ],
    fabricAndCare: 'Wash cold inside out. Hang dry. Indigo may transfer during early wears.',
    deliveryInfo: 'Standard delivery in 3–5 business days.',
    price: 2199,
    originalPrice: 2799,
    image: '/images/men/everyday-straight-fit-denim.jpg',
    gallery: [
      '/images/men/everyday-straight-fit-denim.jpg',
      '/images/men/raw-denim-jean.jpg'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Indigo Rinse', hex: '#263852' },
      { name: 'Washed Black', hex: '#2A2926' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 63
  },
  {
    id: 'M007',
    slug: 'relaxed-blazer',
    name: 'Relaxed Blazer',
    gender: 'men',
    category: "Men's Jackets",
    subcategory: 'Jackets',
    description: 'An unstructured two-button jacket in washed linen-cotton with soft unpadded shoulders, dual patch pockets, and an unlined interior.',
    details: [
      'Italian washed linen-cotton blend with subtle slub texture',
      'Completely unstructured chest with zero canvas padding',
      'Two-button front with natural horn buttons',
      'Dual patch hip pockets and barchetta breast pocket'
    ],
    fabricAndCare: '55% Linen, 45% Cotton. Dry clean only.',
    deliveryInfo: 'Includes branded wooden hanger and garment travel bag. Free shipping.',
    price: 3899,
    originalPrice: 4799,
    image: '/images/men/relaxed-blazer.jpg',
    gallery: [
      '/images/men/relaxed-blazer.jpg',
      '/images/men/tailored-suit-jacket.jpg'
    ],
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Atelier Tailoring',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 27
  },
  {
    id: 'M008',
    slug: 'premium-knit-sweater',
    name: 'Premium Knit Sweater',
    gender: 'men',
    category: "Men's Knitwear",
    subcategory: 'Knitwear',
    description: 'Crafted from 100% fine Scottish lambswool spun into a clean crewneck pullover with substantial warmth without heavy bulk.',
    details: [
      '100% Pure Geelong Lambswool',
      'Saddle shoulder construction for ergonomic ease',
      'Chunky ribbed collar, cuffs, and hem',
      'Naturally odor-resistant and breathable'
    ],
    fabricAndCare: '100% Wool. Hand wash cold. Dry flat on a clean towel.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999.',
    price: 2499,
    originalPrice: 3199,
    image: '/images/men/premium-knit-sweater.jpg',
    gallery: [
      '/images/men/premium-knit-sweater.jpg',
      '/images/men/cashmere-crewneck.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#EAE3D8' },
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Taupe', hex: '#A99A87' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 42
  },
  {
    id: 'M009',
    slug: 'classic-wool-overcoat',
    name: 'Classic Wool Overcoat',
    gender: 'men',
    category: "Men's Outerwear",
    subcategory: 'Outerwear',
    description: 'A timeless single-breasted overcoat tailored in double-faced virgin wool. Features clean fly-front buttoning, notch lapels, and deep hand-warmer welt pockets.',
    details: [
      '80% Virgin Wool, 20% Polyamide for structure and longevity',
      'Concealed placket closure with genuine horn buttons',
      'Deep centre back vent allowing full stride comfort',
      'Interior passport pocket with button closure'
    ],
    fabricAndCare: 'Wool blend. Specialist dry clean only.',
    deliveryInfo: 'Complimentary priority courier shipping across India.',
    price: 4399,
    originalPrice: 5499,
    image: '/images/men/classic-wool-overcoat.jpg',
    gallery: [
      '/images/men/classic-wool-overcoat.jpg'
    ],
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Sand', hex: '#D5C7B5' }
    ],
    inStock: true,
    collection: 'Atelier Tailoring',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 19
  },
  {
    id: 'M010',
    slug: 'minimal-heavyweight-tee',
    name: 'Minimal Heavyweight Tee',
    gender: 'men',
    category: "Men's T-Shirts",
    subcategory: 'T-Shirts',
    description: 'A boxy tee cut from dry-hand 280 GSM carded organic cotton with a 3cm ribbed crew collar.',
    details: [
      '280 GSM heavy carded organic cotton',
      'Thick 3cm ribbed crew collar',
      'Boxy modern fit with wide sleeves',
      'Pre-washed to resist twisting and shrinkage'
    ],
    fabricAndCare: '100% Organic Cotton. Machine wash warm. Air dry.',
    deliveryInfo: 'Fast dispatch within 24 hours.',
    price: 1199,
    originalPrice: 1499,
    image: '/images/men/minimal-heavyweight-tee.jpg',
    gallery: [
      '/images/men/minimal-heavyweight-tee.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Warm Ivory', hex: '#F5F1EA' },
      { name: 'Black', hex: '#171717' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 89
  },
  {
    id: 'M011',
    slug: 'italian-cotton-chinos',
    name: 'Italian Cotton Chinos',
    gender: 'men',
    category: "Men's Trousers",
    subcategory: 'Trousers',
    description: 'Tailored in an ultra-fine Italian cotton twill with gentle enzyme wash. Features a comfortable mid-rise and gently tapered leg.',
    details: [
      '97% Italian cotton twill, 3% elastane for comfort',
      'Split rear waistband for easy alterations',
      'Slanted side pockets and buttoned back jetted pockets',
      'Curtain waistband interior'
    ],
    fabricAndCare: 'Cotton blend. Machine wash delicate at 30°C.',
    deliveryInfo: 'Complimentary shipping on orders above ₹2,999.',
    price: 2199,
    originalPrice: 2799,
    image: '/images/men/italian-cotton-chinos.jpg',
    gallery: [
      '/images/men/italian-cotton-chinos.jpg'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Taupe', hex: '#A99A87' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: false,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 38
  },
  {
    id: 'M012',
    slug: 'cashmere-crewneck',
    name: 'Cashmere Crewneck',
    gender: 'men',
    category: "Men's Knitwear",
    subcategory: 'Knitwear',
    description: 'Spun from pure Grade-A Mongolian cashmere. Exceptionally soft, lightweight, yet wonderfully insulating against winter chills.',
    details: [
      '100% 2-ply Mongolian cashmere',
      'Tubular knit trims at neck, cuffs, and hem',
      'Naturally breathable and temperature-regulating',
      'Pill-resistant yarn treatment'
    ],
    fabricAndCare: '100% Cashmere. Hand wash cold or specialist dry clean. Lay flat to dry.',
    deliveryInfo: 'Complimentary shipping across India.',
    price: 3199,
    originalPrice: 3999,
    image: '/images/men/cashmere-crewneck.jpg',
    gallery: [
      '/images/men/cashmere-crewneck.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Ivory', hex: '#F5F1EA' },
      { name: 'Cream', hex: '#EAE3D8' },
      { name: 'Taupe', hex: '#A99A87' }
    ],
    inStock: true,
    collection: 'Spring Atelier 2026',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 22
  },
  {
    id: 'M013',
    slug: 'corduroy-overshirt',
    name: 'Corduroy Overshirt',
    gender: 'men',
    category: "Men's Overshirts",
    subcategory: 'Overshirts',
    description: 'Crafted from a rich 12-wale organic cotton corduroy with a velvety hand. Works equally well buttoned as a lightweight jacket or unbuttoned over a t-shirt.',
    details: [
      '100% Organic cotton corduroy',
      'Dual chest utility pockets with flap closure',
      'Straight cut hem with curved side slits',
      'Tonal corozo buttons'
    ],
    fabricAndCare: '100% Cotton. Machine wash cold, inside out. Hang dry.',
    deliveryInfo: 'Delivered in 3–5 business days.',
    price: 2299,
    originalPrice: 2899,
    image: '/images/men/corduroy-overshirt.jpg',
    gallery: [
      '/images/men/corduroy-overshirt.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Taupe', hex: '#A99A87' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: false,
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 17
  },
  {
    id: 'M014',
    slug: 'raw-denim-jean',
    name: 'Raw Denim Jean',
    gender: 'men',
    category: "Men's Jeans",
    subcategory: 'Jeans',
    description: 'Unwashed 14 oz rigid raw selvedge denim that molds to your body and creates bespoke fading patterns with every wear.',
    details: [
      '100% Zimbabwe long-staple cotton',
      'Redline selvedge ID on interior outseam',
      'Hidden back pocket rivets',
      'Heavy duty pocket bags'
    ],
    fabricAndCare: 'Wear raw for 6 months before first cold soak. Line dry.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999.',
    price: 2499,
    originalPrice: 3199,
    image: '/images/men/raw-denim-jean.jpg',
    gallery: [
      '/images/men/raw-denim-jean.jpg'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Raw Indigo', hex: '#1C2833' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: false,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 39
  },

  // ==========================================
  // ACCESSORIES (Bags, Belts, Scarves, Footwear)
  // ==========================================
  {
    id: 'A001',
    slug: 'minimal-leather-belt',
    name: 'Minimal Leather Belt',
    gender: 'unisex',
    category: 'Accessories',
    subcategory: 'Belts',
    description: 'A 30mm belt cut from full-grain Tuscan vegetable-tanned leather with a brushed solid brass buckle and beveled wax edges.',
    details: [
      '30mm width, ideal for both denim loops and tailored trousers',
      'Full-grain Italian vegetable-tanned leather that patinas with age',
      'Solid brass buckle with satin nickel plating',
      'Beveled and waxed edges for longevity'
    ],
    fabricAndCare: '100% Genuine Leather. Treat with neutral leather balm periodically.',
    deliveryInfo: 'Includes cotton dust pouch. Free shipping on orders over ₹2,999.',
    price: 1299,
    originalPrice: 1699,
    image: '/images/accessories/minimal-leather-belt.jpg',
    gallery: [
      '/images/accessories/minimal-leather-belt.jpg'
    ],
    sizes: ['80cm (30")', '85cm (32")', '90cm (34")', '95cm (36")'],
    colors: [
      { name: 'Cognac Brown', hex: '#6E472B' },
      { name: 'Onyx Black', hex: '#171717' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 74
  },
  {
    id: 'A002',
    slug: 'structured-everyday-bag',
    name: 'Structured Everyday Bag',
    gender: 'unisex',
    category: 'Accessories',
    subcategory: 'Bags',
    description: 'A structured shoulder bag in Italian calf leather with a magnetic fold-over closure, wide adjustable strap, and an interior zip pocket.',
    details: [
      'Smooth Italian calf leather with micro-grain finish',
      'Custom gold-finish magnetic lock hardware',
      'Interior zip compartment and dedicated smartphone slip pocket',
      'Reinforced bottom panel with metal protective feet'
    ],
    fabricAndCare: '100% Italian Leather; Lining: 100% Cotton Twill. Store in provided dust bag.',
    deliveryInfo: 'Complimentary insured shipping across India.',
    price: 2999,
    originalPrice: 3899,
    image: '/images/accessories/structured-everyday-bag.jpg',
    gallery: [
      '/images/accessories/structured-everyday-bag.jpg',
      '/images/categories/accessories.jpg'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Black', hex: '#171717' }
    ],
    inStock: true,
    collection: 'Spring Atelier 2026',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 43
  },
  {
    id: 'A003',
    slug: 'classic-cardholder-wallet',
    name: 'Classic Cardholder Wallet',
    gender: 'unisex',
    category: 'Accessories',
    subcategory: 'Wallets',
    description: 'An ultra-slim profile card case featuring four exterior card slots and a central bill fold compartment. Debossed with the discrete ÉLVARA logomark.',
    details: [
      'Full grain vegetable-tanned calfskin leather',
      'Four dedicated card slots with reinforced stitching',
      'Central slot lined for folded currency notes',
      'RFID blocking inner protective layer'
    ],
    fabricAndCare: 'Genuine Leather. Keep away from water and direct heat.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999.',
    price: 799,
    originalPrice: 999,
    image: '/images/accessories/classic-wallet.jpg',
    gallery: [
      '/images/accessories/classic-wallet.jpg'
    ],
    sizes: ['One Size (10cm x 7.5cm)'],
    colors: [
      { name: 'Charcoal', hex: '#34332F' },
      { name: 'Taupe', hex: '#A99A87' },
      { name: 'Black', hex: '#171717' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 95
  },
  {
    id: 'A004',
    slug: 'minimalist-cashmere-scarf',
    name: 'Minimalist Cashmere Scarf',
    gender: 'unisex',
    category: 'Accessories',
    subcategory: 'Scarves',
    description: 'Woven from featherlight 100% Himalayan cashmere with delicate eyelash fringe edges. Generous length for versatile styling.',
    details: [
      '100% Pure Mongolian & Himalayan Cashmere',
      'Delicate eyelash fringe on shorter ends',
      '200cm length x 70cm width',
      'Weightless insulation and cloud-soft hand feel'
    ],
    fabricAndCare: '100% Cashmere. Specialist dry clean or delicate cold hand wash.',
    deliveryInfo: 'Includes branded gift box. Free shipping over ₹2,999.',
    price: 1999,
    originalPrice: 2499,
    image: '/images/accessories/minimalist-scarf.jpg',
    gallery: [
      '/images/accessories/minimalist-scarf.jpg'
    ],
    sizes: ['One Size (200 x 70 cm)'],
    colors: [
      { name: 'Warm Ivory', hex: '#F5F1EA' },
      { name: 'Taupe', hex: '#A99A87' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Spring Atelier 2026',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 31
  },
  {
    id: 'A005',
    slug: 'handcrafted-leather-loafers',
    name: 'Handcrafted Leather Loafers',
    gender: 'unisex',
    category: 'Accessories',
    subcategory: 'Footwear',
    description: 'Minimalist penny loafers with almond toe shaping and supple leather soles. Blake-stitched construction ensures longevity and resoleability.',
    details: [
      'Full grain boxcalf leather with subtle luster',
      'Blake-stitched natural leather sole with rubber heel cap',
      'Supple goat leather lining and cushioned footbed',
      'Hand-finished edge stained trim'
    ],
    fabricAndCare: '100% Leather. Polish with wax shoe cream. Use cedar shoe trees.',
    deliveryInfo: 'Ships in bespoke shoebox with cotton travel dust covers.',
    price: 3499,
    originalPrice: 4299,
    image: '/images/accessories/leather-loafers.jpg',
    gallery: [
      '/images/accessories/leather-loafers.jpg'
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Black', hex: '#171717' },
      { name: 'Deep Espresso', hex: '#3B2F2F' }
    ],
    inStock: true,
    collection: 'Atelier Tailoring',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 26
  },
  {
    id: 'A006',
    slug: 'architectural-canvas-tote',
    name: 'Architectural Canvas Tote',
    gender: 'unisex',
    category: 'Accessories',
    subcategory: 'Bags',
    description: 'Cut from substantial 18 oz waterproof organic cotton duck canvas with bridle leather trim and reinforced base for work and weekend travel.',
    details: [
      '18 oz Waxed organic cotton canvas with vegetable-tanned leather handles',
      'Fits up to a 16-inch laptop in dedicated padded sleeve',
      'Internal zippered security pocket and brass key lanyard',
      'Reinforced box-stitched handles designed to carry heavy loads comfortably'
    ],
    fabricAndCare: 'Waxed Canvas & Leather. Spot clean with cold damp cloth. Do not wash.',
    deliveryInfo: 'Complimentary shipping across India on orders above ₹2,999.',
    price: 1899,
    originalPrice: 2399,
    image: '/images/accessories/architectural-tote.jpg',
    gallery: [
      '/images/accessories/architectural-tote.jpg'
    ],
    sizes: ['One Size (42cm x 36cm x 14cm)'],
    colors: [
      { name: 'Sand', hex: '#D5C7B5' },
      { name: 'Charcoal', hex: '#34332F' }
    ],
    inStock: true,
    collection: 'Core Essentials',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 54
  }
];

export const categoriesData = [
  {
    id: 'women',
    name: 'Women',
    gender: 'women' as const,
    route: '/collections/women',
    image: '/images/categories/women.jpg',
    count: '14 Styles',
    description: 'Considered silhouettes, delicate drapes, and modern tailoring designed for women.'
  },
  {
    id: 'men',
    name: 'Men',
    gender: 'men' as const,
    route: '/collections/men',
    image: '/images/categories/men.jpg',
    count: '14 Styles',
    description: 'Clean architectural essentials, relaxed shirts, and timeless everyday staples.'
  },
  {
    id: 'shirts',
    name: 'Shirts',
    route: '/collections/women?category=Women%27s+Shirts',
    image: '/images/categories/shirts.jpg',
    count: '7 Styles',
    description: 'Pure French linen, organic poplin, and heavyweight Oxford button-downs.'
  },
  {
    id: 'dresses',
    name: 'Dresses',
    route: '/collections/women?category=Women%27s+Dresses',
    image: '/images/categories/dresses.jpg',
    count: '4 Styles',
    description: 'Column midi dresses, sand-washed silk slips, and breezy wrap linen dresses.'
  },
  {
    id: 'trousers',
    name: 'Trousers',
    route: '/collections/women?category=Women%27s+Trousers',
    image: '/images/categories/trousers.jpg',
    count: '6 Styles',
    description: 'Fluid wide-leg trousers, tailored pleats, and Italian twill chinos.'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    route: '/collections/accessories',
    image: '/images/categories/accessories.jpg',
    count: '6 Styles',
    description: 'Handcrafted Tuscan leather belts, structured totes, and pure cashmere scarves.'
  }
];

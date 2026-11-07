# ÉLVARA — Timeless by Design
### Premium Contemporary Fashion E-Commerce Web Application

**ÉLVARA** is a complete, deployable, accessible-premium contemporary fashion e-commerce web application. Designed around clean architectural lines, minimalist luxury, Cormorant Garamond typography, and EKON-inspired cinematic motion design.

---

## 1. Brand Identity & Visual Language

- **Brand Name:** ÉLVARA
- **Tagline:** Timeless by Design.
- **Positioning:** Accessible Premium Contemporary Fashion.
- **Palette:**
  - Warm Ivory: `#F5F1EA`
  - Cream: `#EAE3D8`
  - Sand: `#D5C7B5`
  - Taupe: `#A99A87`
  - Charcoal: `#34332F`
  - Black: `#171717`
- **Typography:**
  - Headings: *Cormorant Garamond* / *Playfair Display*
  - Body & UI: *Inter*

---

## 2. Technical Architecture & Dependency Stewardship

The application is built on top of high-performance, modern standards:

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + `@tailwindcss/vite`
- **Routing:** React Router v7 (`react-router-dom`)
- **Motion & Interaction:** Framer Motion + GSAP
- **Icons:** Lucide React
- **State Management:** React Context API with LocalStorage persistence (`ShopContext`)
- **Build Tool:** Vite

### Dependencies Reused:
- React 19 & React-DOM
- TypeScript
- Tailwind CSS & `@tailwindcss/vite`
- React Router DOM
- Framer Motion
- GSAP
- Lucide React

No duplicate or unneeded packages were introduced.

---

## 3. Strict Gender Separation & Catalogue Structure

- **Women's Collection (`/collections/women`):** Exclusively women's clothing (linen blouses, relaxed cotton shirts, wide-leg trousers, column midi dresses, minimal knit tops, structured blazers, denim, pleated skirts, cashmere coats, silk slip dresses). All photography exclusively features women's garments and models.
- **Men's Collection (`/collections/men`):** Exclusively men's clothing (Oxford button-downs, 240 GSM tees, tailored trousers, knit polos, twill overshirts, selvedge denim, relaxed linen blazers, Scottish lambswool knits, wool overcoats). All photography exclusively features men's garments and models.
- **Accessories (`/collections/accessories`):** Full-grain Italian leather belts, structured shoulder bags, cardholders, cashmere scarves, handcrafted leather loafers, and waxed canvas totes.
- **New Arrivals (`/collections/new-arrivals`):** Strictly the latest Spring Atelier 2026 pieces.
- **Query & Data Enforcement:** Filtering is enforced at the data query layer in `src/pages/CollectionPage.tsx` and `src/data/products.ts`, guaranteeing that cross-gender leakage is impossible.

---

## 4. Local Fashion Photography Assets & Manifest

All garment illustrations have been replaced with real, high-resolution fashion photography from verified licensed sources, stored locally:

```
public/
  images/
    hero/
      spring-campaign.jpg
      editorial-reveal.jpg
    categories/
      women.jpg, men.jpg, shirts.jpg, dresses.jpg, trousers.jpg, accessories.jpg
    editorial/
      less-but-better.jpg, philosophy.jpg, craftsmanship.jpg
    women/
      essential-linen-blouse.jpg
      relaxed-cotton-shirt.jpg
      tailored-wide-leg-trousers.jpg
      classic-midi-dress.jpg
      minimal-knit-top.jpg
      structured-blazer.jpg
      everyday-straight-fit-jeans.jpg
      pleated-midi-skirt.jpg
      cashmere-trench-coat.jpg
      ribbed-knit-cardigan.jpg
      silk-slip-dress.jpg
      high-rise-wool-trousers.jpg
      oversized-poplin-shirt.jpg
      wrap-linen-dress.jpg
    men/
      essential-oxford-shirt.jpg
      relaxed-cotton-tee.jpg
      tailored-wide-leg-trousers.jpg
      minimalist-knit-polo.jpg
      structured-overshirt.jpg
      everyday-straight-fit-denim.jpg
      relaxed-blazer.jpg
      premium-knit-sweater.jpg
      classic-wool-overcoat.jpg
      minimal-heavyweight-tee.jpg
      italian-cotton-chinos.jpg
      cashmere-crewneck.jpg
      corduroy-overshirt.jpg
      raw-denim-jean.jpg
    accessories/
      minimal-leather-belt.jpg
      structured-everyday-bag.jpg
      classic-wallet.jpg
      minimalist-scarf.jpg
      leather-loafers.jpg
      architectural-tote.jpg
```

Every product is mapped in the central manifest `src/data/imageManifest.ts`.

---

## 5. Realistic Indian Market Pricing (INR)

- T-shirts: ₹999 – ₹1,199
- Shirts: ₹1,799 – ₹2,199
- Trousers & Jeans: ₹2,199 – ₹2,599
- Dresses: ₹2,699 – ₹3,299
- Knitwear: ₹1,899 – ₹3,199
- Outerwear & Blazers: ₹3,699 – ₹4,399
- Accessories: ₹799 – ₹3,499
- **Free Shipping Threshold:** Complimentary shipping on orders above ₹2,999 (standard delivery ₹199 otherwise).

---

## 6. Motion Design (EKON-Inspired)

- **Cinematic Hero Reveal:** Clip-path transition, subtle scale effect, and staggered typography entrance.
- **Typography Marquee:** Infinite horizontal ticker (`TIMELESS BY DESIGN • THE ART OF EVERYDAY LIVING • LESS, BUT BETTER`).
- **Interactive Image Zoom:** Micro-coordinate hover zoom on product detail stage.
- **Smooth Drawers:** Spring physics animated Cart Drawer, Search Overlay, and Mobile Navigation.
- **Micro-Interactions:** Heart tap wishlist animations, Quick Add feedback, and shipping threshold progress fill.

---

## 7. Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

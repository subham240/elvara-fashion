import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/search/SearchModal';
import { BrandIntroAnimation } from './components/common/BrandIntroAnimation';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SearchPage } from './pages/SearchPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { AccountPage } from './pages/AccountPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [pageRevealed, setPageRevealed] = useState(false);

  useEffect(() => {
    // Safety fallback: ensure page is revealed smoothly after max 3.2s
    const fallback = setTimeout(() => {
      setPageRevealed(true);
    }, 3200);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <ShopProvider>
      {/* Luxury Brand Intro & Logo Reveal Animation */}
      <BrandIntroAnimation onStartReveal={() => setPageRevealed(true)} />

      <Router>
        <ScrollToTop />
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.995 }}
          animate={
            pageRevealed
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 18, scale: 0.995 }
          }
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col min-h-screen bg-[#F9EDF0] text-[#49111C]"
        >
          {/* Main Navigation Header - Centered ÉLVARA Brand */}
          <Navbar />

          {/* Interactive Drawers & Overlays */}
          <CartDrawer />
          <SearchModal />

          {/* Main Route Body */}
          <main className="flex-1">
            <Routes>
              {/* Page 1: Homepage */}
              <Route path="/" element={<HomePage />} />

              {/* Dedicated Curated Collection Routes */}
              <Route
                path="/collections/spring-atelier-2026"
                element={
                  <CollectionPage
                    collectionTarget="Spring Atelier 2026"
                    title="Spring Atelier 2026"
                    subtitle="Sculptural drapery, organic French flax linen, and fluid silhouettes designed for unhurried living."
                    bannerImage="/images/hero/spring-campaign.jpg"
                  />
                }
              />
              <Route
                path="/collections/core-essentials"
                element={
                  <CollectionPage
                    collectionTarget="Core Essentials"
                    title="Core Essentials"
                    subtitle="Enduring wardrobe foundations cut from GOTS-certified organic cotton poplin, European linen, and pure virgin wool."
                    bannerImage="/images/editorial/less-but-better.jpg"
                  />
                }
              />
              <Route
                path="/collections/atelier-tailoring"
                element={
                  <CollectionPage
                    collectionTarget="Atelier Tailoring"
                    title="Atelier Tailoring"
                    subtitle="Double-pleated trousers, architectural blazers, and virgin wool overcoats drafted with meticulous proportions."
                    bannerImage="/images/categories/men.jpg"
                  />
                }
              />
              <Route path="/collections/:collectionSlug" element={<CollectionPage />} />

              {/* Strict Gender Collection Pages */}
              <Route
                path="/collections/women"
                element={
                  <CollectionPage
                    genderTarget="women"
                    title="Women's Collection"
                    subtitle="Silhouettes crafted from organic linen, sand-washed silk, and refined tropical wool."
                    bannerImage="/images/categories/women.jpg"
                  />
                }
              />
              <Route
                path="/collections/men"
                element={
                  <CollectionPage
                    genderTarget="men"
                    title="Men's Collection"
                    subtitle="Understated luxury tailored in substantial Oxford cloth, combed jersey, and virgin wool."
                    bannerImage="/images/categories/men.jpg"
                  />
                }
              />
              <Route
                path="/collections/accessories"
                element={
                  <CollectionPage
                    isAccessoriesOnly={true}
                    title="Leather & Accessories"
                    subtitle="Full-grain Tuscan leather belts, structured totes, and pure Himalayan cashmere scarves."
                    bannerImage="/images/categories/accessories.jpg"
                  />
                }
              />
              <Route
                path="/collections/new-arrivals"
                element={
                  <CollectionPage
                    isNewArrivalsOnly={true}
                    title="The Latest Edit"
                    subtitle="Explore newly introduced silhouettes from our Spring Atelier 2026 collection."
                    bannerImage="/images/hero/spring-campaign.jpg"
                  />
                }
              />

              {/* Product Detail Route */}
              <Route path="/products/:slug" element={<ProductDetailPage />} />

              {/* Search, Wishlist & Cart */}
              <Route path="/search" element={<SearchPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />

              {/* Story & Account */}
              <Route path="/pages/our-story" element={<OurStoryPage />} />
              <Route path="/account" element={<AccountPage />} />

              {/* Fallback redirect to home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Compact Premium Footer */}
          <Footer />
        </motion.div>
      </Router>
    </ShopProvider>
  );
}
export default App;

import React from 'react';
import { HeroCampaign } from '../components/home/HeroCampaign';
import { MarqueeBanner } from '../components/home/MarqueeBanner';
import { ShopByCategory } from '../components/home/ShopByCategory';
import { NewArrivalsCarousel } from '../components/home/NewArrivalsCarousel';
import { EditorialCampaign } from '../components/home/EditorialCampaign';
import { WomensHighlight } from '../components/home/WomensHighlight';
import { MensHighlight } from '../components/home/MensHighlight';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { BrandStorySection } from '../components/home/BrandStorySection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9EDF0]">
      {/* Hero Campaign */}
      <HeroCampaign />

      {/* Marquee Banner */}
      <MarqueeBanner />

      {/* Shop by Category */}
      <ShopByCategory />

      {/* New Arrivals: The Latest Edit Carousel */}
      <NewArrivalsCarousel />

      {/* Editorial Campaign: Less, But Better */}
      <EditorialCampaign />

      {/* Women's Collection (Strictly Women's Fashion) */}
      <WomensHighlight />

      {/* Men's Collection (Strictly Men's Fashion) */}
      <MensHighlight />

      {/* Best Sellers (Strictly Bestsellers Only) */}
      <BestSellersSection />

      {/* Brand Story: The ÉLVARA Philosophy */}
      <BrandStorySection />

      {/* Newsletter: A Little More ÉLVARA */}
      <NewsletterSection />
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OurStoryPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const commitments = [
    {
      num: 'I',
      index: '01 / FORM & POSTURE',
      title: 'Architectural Cut',
      prose:
        'Every silhouette begins with freedom of posture. By balancing calibrated drop-shoulder seams with deliberate drape and double-pleated rises, each garment accommodates natural human movement without surrendering tailored precision.',
      footnote: 'Drafted in 0.5cm tolerances in our Brahmapur, Odisha pattern studio.',
    },
    {
      num: 'II',
      index: '02 / FIBRE INTEGRITY',
      title: 'Noble Natural Fibres',
      prose:
        'We believe elegance starts in the soil and loom. We work exclusively with certified organic French flax linen, GOTS long-staple cotton poplin, and unblended virgin wools. Zero synthetic fillers, zero polyester microplastics—only textiles that soften and age gracefully.',
      footnote: 'Traceable to certified European mills and ethical cooperatives.',
    },
    {
      num: 'III',
      index: '03 / CRAFT & PERMANENCE',
      title: 'Enduring Construction',
      prose:
        'Small-batch production finished with reinforced bar-tacks, clean French interior seams, river shell buttons, and generous hem allowances for lifelong tailoring. Built to endure decades in a considered wardrobe, not a single season.',
      footnote: 'Double-needle stitching with 12 stitches per inch.',
    },
  ];

  const faqs = [
    {
      q: 'What is the shipping timeline and delivery cost?',
      a: 'We provide complimentary standard shipping on all orders above ₹2,999 across India. For orders below this threshold, a flat delivery fee of ₹199 applies. Orders are dispatched from our Brahmapur, Odisha atelier within 24–48 hours and typically arrive within 3–5 business days in metro cities and 5–7 business days pan-India.',
    },
    {
      q: 'How does your 15-day return and exchange policy work?',
      a: 'We want you to be completely confident with your fit. Items in unworn, unwashed condition with all original tags attached can be returned or exchanged within 15 days of delivery. Reverse pick-up is arranged complimentary right from your doorstep.',
    },
    {
      q: 'Where are ÉLVARA fabrics sourced and tailored?',
      a: 'Our linen is woven from organic certified French flax, our cotton poplin is GOTS-certified 80s two-ply, and our knitwear uses extrafine Australian merino and Grade-A Mongolian cashmere. Tailoring is conducted in small, audited atelier partner facilities that guarantee ethical fair-wage practices.',
    },
    {
      q: 'How do I care for my linen and wool pieces?',
      a: 'We recommend gentle machine washing in cold water or hand washing with mild pH-neutral detergent for linen and cotton shirts. For structured wool blazers and overcoats, specialist dry cleaning is recommended. Always dry knitwear flat on a clean towel to preserve elasticity.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      {/* Hero Banner */}
      <div className="relative h-[65vh] bg-[#171717] overflow-hidden">
        <img
          src="/images/editorial/philosophy.jpg"
          alt="The ÉLVARA Philosophy"
          className="w-full h-full object-cover filter brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-[#F5F1EA]">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#D5C7B5] mb-2 font-medium">
            Brand Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-wide font-light">
            Timeless by Design.
          </h1>
          <p className="text-xs sm:text-base text-[#EAE3D8] mt-4 max-w-xl font-light leading-relaxed">
            Founded with the belief that luxury is found in reduction, quiet confidence, and enduring quality.
          </p>
        </div>
      </div>

      {/* Narrative Section 1: The Origin */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block">
              Chapter I — The Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light leading-tight">
              Quiet Confidence in an Age of Excess
            </h2>
            <p className="text-sm text-[#6B6963] leading-relaxed font-light">
              Most modern clothing is built to be discarded after one season. ÉLVARA started with a direct premise: make durable, well-cut clothes from natural fabrics, sell them directly, and price them fairly.
            </p>
            <p className="text-sm text-[#6B6963] leading-relaxed font-light">
              We work directly with certified organic linen mills in France, small weaving cooperatives in India, and ethical knitters in Mongolia. By skipping middle distributors and avoiding runway markups, we use 22-momme silk, 14 oz selvedge cotton, and French-seam tailoring without five-figure prices.
            </p>
          </div>

          <div className="md:col-span-6 aspect-[4/5] bg-[#EAE3D8] overflow-hidden border border-[#D5C7B5] shadow-xs">
            <img
              src="/images/editorial/craftsmanship.jpg"
              alt="Atelier Precision"
              className="w-full h-full object-cover filter brightness-[0.95]"
            />
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Editorial Atelier Commitments (CLASSIC & LUXURY) */}
      <section className="py-24 bg-[#EAE3D8]/45 border-y border-[#D5C7B5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#A99A87] font-semibold block mb-2">
              Atelier Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#171717] font-light uppercase tracking-wide">
              The Three Sartorial Commitments
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6963] mt-3 font-light leading-relaxed">
              A considered design methodology grounded in geometric balance, pure organic fibres, and enduring construction.
            </p>
          </div>

          {/* Three Stately Editorial Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {commitments.map((item, idx) => (
              <div
                key={item.num}
                className={`space-y-4 md:pr-8 ${
                  idx < commitments.length - 1 ? 'md:border-r md:border-[#D5C7B5]' : ''
                }`}
              >
                {/* Large Roman Numeral */}
                <div className="flex items-baseline justify-between border-b border-[#D5C7B5]/60 pb-3">
                  <span className="font-serif text-3xl sm:text-4xl text-[#A99A87] font-light italic">
                    {item.num}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#A99A87] font-medium">
                    {item.index}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl text-[#171717] font-light tracking-wide pt-1">
                  {item.title}
                </h3>

                {/* Prose */}
                <p className="text-xs sm:text-sm text-[#6B6963] leading-relaxed font-light">
                  {item.prose}
                </p>

                {/* Footnote */}
                <div className="pt-3 border-t border-[#D5C7B5]/40">
                  <span className="text-[10px] text-[#A99A87] uppercase tracking-wider block font-sans">
                    {item.footnote}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Atelier Hallmark Seal */}
          <div className="mt-20 pt-8 border-t border-[#D5C7B5] flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#A99A87] text-center sm:text-left gap-3">
            <span>ÉLVARA ATELIER ARCHIVE • BRAHMAPUR, ODISHA</span>
            <span>DESIGNED FOR REPETITION & LIFELONG WEAR</span>
            <Link
              to="/collections/spring-atelier-2026"
              className="text-[#171717] hover:text-[#A99A87] font-medium flex items-center gap-1 group"
            >
              <span>Explore Current Run</span>
              <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Care, FAQs & Contact Us */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-2">
            Customer Care
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light uppercase tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#6B6963] mt-2 font-light">
            Everything you need to know about our deliveries, sizing, and atelier services.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4 divide-y divide-[#D5C7B5]">
          {faqs.map((faq, idx) => (
            <div key={idx} className="pt-4">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left py-2 group"
              >
                <span className="font-serif text-lg text-[#171717] group-hover:text-[#A99A87] transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-[#6B6963] transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-[#171717]' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="py-3 text-xs sm:text-sm text-[#6B6963] leading-relaxed font-light pr-8">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Concierge Box */}
        <div className="mt-16 bg-[#EAE3D8] border border-[#D5C7B5] p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="font-serif text-2xl text-[#171717] font-medium">Need Assistance from our Concierge?</h3>
            <p className="text-xs text-[#6B6963] mt-1 font-light">Our styling advisors are available Monday to Saturday, 10:00 AM – 7:00 PM IST.</p>
            <div className="flex flex-wrap items-center gap-6 mt-4 text-xs text-[#171717]">
              <a
                href="mailto:subhamacharya731@gmail.com"
                className="flex items-center space-x-2 font-medium hover:text-[#A99A87] transition-colors"
              >
                <Mail size={14} className="text-[#34332F]" />
                <span>subhamacharya731@gmail.com</span>
              </a>
              <a
                href="tel:6371830731"
                className="flex items-center space-x-2 font-medium hover:text-[#A99A87] transition-colors"
              >
                <Phone size={14} className="text-[#34332F]" />
                <span>+91 6371830731</span>
              </a>
              <span className="flex items-center space-x-2 font-medium">
                <MapPin size={14} className="text-[#34332F]" />
                <span>Atelier: Brahmapur, Odisha</span>
              </span>
            </div>
          </div>

          <Link
            to="/collections/spring-atelier-2026"
            className="px-8 py-3.5 bg-[#171717] text-[#F5F1EA] text-xs uppercase tracking-widest font-medium shrink-0 hover:bg-[#34332F] transition-colors"
          >
            Explore Catalogue
          </Link>
        </div>
      </section>
    </div>
  );
};

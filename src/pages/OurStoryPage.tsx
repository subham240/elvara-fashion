import React, { useState } from 'react';
import { Scissors, Feather, Shield, ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OurStoryPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is the shipping timeline and delivery cost?',
      a: 'We provide complimentary standard shipping on all orders above ₹2,999 across India. For orders below this threshold, a flat delivery fee of ₹199 applies. Orders are dispatched from our New Delhi atelier within 24–48 hours and typically arrive within 3–5 business days in metro cities and 5–7 business days pan-India.',
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
              In an era dominated by hyper-fast fashion trends and disposable garments, ÉLVARA was conceived as an intentional antidote. We craft clothing that honors timeless proportions, refined textures, and serene silhouettes.
            </p>
            <p className="text-sm text-[#6B6963] leading-relaxed font-light">
              We operate under the philosophy of accessible contemporary luxury: offering discerning individuals the craftsmanship, hand-finished detailing, and organic textile integrity of high fashion houses, priced transparently for real everyday living.
            </p>
          </div>

          <div className="md:col-span-6 aspect-[4/5] bg-[#EAE3D8] overflow-hidden border border-[#D5C7B5]">
            <img
              src="/images/editorial/craftsmanship.jpg"
              alt="Atelier Precision"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Craft & Textile Pillars */}
      <section className="py-20 bg-[#EAE3D8]/50 border-y border-[#D5C7B5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A99A87] font-semibold block mb-2">
              Our Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light uppercase tracking-wide">
              The Three Atelier Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F1EA] p-8 border border-[#D5C7B5] space-y-4">
              <div className="w-10 h-10 bg-[#EAE3D8] flex items-center justify-center border border-[#D5C7B5]">
                <Scissors size={20} className="text-[#171717]" />
              </div>
              <h3 className="font-serif text-xl text-[#171717] font-medium">1. Architectural Cuts</h3>
              <p className="text-xs text-[#6B6963] leading-relaxed font-light">
                Every silhouette is drafted to create freedom of movement without sacrificing tailoring. From our double-pleated wide trousers to our band-collar linen blouses, each pattern allows the garment to drape naturally.
              </p>
            </div>

            <div className="bg-[#F5F1EA] p-8 border border-[#D5C7B5] space-y-4">
              <div className="w-10 h-10 bg-[#EAE3D8] flex items-center justify-center border border-[#D5C7B5]">
                <Feather size={20} className="text-[#171717]" />
              </div>
              <h3 className="font-serif text-xl text-[#171717] font-medium">2. Uncompromised Fibres</h3>
              <p className="text-xs text-[#6B6963] leading-relaxed font-light">
                We believe true elegance begins in the soil and loom. We utilize certified organic flax linen, GOTS long-staple cotton poplin, sand-washed Mulberry silk, and pure virgin wools that breathe and age gracefully.
              </p>
            </div>

            <div className="bg-[#F5F1EA] p-8 border border-[#D5C7B5] space-y-4">
              <div className="w-10 h-10 bg-[#EAE3D8] flex items-center justify-center border border-[#D5C7B5]">
                <Shield size={20} className="text-[#171717]" />
              </div>
              <h3 className="font-serif text-xl text-[#171717] font-medium">3. Enduring Durability</h3>
              <p className="text-xs text-[#6B6963] leading-relaxed font-light">
                Reinforced bar-tacking, French interior seams, river shell buttons, and tailored curtain waistbands ensure every piece remains a dependable wardrobe pillar for years to come.
              </p>
            </div>
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
        <div className="mt-16 bg-[#EAE3D8] border border-[#D5C7B5] p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-[#171717] font-medium">Need Assistance from our Concierge?</h3>
            <p className="text-xs text-[#6B6963] mt-1">Our styling advisors are available Monday to Saturday, 10:00 AM – 7:00 PM IST.</p>
            <div className="flex flex-wrap items-center gap-6 mt-4 text-xs text-[#171717]">
              <span className="flex items-center space-x-1.5 font-medium">
                <Mail size={14} className="text-[#34332F]" />
                <span>concierge@elvara.com</span>
              </span>
              <span className="flex items-center space-x-1.5 font-medium">
                <Phone size={14} className="text-[#34332F]" />
                <span>+91 11 4987 2300</span>
              </span>
              <span className="flex items-center space-x-1.5 font-medium">
                <MapPin size={14} className="text-[#34332F]" />
                <span>Atelier: Lodhi Estate, New Delhi</span>
              </span>
            </div>
          </div>

          <Link
            to="/collections/women"
            className="px-8 py-3.5 bg-[#171717] text-[#F5F1EA] text-xs uppercase tracking-widest font-medium shrink-0 hover:bg-[#34332F] transition-colors"
          >
            Explore Catalogue
          </Link>
        </div>
      </section>
    </div>
  );
};

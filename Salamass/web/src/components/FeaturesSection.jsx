import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { FeatureCard } from '@/components/MarketCards.jsx';
import featuresBackground from '../../../images/backround_ccmm.jpg';

function FeaturesSection({
  features,
  badgeText = 'Tính năng',
  sectionTitle = 'Công cụ mạnh mẽ cho mọi người dùng',
  buyerTitle = 'Dành cho người mua',
  sellerTitle = 'Dành cho người bán',
  systemTitle = 'Tính năng hệ thống',
}) {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-slate-100/70 pt-0 pb-8 md:pt-1 md:pb-10"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={featuresBackground}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-white/44" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center mb-2"
        >
          <Badge className="relative -top-1 mb-2 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">{badgeText}</Badge>
          <h2 className="text-pop-up-tl text-3xl md:text-4xl lg:text-5xl font-bold mb-3" style={{ letterSpacing: '-0.02em' }}>
            {sectionTitle}
          </h2>
        </motion.div>

        <div className="relative z-10 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">{buyerTitle}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {features.buyer.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} cardClassName="shadow-xl hover:shadow-2xl" />
            ))}
          </div>
        </div>

        <div className="relative z-10 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">{sellerTitle}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {features.seller.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} cardClassName="shadow-xl hover:shadow-2xl" />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl font-semibold mb-4 text-center">{systemTitle}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
{(features.system || []).map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} cardClassName="shadow-xl hover:shadow-2xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import fallbackImage from '@/assets/hero.png';

export function FeatureCard({ icon: Icon, title, description, index = 0, cardClassName = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
      <Card className={`h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card ${cardClassName}`}>
        <CardContent className="p-6 flex flex-col h-full">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-primary" /></div>
          <h3 className="text-xl font-semibold mb-3 text-balance">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function CategoryCard({
  image,
  hoverVideo,
  title,
  description,
  productCount,
  productLabel = 'sản phẩm',
  imageClassName = '',
  index = 0,
}) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return undefined;

    const element = cardRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    if (cardRef.current) {
      cardRef.current.style.setProperty('--tilt-x', '0deg');
      cardRef.current.style.setProperty('--tilt-y', '0deg');
      cardRef.current.style.setProperty('--mx', '50%');
      cardRef.current.style.setProperty('--my', '50%');
    }
  };

  const handleMouseMove = (event) => {
    if (!cardRef.current || !mediaRef.current) return;

    const rect = mediaRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 7;

    cardRef.current.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
    cardRef.current.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    cardRef.current.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
    cardRef.current.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
  };

  return (
    <div
      ref={cardRef}
      style={{ '--stagger-delay': `${index * 130}ms` }}
      className="product-slide reveal-on-scroll"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Card className="product-card premium-product-card overflow-hidden border-none group">
        <div ref={mediaRef} className="relative h-56 overflow-hidden premium-product-media">
          <img src={image} alt={title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageClassName}`} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.17), transparent 48%)' }} />
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"><ArrowUpRight className="w-5 h-5 text-white" /></div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-balance">{title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{description}</p>
          <p className="text-primary font-medium text-sm">{productCount} {productLabel}</p>
        </CardContent>
      </Card>
    </div>
  );
}
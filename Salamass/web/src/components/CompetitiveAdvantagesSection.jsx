import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

function CompetitiveAdvantagesSection({ data }) {
  const {
    badge,
    title,
    description,
    image,
    imageAlt,
    video,
    benefits,
  } = data;

  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20 px-4 py-1.5">
            {badge}
          </Badge>

          <h2
            className="text-pop-up-tl text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            style={{ letterSpacing: '-0.02em' }}
          >
            {title}
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-justify md:text-justify text-left">
            {description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="mx-auto w-full max-w-[500px] relative group"
              style={{ height: '300px' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
    
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />

             
              {video && (
                <video
                  ref={videoRef}
                  src={video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="
                    absolute inset-0
                    w-full h-full object-cover rounded-2xl
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                  "
                />
              )}
            </div>
          </motion.div>

    
          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompetitiveAdvantagesSection;
import React from 'react';
import { motion } from 'framer-motion';

function StepCard({ number, icon: Icon, title, description, index = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative h-full ${className}`}
    >
      <div className="flex h-full flex-col items-center gap-5 rounded-2xl border bg-background/95 p-5 text-center shadow-sm">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {number}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-balance">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default StepCard;
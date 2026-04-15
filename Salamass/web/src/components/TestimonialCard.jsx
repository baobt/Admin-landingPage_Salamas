import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

function TestimonialCard({ avatar, name, role, company, quote, rating, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="break-inside-avoid mb-6"
    >
      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
        <CardContent className="p-6">
          <Quote className="w-10 h-10 text-secondary/20 mb-4" />
          <p className="text-muted-foreground leading-relaxed mb-6 italic">"{quote}"</p>
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 rounded-xl">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-semibold">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-muted-foreground">{role} • {company}</p>
            </div>
          </div>
          <div className="flex gap-1 mt-4">
            {[...Array(rating)].map((_, i) => (
              <span key={i} className="text-secondary">★</span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default TestimonialCard;
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { getPageLabels } from '@/pages/home-content';

function HomeComparisonSection({ comparisonSection, onPrimaryCtaClick }) {
  
  return (
    <section className="pt-1 pb-16 md:pt-2 md:pb-20">
      <div className="container mx-auto px-4">
        <header className="mb-4 text-center">
          <h2 className="text-pop-up-tl text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: comparisonSection.title }} />
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {comparisonSection.description}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            whileHover={{ y: -4 }}
          >
            <Card className="relative bg-white border border-border rounded-[1.5rem] overflow-hidden shadow-2xl shadow-primary/10">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
              <CardContent className="relative z-10 p-7 md:p-10">
                <h3 className="mb-8 text-2xl font-bold text-foreground">{comparisonSection.traditionalTitle}</h3>
                <ul className="space-y-3">
                  {comparisonSection.traditionalPoints.map((point, idx) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.08 * idx }}
                      className="flex items-start gap-3 text-sm md:text-base text-foreground"
                    >
                      <XCircle className="mt-0.5 h-5 w-5 text-destructive" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            whileHover={{ y: -4 }}
          >
            <Card className="relative bg-primary text-primary-foreground border-0 rounded-[1.5rem] overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
              <CardContent className="relative z-10 p-7 md:p-10">
                <h3 className="mb-8 text-2xl font-bold">{comparisonSection.salamassTitle}</h3>
                <ul className="space-y-3">
                  {comparisonSection.salamassPoints.map((point, idx) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.08 * idx }}
                      className="flex items-start gap-3 text-sm md:text-base text-primary-foreground/90"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary-foreground" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-white/20">
                  <button
                    type="button"
                    onClick={onPrimaryCtaClick}
                    className="w-full py-4 bg-white text-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-95 transition-colors duration-300"
                  >
                    {comparisonSection.buttonText}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HomeComparisonSection;
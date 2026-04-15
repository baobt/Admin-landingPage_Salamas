import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import bgSection from '../../../images/backroundsection_1.jpg';

function EcosystemDiagram({ ecosystemNodes = [], targetMarkets = [], targetMarketsLabel = 'Thị trường mục tiêu' }) {
  return (
    <section id="ecosystem"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-slate-100/70 pt-12 pb-14 md:pt-14 md:pb-16"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={bgSection}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.7] blur-[2.5px]"
        />
        <div className="absolute inset-0 bg-white/35" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#FF8C42] via-[#1B8A8A] to-[#FF8C42] -translate-y-1/2 opacity-30" />

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-6 w-full">
          {ecosystemNodes.map((item, index) => {
            const Icon = item.icon;
            const isCenter = item.tone === 'teal';
            return (
              <motion.div 
                key={item.role} 
                initial={{ opacity: 0, y: 16 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.45, delay: index * 0.15 }} 
                className="flex-1 relative flex flex-col"
              >
                <div className={`bg-card rounded-2xl p-8 text-center flex flex-col items-center h-full shadow-lg border border-border relative z-10 ${isCenter ? 'shadow-xl border-2 border-[#1B8A8A]/20 md:-translate-y-4' : ''}`}>
                  <div className={`rounded-2xl flex items-center justify-center mb-6 shadow-lg w-20 h-20 bg-[#FF8C42] shadow-[#FF8C42]/20 ${isCenter ? 'w-24 h-24 bg-[#1B8A8A] shadow-[#1B8A8A]/30' : ''}`}>
                    <Icon className={`text-white ${isCenter ? 'w-12 h-12' : 'w-10 h-10'}`} />
                  </div>
                  <Badge className={`mb-3 border ${isCenter ? 'bg-[#1B8A8A]/10 text-[#1B8A8A] border-[#1B8A8A]/20 hover:bg-[#1B8A8A]/20 text-base px-4 py-1' : 'bg-[#FF8C42]/10 text-[#FF8C42] border-[#FF8C42]/20 hover:bg-[#FF8C42]/20'}`}>
                    {item.role}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>

                {index < 2 && <div className="md:hidden flex justify-center mt-4"><ArrowRight className="w-8 h-8 text-[#1B8A8A] rotate-90" /></div>}
                {index === 0 && <div className="hidden md:flex absolute top-1/2 -right-5 -translate-y-1/2 z-20 w-10 h-10 bg-background rounded-full border-2 border-[#1B8A8A] flex items-center justify-center shadow-sm"><ArrowRight className="w-5 h-5 text-[#1B8A8A]" /></div>}
                {index === 2 && <div className="hidden md:flex absolute top-1/2 -left-5 -translate-y-1/2 z-20 w-10 h-10 bg-background rounded-full border-2 border-[#1B8A8A] flex items-center justify-center shadow-sm"><ArrowLeft className="w-5 h-5 text-[#1B8A8A]" /></div>}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4 font-medium">{targetMarketsLabel}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {targetMarkets.map((market) => (
              <Badge
                key={market}
                variant="outline"
                className="px-4 py-2 text-sm font-medium border-[#1B8A8A]/30 text-[#1B8A8A] hover:bg-[#1B8A8A]/10"
              >
                {market}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default EcosystemDiagram;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function FAQSection({
  faqs = [],
  title = '❓ Câu hỏi thường gặp dành cho nhà bán hàng',
  description = 'Giải đáp nhanh các thắc mắc khi kinh doanh trên Salamass',
  ctaText = '👉 Đăng ký ngay hôm nay – Bắt đầu kinh doanh tại Cambodia cùng Salamass!',
  onCtaClick,
}) {
  return (
    <section className="bg-muted/30 pt-0 pb-12 md:pt-0 md:pb-14" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-3 p-4 mb-4 rounded-2xl bg-[#1B8A8A] text-white shadow-lg">
            <HelpCircle className="w-7 h-7" />
            <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="bg-card rounded-2xl border p-5 md:p-7 mb-10">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`} className="border rounded-xl px-4 bg-background hover:border-[#1B8A8A]/40">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-start gap-3 text-base md:text-lg font-medium">
                    <span className="text-[#FF8C42] font-bold shrink-0">{String(i + 1).padStart(2, '0')}.</span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pl-8">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }} className="text-center">
          <button onClick={onCtaClick} className="group inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-[#FF8C42] rounded-full hover:bg-[#e67a35] transition-all">
            {ctaText}
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQSection;

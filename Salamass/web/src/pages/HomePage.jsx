import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CTAButton from '@/components/CTAButton.jsx';
import { CategoryCard } from '@/components/MarketCards.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import StepCard from '@/components/StepCard.jsx';
import LeadCaptureForm from '@/components/LeadCaptureForm.jsx';
import InteractiveProductShowcase from '@/components/InteractiveProductShowcase.jsx';
import ProductDemoSection from '@/components/ProductDemoSection.jsx';
import EcosystemDiagram from '@/components/EcosystemDiagram.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import CompetitiveAdvantagesSection from '@/components/CompetitiveAdvantagesSection.jsx';
import FeaturesSection from '@/components/FeaturesSection.jsx';
import ServicePricingSection from '@/components/ServicePricingSection.jsx';
import HomeComparisonSection from '@/components/HomeComparisonSection.jsx';
import VideoPlayButton from '@/components/VideoPlayButton.jsx';
import VideoModal from '@/components/VideoModal.jsx';
import { useLanguage } from '@/contexts/LanguageContext';
import { getHomeContent, getPageLabels } from './home-content';

function SectionTitle({ title, description }) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center">
      <h2 className="text-pop-up-tl text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function HomePage() {
  const { language } = useLanguage();
  const content = getHomeContent(language);
  const labels = getPageLabels(language);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const scrollToLeadCapture = () => {
    const leadCaptureSection = document.getElementById('lead-capture');
    if (leadCaptureSection) {
      leadCaptureSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const {
    stats, features, steps, categories, testimonials,
    ecosystemNodes, targetMarkets, competitiveAdvantages, comparisonSection, servicePricing, sellerFaqs,
  } = content;

  return (
    <>
      <Helmet>
        <title>{labels.title}</title>
      </Helmet>

      <Header />

      <main>
        <section id="hero-section" className="hero-cinematic relative min-h-fit md:min-h-[80vh] lg:min-h-screen -mt-[81px] flex items-center md:items-start 
           overflow-hidden 
           pt-6 pb-2 md:pt-20 md:pb-12 
           text-primary-foreground"
        >
          <div className="hero-cinematic__bg" />
          <div className="hero-cinematic__vignette" />
          <div className="hero-cinematic__noise" />

          <div className="w-full relative z-10 mx-auto grid items-center gap-12 px-4 lg:px-0 lg:grid-cols-2 lg:gap-16 max-w-none">
            <div className="hero-copy pt-28 md:pt-6">
              <div className="hero-fade-up mb-4 flex gap-2" style={{ '--hero-delay': '40ms' }}>
                <Badge className="border-white/30 bg-white/10 text-white">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  {labels.badgeHalal}
                </Badge>
                <Badge className="border-white/30 bg-white/10 text-white">
                  <Globe2 className="mr-1 h-3 w-3" />
                  {labels.badgeGlobal}
                </Badge>
              </div>

              <h1 className="hero-fade-up mb-4 text-4xl font-bold tracking-tight leading-tight line-clamp-3 md:line-clamp-none md:text-5xl lg:text-6xl">
                {labels.heroTitle}
              </h1>
              <p className="hero-fade-up mb-8 max-w-xl line-clamp-3 md:line-clamp-none text-white/85 md:text-lg" style={{ '--hero-delay': '220ms' }}>
                {labels.heroDescription}
              </p>

              <div className="hero-fade-up mb-10 flex flex-wrap gap-3" style={{ '--hero-delay': '300ms' }}>
                <CTAButton
                  variant="secondary"
                  onClick={scrollToLeadCapture}
                  className="hero-cta-primary px-6 py-3 text-base shadow-[0_10px_35px_rgba(251,146,60,0.45)]"
                >
                  {labels.sellerBtn}
                </CTAButton>
                <CTAButton
                  variant="outline"
                  className="hero-cta-secondary border-2 border-white/55 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                >
                  {labels.exploreBtn}
                </CTAButton>
              </div>

              <div className="hero-fade-up grid grid-cols-3 gap-3 md:gap-4" style={{ '--hero-delay': '380ms' }}>
                {stats.map((stat) => (
                  <Card key={stat.label} className="hero-stat-card border-white/20 bg-white/10 shadow-sm">
                    <CardContent className="p-4 text-center">
                      <p className="text-lg font-bold text-white md:text-xl">{stat.value}</p>
                      <p className="text-xs text-white/80">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <EcosystemDiagram ecosystemNodes={ecosystemNodes} targetMarkets={targetMarkets} targetMarketsLabel={labels.ecosystemTargetMarkets} />

        <CompetitiveAdvantagesSection data={competitiveAdvantages} />

        <HomeComparisonSection comparisonSection={comparisonSection} onPrimaryCtaClick={scrollToLeadCapture} />

        <FeaturesSection
          features={features}
          badgeText={labels.featuresBadge}
          sectionTitle={labels.featuresTitle}
          buyerTitle={labels.featuresBuyer}
          sellerTitle={labels.featuresSeller}
          systemTitle={labels.featuresSystem}
        />

        <section id="how-it-works" className="bg-muted/30 pt-4 pb-12 md:pt-6 md:pb-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <h2 className="text-pop-up-tl whitespace-nowrap text-[clamp(1.1rem,4.2vw,2.25rem)] font-bold tracking-tight md:text-4xl">
                {labels.howItWorksTitle}
              </h2>
              <p className="mt-3 text-muted-foreground">{labels.howItWorksDesc}</p>
            </div>

            <div className="mx-auto max-w-6xl">
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                  <StepCard key={step.number} {...step} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="pt-0 pb-12 md:pt-1 md:pb-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-4 max-w-xl text-center">
              <h2 className="text-pop-up-tl text-3xl font-bold tracking-tight md:text-4xl">{labels.categoriesTitle}</h2>
              <p className="mt-2 text-muted-foreground">{labels.categoriesDesc}</p>
            </div>

            <div
              className="categories-grid"
              aria-label="Product categories"
            >
              {categories.slice(0, 4).map((category, index) => {
                const isCosmeticsCard =
                  category.title === 'Mỹ phẩm' ||
                  category.title === 'Cosmetics' ||
                  category.title === 'គ្រឿងសំអាង';

                return (
                  <CategoryCard
                    key={category.title}
                    {...category}
                    index={index}
                    productLabel={labels.productLabel}
                    imageClassName={isCosmeticsCard ? 'object-[74%_62%] md:object-center' : ''}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <ServicePricingSection data={servicePricing} onPlanCtaClick={scrollToLeadCapture} />

        <section className="bg-muted/30 pt-4 pb-12 md:pt-6 md:pb-14">
          <div className="container mx-auto px-4">
            <SectionTitle title={labels.demoTitle} />
            <ProductDemoSection labels={labels.demoTabs} />
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground md:py-16" id="lead-capture">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-white/10 border-white/20 text-white px-4 py-1.5"><Sparkles className="w-3.5 h-3.5 mr-1.5" />{labels.leadBadge}</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>{labels.leadTitle}</h2>
                <p className="text-lg opacity-90 leading-relaxed mb-8 max-w-xl">{labels.leadDesc}</p>

                <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                  <CTAButton
                    type="submit"
                    form="lead-capture-form"
                    variant="secondary"
                    className="w-full sm:w-auto text-base px-8 py-6"
                  >
                    {labels.sellerCta}
                  </CTAButton>
                  <CTAButton
                    type="submit"
                    form="lead-capture-form"
                    variant="outline"
                    className="w-full sm:w-auto text-base px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-primary"
                  >
                    {labels.distributorCta}
                  </CTAButton>
                </div>
              </div>

              <div>
                <Card className="border-none shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-foreground">{labels.leadFormTitle}</h3>
                    <LeadCaptureForm language={language} formId="lead-capture-form" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 pt-12 pb-0 md:pt-14 md:pb-0">
          <div className="container mx-auto px-4">
            <SectionTitle
              title={labels.testimonialsTitle}
              description={labels.testimonialsDesc}
            />

            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.name} {...testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>

        <FAQSection
          faqs={sellerFaqs}
          title={labels.faqTitle}
          description={labels.faqDesc}
          ctaText={labels.faqCta}
          onCtaClick={scrollToLeadCapture}
        />
        <VideoPlayButton onClick={() => setIsVideoOpen(true)} />
        <VideoModal 
          isOpen={isVideoOpen} 
          onClose={() => setIsVideoOpen(false)} 
        />
      </main>

      <Footer />
    </>
  );
}

export default HomePage;

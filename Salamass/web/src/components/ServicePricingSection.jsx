import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

function ServicePricingSection({ data, onPlanCtaClick }) {
  if (!data) return null;

  const ctaByIndex = ['Bắt Đầu Ngay', 'Đăng Ký Ngay', 'Liên Hệ Chúng Tôi'];

  return (
    <section className="relative bg-muted/20 pt-4 pb-16 px-4 overflow-hidden md:pt-6 md:pb-20 sm:px-6 lg:px-8">
      <div className="absolute top-0 right-0 -z-10 opacity-20">
        <div className="w-[420px] h-[420px] md:w-[600px] md:h-[600px] bg-primary rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <Badge className="mb-2 bg-transparent text-primary border-0 px-0 py-0 font-bold tracking-widest text-xs uppercase">
            {data.badge}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary leading-tight tracking-tight max-w-4xl mx-auto uppercase">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {data.plans.map((plan, index) => {
            const isFeatured = index === 1;

            return (
              <Card
                key={plan.name}
                className={`relative border-0 rounded-xl overflow-visible ${
                  isFeatured
                    ? 'bg-primary text-primary-foreground scale-100 lg:scale-105 z-10 shadow-[0_30px_60px_rgba(0,54,51,0.2)] ring-1 ring-primary/20'
                    : 'bg-background hover:bg-muted/40 transition-colors duration-300'
                }`}
              >
                {isFeatured ? (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                    Đáng Mua Nhất
                  </div>
                ) : null}

                <CardContent className="p-8 md:p-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-8">
                      <h3 className={`text-2xl font-bold mb-2 ${isFeatured ? 'text-primary-foreground' : 'text-primary'}`}>
                        {plan.name}
                      </h3>
                      <p className={`${isFeatured ? 'text-primary-foreground/75' : 'text-muted-foreground'} text-sm`}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1 mb-10">
                      <span className={`text-4xl md:text-5xl font-extrabold ${isFeatured ? 'text-primary-foreground' : 'text-primary'}`}>
                        {plan.price}
                      </span>
                      <span className={`${isFeatured ? 'text-primary-foreground/75' : 'text-muted-foreground'} font-medium`}>
                        /{plan.period}
                      </span>
                    </div>

                    <ul className="space-y-4 mb-12">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-center gap-3 ${isFeatured ? 'text-primary-foreground/90' : 'text-muted-foreground'} font-medium`}
                        >
                          <CheckCircle2 className={`h-5 w-5 ${isFeatured ? 'text-primary-foreground' : 'text-primary'}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={onPlanCtaClick}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                      isFeatured
                        ? 'bg-background text-primary hover:brightness-95'
                        : 'text-foreground bg-muted hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    {ctaByIndex[index] || 'Đăng Ký'}
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicePricingSection;

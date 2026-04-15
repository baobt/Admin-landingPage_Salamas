import React from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProductShowcaseSlider } from '@/hooks/useProductShowcaseSlider';
import CTAButton from './CTAButton.jsx';

function InteractiveProductShowcase({ language = 'vi', buyNowText = 'Mua ngay' }) {
  const {
    currentProduct,
    isSwitching,
    next,
    prev,
  } = useProductShowcaseSlider(language);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-muted/20 min-h-[280px] sm:min-h-[320px] md:min-h-[420px]">
      {/* <img src={currentProduct.image} alt={currentProduct.name} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /> */}
{/* 
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <button disabled={isSwitching} onClick={prev} className="w-10 h-10 rounded-full bg-white/20 text-white grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button disabled={isSwitching} onClick={next} className="w-10 h-10 rounded-full bg-white/20 text-white grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div> */}

      {/* <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <Badge>{currentProduct.category}</Badge>
              <span className="text-sm flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {currentProduct.rating} ({currentProduct.reviews})
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2">{currentProduct.name}</h3>

            <div className="flex items-center justify-between">
              <p className="text-secondary font-bold text-2xl">
                {currentProduct.price}
                <span className="text-sm ml-1 text-white/70">{currentProduct.unit}</span>
              </p>
              <CTAButton variant="secondary" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                {buyNowText}
              </CTAButton>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}

export default InteractiveProductShowcase;

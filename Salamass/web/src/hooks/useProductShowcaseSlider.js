import { useEffect, useMemo, useState } from 'react';
import { getShowcaseProducts } from '@/data/interactiveShowcaseProducts';

export function useProductShowcaseSlider(language) {
  const products = useMemo(() => getShowcaseProducts(language), [language]);
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    setIndex(0);
    setLoadedImages({});
  }, [language]);

  useEffect(() => {
    let cancelled = false;

    products.forEach((product) => {
      const img = new Image();
      img.src = product.image;
      img.onload = () => {
        if (!cancelled) setLoadedImages((prev) => ({ ...prev, [product.image]: true }));
      };
      img.onerror = () => {
        if (!cancelled) setLoadedImages((prev) => ({ ...prev, [product.image]: true }));
      };
    });

    return () => {
      cancelled = true;
    };
  }, [products]);

  const switchToIndex = (targetIndex) => {
    const targetProduct = products[targetIndex];
    if (!targetProduct || isSwitching) return;

    if (loadedImages[targetProduct.image]) {
      setIndex(targetIndex);
      return;
    }

    setIsSwitching(true);
    const img = new Image();
    img.src = targetProduct.image;
    img.onload = () => {
      setLoadedImages((prev) => ({ ...prev, [targetProduct.image]: true }));
      setIndex(targetIndex);
      setIsSwitching(false);
    };
    img.onerror = () => {
      setIndex(targetIndex);
      setIsSwitching(false);
    };
  };

  const next = () => switchToIndex((index + 1) % products.length);
  const prev = () => switchToIndex((index - 1 + products.length) % products.length);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      switchToIndex((index + 1) % products.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [index, products, isSwitching, loadedImages]);

  return {
    products,
    currentProduct: products[index],
    isSwitching,
    next,
    prev,
  };
}
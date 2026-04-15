import { useEffect, useMemo, useState } from 'react';
import { headerTrackedSectionIds } from '@/data/headerConfig';

export function useHeaderNavigation() {
  const [activeHash, setActiveHash] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionIds = useMemo(() => headerTrackedSectionIds, []);

  useEffect(() => {
    const updateActiveNav = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const headerOffset = 88;
        setIsScrolled(window.scrollY + headerOffset >= heroBottom);
      } else {
        setIsScrolled(window.scrollY > 24);
      }

      const scrollWithOffset = window.scrollY + 140;
      let currentActive = '';

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollWithOffset) currentActive = `#${id}`;
      }

      setActiveHash(currentActive);
    };

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('resize', updateActiveNav);
    return () => {
      window.removeEventListener('scroll', updateActiveNav);
      window.removeEventListener('resize', updateActiveNav);
    };
  }, [sectionIds]);

  const extractHash = (href) => {
    const index = href.indexOf('#');
    return index >= 0 ? href.slice(index) : '';
  };

  const isNavActive = (href) => {
    const hash = extractHash(href);
    if (!hash) return activeHash === '';
    return activeHash === hash;
  };

  return { activeHash, isNavActive, isScrolled };
}
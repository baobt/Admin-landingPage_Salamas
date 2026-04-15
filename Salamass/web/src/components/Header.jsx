import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHeaderNavigation } from '@/hooks/useHeaderNavigation';
import {
  navItemsByLanguage,
  authLabelsByLanguage,
  authLinks,
  languageOptions,
} from '@/data/headerConfig';
import CTAButton from './CTAButton.jsx';
import logoImage from '../../../images/logo Salamass2.png';

function LanguageSelect({ language, setLanguage, triggerClassName = '' }) {
  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className={`w-24 ${triggerClassName}`}>
        <Globe className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="inline-flex items-center gap-2">
              <span className={option.flagClass} />
              <span>{option.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const { isNavActive, isScrolled } = useHeaderNavigation();
  const isHeroMode = location.pathname === '/' && !isScrolled;
  const currentNavItems = navItemsByLanguage[language] || navItemsByLanguage.vi;
  const labels = authLabelsByLanguage[language] || authLabelsByLanguage.vi;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'border-b bg-background/95 backdrop-blur'
        : 'bg-transparent backdrop-blur-0'
    }`}
    >
      <div className="container mx-auto h-20 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoImage} alt="Salamass logo" className="h-[170px] w-auto rounded-md object-contain" />
        </Link>

        <nav className="hidden lg:flex gap-6">
          {currentNavItems.map((i) => (
            <a
              key={i.name}
              href={i.href}
              className={`text-sm transition-colors ${
                isNavActive(i.href)
                  ? (isScrolled ? 'text-primary font-semibold' : 'text-white font-semibold')
                  : (isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/85 hover:text-white')
              }`}
            >
              {i.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSelect
            language={language}
            setLanguage={setLanguage}
            triggerClassName={isHeroMode ? 'border-white/45 bg-white/10 text-white [&_svg]:text-white' : ''}
          />
          <a href={authLinks.login}>
            <Button variant="outline" className={isHeroMode ? 'border-white/60 bg-white/5 text-white hover:bg-white/15 hover:text-white' : ''}>{labels.login}</Button>
          </a>
          <a href={authLinks.register}>
            <CTAButton
              variant={isHeroMode ? 'secondary' : 'primary'}
              className={isHeroMode ? 'shadow-[0_8px_24px_rgba(251,146,60,0.35)] hover:opacity-95' : ''}
            >
              {labels.register}
            </CTAButton>
          </a>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className={isHeroMode ? 'text-white hover:bg-white/10 hover:text-white' : ''}>
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72">
            <div className="mt-8 flex flex-col gap-4">
              <div className="pb-2 border-b">
                <p className="text-xs text-muted-foreground mb-2">Language</p>
                <LanguageSelect language={language} setLanguage={setLanguage} />
              </div>

              {currentNavItems.map((i) => (
                <a
                  key={i.name}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className={isNavActive(i.href) ? 'text-primary font-semibold' : ''}
                >
                  {i.name}
                </a>
              ))}

              <a href={authLinks.login}>
                <Button variant="outline" className="w-full">{labels.login}</Button>
              </a>

              <a href={authLinks.register}>
                <CTAButton className="w-full">{labels.register}</CTAButton>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
import React from 'react';
import { MapPin, Phone, Building2, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoImage from '../../../images/logofooter.png';
import moneyImage from '../../../images/money.png';
import wingbankImage from '../../../images/wingbank.png';
import visaImage from '../../../images/visa.png';
import ababankImage from '../../../images/ababank.png';
import jcbImage from '../../../images/jcb.png';
import cardImage from '../../../images/card.png';
import appStoreVideo from '../../../images/App-Store-Black.mp4';
import googlePlayVideo from '../../../images/Google-Play.mp4';
import qrTeleImage from '../../../images/QRtele.png';
import qrZaloImage from '../../../images/QRzalo.png';

const linksByLang = {
  vi: [
    { name: 'Tính năng', href: '/#features' },
    { name: 'Danh mục', href: '/#categories' },
    { name: 'Liên hệ', href: '/#contact' },
  ],
  en: [
    { name: 'Features', href: '/#features' },
    { name: 'Categories', href: '/#categories' },
    { name: 'Contact', href: '/#contact' },
  ],
  km: [
    { name: 'មុខងារ', href: '/#features' },
    { name: 'ប្រភេទ', href: '/#categories' },
    { name: 'ទំនាក់ទំនង', href: '/#contact' },
  ],
};

const labels = {
  vi: { links: 'Liên kết', contact: 'Liên hệ', paymentSupport: 'Payment Support', getApp: 'Get the app' },
  en: { links: 'Links', contact: 'Contact', paymentSupport: 'Payment Support', getApp: 'Get the app' },
  km: { links: 'តំណភ្ជាប់', contact: 'ទំនាក់ទំនង', paymentSupport: 'Payment Support', getApp: 'Get the app' },
};

const paymentMethods = [
  { name: 'Money', src: moneyImage },
  { name: 'Wing Bank', src: wingbankImage },
  { name: 'Visa', src: visaImage },
  { name: 'ABA Bank', src: ababankImage },
  { name: 'JCB', src: jcbImage },
  { name: 'Card', src: cardImage },
];

const appPlatforms = [
  { name: 'App Store', src: appStoreVideo, href: 'https://www.apple.com/app-store/' },
  { name: 'Google Play', src: googlePlayVideo, href: 'https://play.google.com/store' },
];

export default function Footer() {
  const { language } = useLanguage();
  const links = linksByLang[language] || linksByLang.vi;
  const text = labels[language] || labels.vi;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
<div>
          <img src={logoImage} alt="Salamass logo" className="h-[40px] w-auto object-contain mb-6" />
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tg://resolve?domain=salamassbot" target="_blank" rel="noopener noreferrer" aria-label="Telegram QR">
              <img src={qrTeleImage} alt="Telegram QR" className="h-24 w-24 md:h-32 md:w-32 rounded-xl bg-white/20 p-2 object-contain hover:scale-105 transition-transform" />
            </a>
            <a href="https://zalo.me/855715762431" target="_blank" rel="noopener noreferrer" aria-label="Zalo QR">
              <img src={qrZaloImage} alt="Zalo QR" className="h-24 w-24 md:h-32 md:w-32 rounded-xl bg-white/20 p-2 object-contain hover:scale-105 transition-transform" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-3">{text.links}</p>
          <div className="flex flex-col gap-2 text-sm">{links.map((l) => <a key={l.name} href={l.href}>{l.name}</a>)}</div>
        </div>

        <div>
          <div className="text-sm space-y-2">
            <p className="font-semibold">{text.contact}</p>
            <p className="flex gap-2 items-start"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Address: No.12 Samdach Penn Nouth St. (289), Phnom Penh, Cambodia</p>
            <p className="flex gap-2 items-center"><Phone className="w-4 h-4" /> Hotline Cambodia: +855 (0) 71 576 2431</p>
            <p className="flex gap-2 items-center"><Phone className="w-4 h-4" /> Hotline VN: +84 93 154 1339</p>
            <p className="flex gap-2 items-center"><Building2 className="w-4 h-4" /> Công Ty TNHH Salamass</p>
            <p className="flex gap-2 items-center"><Mail className="w-4 h-4" /> Email: info@salamass.com</p>
          </div>
        </div>

        <div>
          <div>
            <p className="font-bold text-lg md:text-xl mb-3">{text.paymentSupport}</p>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((item) => (
                <img
                  key={item.name}
                  src={item.src}
                  alt={item.name}
                  className="h-12 md:h-14 w-auto rounded bg-white/10 p-2"
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="font-semibold mb-3">{text.getApp}</p>
            <div className="flex flex-wrap gap-2">
              {appPlatforms.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${item.name}`}
                >
                  <video
                    src={item.src}
                    className="h-9 w-auto rounded"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={item.name}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs py-4 border-t border-white/20">© 2026 Salamass</p>
    </footer>
  );
}
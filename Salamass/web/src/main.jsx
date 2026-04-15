import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './index.css';
import 'flag-icons/css/flag-icons.min.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import salamassTabLogo from '../../images/logo Salamasstabwindow.png';

const setLargerFavicon = (src) => {
  const img = new Image();
  img.onload = () => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    
    const zoom = 2.0;
    const drawW = size * zoom;
    const drawH = size * zoom;
    const offsetX = (size - drawW) / 2;
    const offsetY = (size - drawH) / 2;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    const favicon = document.querySelector("link[rel='icon']") || document.createElement('link');
    favicon.setAttribute('rel', 'icon');
    favicon.setAttribute('type', 'image/png');
    favicon.setAttribute('href', canvas.toDataURL('image/png'));
    if (!favicon.parentNode) document.head.appendChild(favicon);
  };
  img.src = src;
};

setLargerFavicon(salamassTabLogo);

ReactDOM.createRoot(document.getElementById('root')).render(
	<LanguageProvider>
		<App />
	</LanguageProvider>
);
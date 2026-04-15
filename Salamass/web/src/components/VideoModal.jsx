import React from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useLanguage } from "../contexts/LanguageContext.jsx";

import videoEN from '../../../images/Salamass Marketing Cambodia EN.mp4';
import videoKM from '../../../images/Salamass Marketing Cambodia CAM.mp4';

const VideoModal = ({ isOpen, onClose }) => {
  const videoRef = React.useRef(null);
  const { language } = useLanguage();
  const videoSrc = language === 'km' ? videoKM : videoEN;

  React.useEffect(() => {
    if (!videoRef.current) return;

    if (isOpen) {
      videoRef.current.load();

      videoRef.current
        .play()
        .catch(() => { });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen, videoSrc]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild />

      <SheetContent
        side="top"
        className={cn(
          'h-screen max-h-screen w-screen max-w-screen flex items-center justify-center p-0 border-none rounded-none shadow-2xl backdrop-blur-sm',
          'bg-black/70 border-white/10'
        )}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8">

          {/* ❌ Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 text-white/90 hover:text-white w-12 h-12 rounded-full backdrop-blur-xl bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center justify-center shadow-xl"
          >
            <X className="h-6 w-6" />
          </button>

          {/* 🎬 Video */}
          <video
            key={videoSrc}
            ref={videoRef}
            src={videoSrc}
            className="w-full max-w-4xl h-auto max-h-[80vh] rounded-2xl shadow-2xl bg-black"
            controls
            autoPlay
            muted
            playsInline
          />

        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VideoModal;
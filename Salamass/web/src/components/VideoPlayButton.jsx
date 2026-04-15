import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPageLabels } from '@/pages/home-content.js';

const VideoPlayButton = ({ onClick, className }) => {
  const { language } = useLanguage();
  const labels = getPageLabels(language);
  const videoIntroText = labels.videoIntro || 'Watch intro video';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center">

           
            <span className="absolute inline-flex h-20 w-20 rounded-full bg-orange-300 opacity-60 animate-ping" />
            <span className="absolute inline-flex h-24 w-24 rounded-full bg-orange-200 opacity-40 animate-ping delay-200" />

            
            <Button
              onClick={onClick}
              className={cn(
                'relative h-16 w-16 rounded-full',
                'bg-orange-500 text-white',
                'shadow-lg',

                'hover:scale-110 hover:bg-orange-600',

                
                'transition-all duration-300 ease-out',

                className
              )}
              size="icon"
            >
              <Play className="h-6 w-6 ml-0.5" />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{videoIntroText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VideoPlayButton;
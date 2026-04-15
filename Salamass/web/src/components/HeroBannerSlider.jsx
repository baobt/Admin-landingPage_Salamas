// import React, { useEffect, useMemo, useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import banner1 from '../../../images/banner_1.webp';
// import banner2 from '../../../images/banner_2.webp';
// import banner3 from '../../../images/banner_3.webp';

// const banners = [
//   { src: banner1, alt: 'Salamass banner 1' },
//   { src: banner2, alt: 'Salamass banner 2' },
//   { src: banner3, alt: 'Salamass banner 3' },
// ];

// export default function HeroBannerSlider() {
//   const [index, setIndex] = useState(0);
//   const currentBanner = useMemo(() => banners[index], [index]);

//   useEffect(() => {
//     const timer = window.setInterval(() => {
//       setIndex((v) => (v + 1) % banners.length);
//     }, 5000);

//     return () => window.clearInterval(timer);
//   }, []);

//   const next = () => setIndex((v) => (v + 1) % banners.length);
//   const prev = () => setIndex((v) => (v - 1 + banners.length) % banners.length);

//   return (
//     <div className="relative h-[140px] w-full overflow-hidden rounded-3xl bg-black/10 sm:h-[180px] md:h-[220px] lg:h-[260px]">
//       <img
//         src={currentBanner.src}
//         alt={currentBanner.alt}
//         className="absolute inset-0 h-full w-full object-cover object-center"
//       />

//       <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

//       <div className="absolute inset-y-0 left-4 right-4 z-10 flex items-center justify-between">
//         <button
//           type="button"
//           onClick={prev}
//           className="grid h-10 w-10 place-items-center rounded-full bg-black/25 text-white backdrop-blur hover:bg-black/40"
//         >
//           <ChevronLeft className="h-5 w-5" />
//         </button>
//         <button
//           type="button"
//           onClick={next}
//           className="grid h-10 w-10 place-items-center rounded-full bg-black/25 text-white backdrop-blur hover:bg-black/40"
//         >
//           <ChevronRight className="h-5 w-5" />
//         </button>
//       </div>

//       <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
//         {banners.map((_, dotIndex) => (
//           <button
//             key={`banner-dot-${dotIndex}`}
//             type="button"
//             onClick={() => setIndex(dotIndex)}
//             className={`h-2.5 rounded-full transition-all ${dotIndex === index ? 'w-7 bg-white' : 'w-2.5 bg-white/60'}`}
//             aria-label={`Go to banner ${dotIndex + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useCallback, useRef } from 'react';
import { MaterialIcon } from '@/components/common';
import { cn } from '@/utils/cn';

export interface CarouselSlide {
  id: number;
  name: string;
  brand: string;
  image: string;
  parts: string;
  badgeText: string;
  badgeIcon: string;
  statLabel: string;
  statValue: string;
}

interface HeroCarouselProps {
  slides: CarouselSlide[];
  autoSlideInterval?: number; // ms, 0 = disabled
  transitionDuration?: number; // ms
  showIndicators?: boolean;
  showThumbnails?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function HeroCarousel({
  slides,
  autoSlideInterval = 5000,
  transitionDuration = 300,
  showIndicators = true,
  showThumbnails = true,
  showArrows = true,
  className,
}: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const autoSlideRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  // Preload all images
  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new window.Image();
      img.src = slide.image;
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(index));
      };
    });
  }, [slides]);

  // goToSlide callback
  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex || isTransitioning) return;
      setIsTransitioning(true);
      setActiveIndex(index);
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);
    },
    [activeIndex, isTransitioning, transitionDuration]
  );

  // Auto-slide
  useEffect(() => {
    if (autoSlideInterval <= 0) return;

    autoSlideRef.current = window.setInterval(() => {
      goToSlide((activeIndex + 1) % slides.length);
    }, autoSlideInterval);

    return () => {
      if (autoSlideRef.current) window.clearInterval(autoSlideRef.current);
    };
  }, [activeIndex, autoSlideInterval, slides.length, goToSlide]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSlideRef.current) window.clearInterval(autoSlideRef.current);
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((activeIndex + 1) % slides.length);
  }, [activeIndex, goToSlide, slides.length]);

  const prevSlide = useCallback(() => {
    goToSlide((activeIndex - 1 + slides.length) % slides.length);
  }, [activeIndex, goToSlide, slides.length]);

  // Helper: Get visible indicators (max 5, centered on active)
  const getVisibleIndicators = useCallback(() => {
    const total = slides.length;
    if (total <= 5) {
      return slides.map((_, index) => ({
        index,
        isFirst: index === 0,
        isLast: index === total - 1,
        isActive: index === activeIndex,
      }));
    }
    // More than 5 slides: show 5 dots centered on active
    let start = Math.max(0, Math.min(activeIndex - 2, total - 5));
    const visibleIndices = Array.from({ length: 5 }, (_, i) => start + i);
    return visibleIndices.map((index) => ({
      index,
      isFirst: index === start,
      isLast: index === start + 4,
      isActive: index === activeIndex,
    }));
  }, [activeIndex, slides]);

  return (
    <div className={cn('relative', className)} role="region" aria-label="Carrusel de vehículos">
      {/* Slides container - ALL images rendered, only one visible via opacity */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ height: '380px', minHeight: '380px' }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 w-full h-full transition-opacity ease-in-out',
              index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
            style={{ transitionDuration: `${transitionDuration}ms` }}
            aria-hidden={index !== activeIndex}
            aria-current={index === activeIndex ? 'true' : 'false'}
          >
            {loadedImages.has(index) ? (
              <img
                src={slide.image}
                alt={slide.name}
                className="w-full h-full object-cover object-center opacity-90"
              />
            ) : (
              <div className="w-full h-full bg-inverse-surface/50 flex items-center justify-center">
                <MaterialIcon name="image" size={48} className="text-surface-border" aria-hidden />
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary via-text-primary/20 to-transparent" />

            {/* Slide content - only render for active slide to avoid z-index issues */}
            {index === activeIndex && (
              <>
                {/* OEM Badge */}
                <div className="absolute top-4 right-4 bg-primary-container text-on-primary px-3 py-1 rounded font-label-sm uppercase tracking-wider shadow flex items-center gap-1.5 z-20">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-surface-canvas animate-pulse"
                    aria-hidden
                  />
                  {slide.badgeText}
                </div>

                {/* Counter */}
                <div className="absolute top-4 left-4 bg-text-primary/80 backdrop-blur px-2.5 py-1 rounded text-[11px] font-label-md text-surface-subtle border border-surface-border/20 z-20">
                  {activeIndex + 1} / {slides.length}
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-text-primary/85 backdrop-blur-md text-surface-bright shadow-lg border border-surface-border/20 z-20">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary shrink-0">
                        <MaterialIcon name={slide.badgeIcon} size={24} aria-hidden />
                      </div>
                      <div>
                        <span className="block font-headline-sm text-headline-sm leading-tight text-surface-bright">
                          {slide.name}
                        </span>
                        <span className="font-body-sm text-body-sm text-surface-dim">
                          {slide.parts}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block font-label-sm text-label-sm text-fitment-success uppercase font-bold">
                        {slide.statLabel}
                      </span>
                      <span className="font-headline-sm text-headline-sm text-surface-bright">
                        {slide.statValue}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-inverse-surface/80 hover:bg-primary-container text-surface-bright flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-20 shadow-lg"
            aria-label="Slide anterior"
          >
            <MaterialIcon name="chevron_left" size={22} aria-hidden />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-inverse-surface/80 hover:bg-primary-container text-surface-bright flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-20 shadow-lg"
            aria-label="Slide siguiente"
          >
            <MaterialIcon name="chevron_right" size={22} aria-hidden />
          </button>
        </>
      )}

      {/* Indicators (dots) - Below slider, max 5 dots with first/last smaller */}
      {showIndicators && (
        <div
          className="flex justify-center gap-1.5 mt-4"
          role="tablist"
          aria-label="Indicadores de slide"
        >
          {getVisibleIndicators().map(({ index, isFirst, isLast, isActive }) => (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-label={`Ir al slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={cn(
                'rounded-full transition-all duration-300 disabled:opacity-50 bg-white/50 hover:bg-white/70',
                isActive
                  ? 'bg-primary-container w-3 h-3 scale-125'
                  : isFirst || isLast
                    ? 'w-2 h-2 opacity-50'
                    : 'w-2.5 h-2.5'
              )}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Miniaturas de slide">
          {slides.map((slide, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Ver ${slide.name}`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={cn(
                'car-thumb-btn flex flex-col items-center p-2 rounded-xl transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed',
                index === activeIndex
                  ? 'bg-inverse-surface border-2 border-primary-container text-surface-bright'
                  : 'bg-inverse-surface/80 border-2 border-transparent hover:border-secondary text-surface-dim hover:text-surface-bright'
              )}
              aria-current={index === activeIndex ? 'true' : 'false'}
            >
              <div className="w-full flex items-center justify-between text-[10px] font-label-sm font-bold uppercase mb-0.5">
                <span className={cn(index === activeIndex ? 'text-primary-container' : 'text-surface-dim')}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {index === activeIndex && (
                  <MaterialIcon name="check_circle" size={12} className="text-primary-container" aria-hidden />
                )}
              </div>
              <span className={cn(
                'font-label-md text-[11px] leading-tight truncate w-full font-bold',
                index === activeIndex ? 'text-surface-bright' : ''
              )}>
                {slide.name.split(' ')[0]}
              </span>
              <span className="text-[9px] text-surface-dim truncate w-full">{slide.brand}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

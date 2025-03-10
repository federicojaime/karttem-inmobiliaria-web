// src/components/property/PropertyGallery.tsx
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Heart, Camera, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// API base URL
const API_BASE_URL = 'http://localhost/inmobiliaria-api';

interface PropertyGalleryProps {
  images: Array<{ id: string; image_url: string; }>;
  title: string;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export const PropertyGallery = ({ 
  images, 
  title, 
  onFavorite, 
  isFavorite = false 
}: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [carouselMode, setCarouselMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Adjust view based on screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setCarouselMode(!mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setCarouselMode(!e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Get the full image URL
  const getFullImageUrl = (imageUrl: string) => {
    if (!imageUrl) return ''; 
    
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    return `${API_BASE_URL}/${imageUrl}`;
  };
  
  // Navigation functions
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Image loading control
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  // Touch gesture handling for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };
  
  // Lightbox management
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden';
    hideControlsWithDelay();
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = 'auto';
    setShowControls(true);
    if (controlTimerRef.current) {
      clearTimeout(controlTimerRef.current);
    }
  };
  
  // Hide controls after a delay in lightbox
  const hideControlsWithDelay = () => {
    setShowControls(true);
    if (controlTimerRef.current) {
      clearTimeout(controlTimerRef.current);
    }
    
    controlTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };
  
  // Handle sharing the property
  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this property: ${title}`,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl)
        .then(() => alert('Link copied to clipboard'))
        .catch(err => console.error('Error copying:', err));
    }
  };

  // If no images, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-video max-w-3xl mx-auto bg-gray-50 rounded-xl flex flex-col items-center justify-center shadow-inner">
        <Camera className="h-10 w-10 text-gray-300 mb-2" />
        <p className="text-gray-400 font-medium">No images available</p>
      </div>
    );
  }

  return (
    <>
      {/* Main container */}
      <div className="relative rounded-xl overflow-hidden shadow-md bg-gray-50 max-w-3xl mx-auto">
        {/* Top bar with actions */}
        <div className="absolute top-0 left-0 right-0 z-10 p-3 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center">
            <span className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
              {currentIndex + 1}/{images.length}
            </span>
          </div>
          
          <div className="flex gap-2">
            {onFavorite && (
              <button 
                className={`p-2 rounded-full backdrop-blur-sm transition-all ${isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-black/50 text-white hover:bg-black/70'}`}
                onClick={onFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-white' : ''}`} />
              </button>
            )}
            
            <button 
              className="p-2 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-black/70 transition-all"
              onClick={shareProperty}
              aria-label="Share property"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Main image view */}
        {carouselMode ? (
          // Carousel mode for mobile
          <div 
            className="relative overflow-hidden"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div 
                  key={image.id || index} 
                  className="flex-shrink-0 w-full h-full"
                  style={{ flex: '0 0 100%' }}
                >
                  <div className="aspect-video relative">
                    {isLoading && currentIndex === index && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="animate-pulse flex flex-col items-center">
                          <div className="rounded-full bg-gray-200 h-10 w-10 mb-2"></div>
                          <div className="h-2 bg-gray-200 rounded w-24 mb-1"></div>
                          <div className="h-2 bg-gray-200 rounded w-16"></div>
                        </div>
                      </div>
                    )}
                    <img 
                      src={getFullImageUrl(image.image_url)} 
                      alt={`${title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onLoad={currentIndex === index ? handleImageLoad : undefined}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
              <div className="flex gap-1.5 px-2 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === index ? 'bg-white scale-110' : 'bg-white/40'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Gallery mode for desktop
          <div 
            className="aspect-video cursor-pointer"
            onClick={() => openLightbox(currentIndex)}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="rounded-full bg-gray-200 h-12 w-12 mb-3"></div>
                  <div className="h-2.5 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-2.5 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            )}
            
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentIndex}
                src={getFullImageUrl(images[currentIndex]?.image_url)} 
                alt={`${title} - Image ${currentIndex + 1}`}
                className="w-full h-full object-cover object-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onLoad={handleImageLoad}
              />
            </AnimatePresence>
            
            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button 
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        )}
        
        {/* Thumbnail gallery (desktop only) */}
        {!carouselMode && images.length > 1 && (
          <div className="grid grid-cols-6 gap-1 p-1 bg-gray-100">
            {images.map((image, index) => (
              <button
                key={image.id || index}
                className={`overflow-hidden aspect-[3/2] rounded-md transition-all ${
                  currentIndex === index 
                    ? 'ring-2 ring-amber-500 ring-offset-1 scale-[0.97]' 
                    : 'opacity-60 hover:opacity-90'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img 
                  src={getFullImageUrl(image.image_url)} 
                  alt={`${title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onMouseMove={hideControlsWithDelay}
            onTouchStart={() => {
              hideControlsWithDelay();
              handleTouchStart;
            }}
            onTouchEnd={handleTouchEnd}
          >
            {/* Lightbox controls */}
            <AnimatePresence>
              {showControls && (
                <>
                  <motion.div
                    className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-white/90 font-medium">
                      {title}
                    </div>
                    <button 
                      className="text-white/90 p-2 hover:bg-white/10 rounded-full transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeLightbox();
                      }}
                      aria-label="Close fullscreen view"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </motion.div>
                  
                  {images.length > 1 && (
                    <>
                      <motion.button 
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors z-10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevious();
                        }}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </motion.button>
                      
                      <motion.button 
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors z-10"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </motion.button>
                    </>
                  )}
                  
                  <motion.div 
                    className="absolute bottom-4 left-0 right-0 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                      {currentIndex + 1} / {images.length}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            
            {/* Main image container */}
            <div 
              className="w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentIndex}
                  src={getFullImageUrl(images[currentIndex]?.image_url)} 
                  alt={`${title} - Image ${currentIndex + 1}`}
                  className="max-h-screen max-w-full object-contain select-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", damping: 25 }}
                  draggable={false}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
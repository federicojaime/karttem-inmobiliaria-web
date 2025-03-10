// src/components/property/PropertyGallery.tsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PropertyImage } from '../../services/api';

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No hay imágenes disponibles</p>
      </div>
    );
  }

  // Find main image first
  const mainImageIndex = images.findIndex(img => img.is_main);
  const orderedImages = [...images];
  if (mainImageIndex !== -1) {
    const mainImage = orderedImages.splice(mainImageIndex, 1)[0];
    orderedImages.unshift(mainImage);
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? orderedImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === orderedImages.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden group">
        <img 
          src={orderedImages[currentIndex]?.image_url || '/placeholder-property.jpg'} 
          alt={`${title} - Imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      <div className="grid grid-cols-6 gap-2">
        {orderedImages.map((image, index) => (
          <button
            key={image.id || index}
            onClick={() => goToImage(index)}
            className={`aspect-video rounded-md overflow-hidden ${
              index === currentIndex ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <img 
              src={image.image_url} 
              alt={`${title} - Miniatura ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
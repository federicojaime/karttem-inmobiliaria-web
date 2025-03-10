// src/components/properties/PropertyCard.tsx
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { Property } from '../../services/api';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  // Determine status translation
  const statusText = {
    'sale': 'Venta',
    'rent': 'Alquiler',
    'temporary_rent': 'Alquiler temporario',
    'sold': 'Vendido',
    'rented': 'Alquilado'
  }[property.status] || property.status;

  // Get price text
  const getPriceText = () => {
    if (property.price_ars) {
      return `$${property.price_ars.toLocaleString()}`;
    } else if (property.price_usd) {
      return `U$D ${property.price_usd.toLocaleString()}`;
    }
    return 'Consultar';
  };

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={property.main_image || '/placeholder-property.jpg'} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
            {statusText}
          </div>
          {property.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-medium">
              Destacada
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.address}, {property.city}, {property.province}</span>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="font-bold text-lg">
              {getPriceText()}
            </div>
            
            <div className="flex space-x-3 text-sm text-muted-foreground">
              {property.bedrooms !== null && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              
              {property.bathrooms !== null && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.covered_area}m²</span>
              </div>
            </div>
          </div>
          
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </p>
        </div>
      </Link>
    </div>
  );
};
// src/components/properties/PropertyCard.tsx
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { Property } from '../../services/api';
import { Button } from '../ui/Button';

// URL base para las imágenes
//const API_BASE_URL = 'http://localhost/inmobiliaria-api';
const API_BASE_URL = 'https://codeo.site/api-karttem';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  // Determinar la traducción del estado
  const statusText = {
    'sale': 'Venta',
    'rent': 'Alquiler',
    'temporary_rent': 'Alquiler temporario',
    'sold': 'Vendido',
    'rented': 'Alquilado'
  }[property.status] || property.status;

  // Formatear URL de la imagen
  const formatImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '/placeholder-property.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${API_BASE_URL}/${imageUrl}`;
  };

  // Formatear número con separadores de miles adecuados
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Obtener el texto del precio
  const getPriceText = () => {
    if (property.price_ars) {
      return `$${formatNumber(property.price_ars)}`;
    } else if (property.price_usd) {
      return `U$D ${formatNumber(property.price_usd)}`;
    }
    return 'Consultar';
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hola, estoy interesado/a en la propiedad "${property.title}" (ID: ${property.id}). ¿Podrían brindarme más información?`;
    window.open(`https://wa.me/5492664463038?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary h-full flex flex-col">
      <Link to={`/property/${property.id}`} className="block flex-grow">
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={formatImageUrl(property.main_image || '')}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-primary text-secondary px-3 py-1 rounded-full text-sm font-semibold">
            {statusText}
          </div>
          {property.featured && (
            <div className="absolute top-2 left-2 bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
              Destacada
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.address}, {property.city}</span>
          </div>

          <div className="mt-4">
            <div className="font-bold text-xl text-secondary">
              {getPriceText()}
            </div>
          </div>

          <div className="mt-4 flex justify-between text-sm text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex space-x-4">
              {property.bedrooms !== null && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1 text-primary" />
                  <span>{property.bedrooms}</span>
                </div>
              )}

              {property.bathrooms !== null && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1 text-primary" />
                  <span>{property.bathrooms}</span>
                </div>
              )}

              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1 text-primary" />
                <span>{property.covered_area}m²</span>
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {property.description}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0 mt-auto">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          onClick={handleWhatsAppClick}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Consultar
        </Button>
      </div>
    </div>
  );
};
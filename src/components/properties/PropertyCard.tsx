// src/components/property/PropertyCard.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Star } from 'lucide-react';

// Hay dos aproximaciones para resolver este problema:

// OPCIÓN 1: Modificar la interfaz PropertyCardProps para incluir las propiedades isFavorite y onToggleFavorite
// En src/components/property/PropertyCard.tsx, actualiza la interfaz:

interface PropertyCardProps {
    property: {
        id: number;
        title: string;
        address: string;
        city: string;
        status: string;
        price_ars: string | number;
        price_usd: string | number | null;
        bedrooms: number | null;
        bathrooms: number | null;
        covered_area: string | number;
        total_area?: string | number;
        main_image: string;
        featured?: number;
    };
    index?: number;
    // Añadir estas nuevas propiedades
    isFavorite?: boolean;
    onToggleFavorite?: (id: number) => void;
}

export const PropertyCard = ({
    property,
    index = 0
}: PropertyCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Función para formatear precio
    const formatPrice = (price: string | number | null | undefined) => {
        if (!price) return '0';
        return parseFloat(price.toString()).toLocaleString('es-AR');
    };

    // Obtener texto del estado - ACTUALIZADO con venta en pozo
    const getStatusText = (status: string) => {
        switch (status) {
            case 'sale': return 'En venta';
            case 'rent': return 'En alquiler';
            case 'temporary_rent': return 'Alquiler temporario';
            case 'venta_en_pozo': return 'Venta en Pozo';
            case 'reserved': return 'Reservada';
            case 'sold': return 'Vendida';
            case 'rented': return 'Alquilada';
            default: return status;
        }
    };

    // Obtener clase de color para el estado - ACTUALIZADA con venta en pozo
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'sale': return 'bg-amber-400 text-black';
            case 'rent': return 'bg-blue-500 text-white';
            case 'temporary_rent': return 'bg-teal-500 text-white';
            case 'venta_en_pozo': return 'bg-orange-500 text-white';
            case 'reserved': return 'bg-purple-500 text-white';
            case 'sold': return 'bg-gray-500 text-white';
            case 'rented': return 'bg-gray-500 text-white';
            default: return 'bg-primary text-black';
        }
    };

    // Obtener URL completa de la imagen
    const getFullImageUrl = (imageUrl: string) => {
        if (!imageUrl) return '';

        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }

        //return `http://localhost/inmobiliaria-api/${imageUrl}`;
        return `https://codeo.site/api-karttem/${imageUrl}`;

    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300"
        >
            <Link to={`/property/${property.id}`} className="block h-full">
                {/* Imagen con capa de estado */}
                <div className="relative">
                    {/* Imagen principal */}
                    <div className="w-full aspect-[4/3] overflow-hidden">
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        <img
                            src={getFullImageUrl(property.main_image)}
                            alt={property.title}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            onLoad={() => setImageLoaded(true)}
                            loading="lazy"
                        />
                    </div>

                    {/* Etiqueta de estado */}
                    <div
                        className={`absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full text-sm font-bold ${getStatusClass(property.status)} shadow-md`}
                    >
                        {getStatusText(property.status)}
                    </div>

                    {/* Etiqueta destacada */}
                    {property.featured === 1 && (
                        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                            <Star className="h-3 w-3 fill-white" />
                            <span>Destacada</span>
                        </div>
                    )}
                </div>

                {/* Información de precios */}
                <div className="p-4">
                    {/* Precio */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-3">
                        <div className="font-extrabold text-2xl text-primary">
                            ${formatPrice(property.price_ars)}
                        </div>
                        {property.price_usd && (
                            <div className="text-sm text-gray-500 font-medium">
                                USD ${formatPrice(property.price_usd)}
                            </div>
                        )}
                    </div>

                    {/* Título */}
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 hover:text-primary transition-colors">
                        {property.title}
                    </h3>

                    {/* Dirección */}
                    <div className="flex items-center text-gray-500 mb-4 text-sm">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-primary" />
                        <span className="line-clamp-1">{property.address}, {property.city}</span>
                    </div>

                    {/* Características */}
                    <div className="pt-3 border-t border-gray-100">
                        <div className="flex flex-wrap justify-between text-gray-600 text-sm gap-4">
                            {(property.bedrooms !== null && property.bedrooms > 0) && (
                                <div className="flex items-center">
                                    <Bed className="h-4 w-4 mr-1 text-amber-800" />
                                    <span>
                                        {property.bedrooms} {property.bedrooms === 1 ? 'Dorm.' : 'Dorms.'}
                                    </span>
                                </div>
                            )}

                            {(property.bathrooms !== null && property.bathrooms > 0) && (
                                <div className="flex items-center">
                                    <Bath className="h-4 w-4 mr-1 text-amber-800" />
                                    <span>
                                        {property.bathrooms} {property.bathrooms === 1 ? 'Baño' : 'Baños'}
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center">
                                <Square className="h-4 w-4 mr-1 text-amber-800" />
                                <span>{property.covered_area} m²</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
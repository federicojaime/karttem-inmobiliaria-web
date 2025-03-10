// src/components/home/FeaturedProperties.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bed, Bath, Square, MapPin } from 'lucide-react';
import api, { Property } from '../../services/api';
import { Button } from '../ui/Button';

export const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const response = await api.getFeaturedProperties();
        if (response.ok) {
          setProperties(response.data.slice(0, 4)); // Limitar a 4 propiedades destacadas
        } else {
          setError(response.msg);
        }
      } catch (err) {
        setError('Error al cargar las propiedades destacadas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center">Propiedades Destacadas</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="rounded-lg overflow-hidden bg-muted animate-pulse h-80" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-destructive/10 p-4 rounded-lg">
          <p className="text-center text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center">Propiedades Destacadas</h2>
      <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
        Descubre nuestra selección de propiedades destacadas en las mejores ubicaciones de San Luis.
      </p>
      
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/property/${property.id}`} className="block">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={property.main_image || '/placeholder-property.jpg'} 
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
                  {property.status === 'sale' ? 'Venta' : 
                   property.status === 'rent' ? 'Alquiler' : 
                   property.status === 'temporary_rent' ? 'Alquiler temporario' : 
                   property.status}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                  {property.title}
                </h3>
                
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="line-clamp-1">{property.address}, {property.city}, {property.province}</span>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="font-bold text-lg">
                    {property.price_ars ? `$${property.price_ars.toLocaleString()}` : 
                     property.price_usd ? `U$D ${property.price_usd.toLocaleString()}` : 
                     'Consultar'}
                  </div>
                  
                  <div className="flex space-x-3 text-sm text-muted-foreground">
                    {property.bedrooms && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    
                    {property.bathrooms && (
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
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button asChild>
          <Link to="/properties">
            Ver todas las propiedades
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
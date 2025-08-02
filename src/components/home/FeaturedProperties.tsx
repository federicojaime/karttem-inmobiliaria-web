// src/components/home/FeaturedProperties.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api, { Property } from '../../services/api';
import { Button } from '../ui/Button';
import { PropertyCard } from '../property/PropertyCard';

export const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Cargar propiedades
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await api.getFeaturedProperties();
        if (response.ok) {
          // FILTRAR AQUÍ: SOLO mostrar propiedades DISPONIBLES
          const filteredProperties = response.data
            .filter(prop => 
              prop.status === 'sale' ||           // En venta
              prop.status === 'rent' ||           // En alquiler (disponible)
              prop.status === 'temporary_rent' || // Alquiler temporario (disponible)
              prop.status === 'venta_en_pozo' ||  // Venta en pozo
              prop.status === 'reserved'          // Reservada
            )
            .slice(0, 6); // Mostrar hasta 6 propiedades

          setProperties(filteredProperties);
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

    fetchProperties();

    // Cargar favoritos desde localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Manejar favoritos
  const toggleFavorite = (id: number) => {
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(favId => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Renderizado principal
  return (
    <div className="bg-white">
      {/* Sección principal de propiedades destacadas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-black">Propiedades Destacadas</h2>
              <div className="h-1 w-24 bg-primary my-3"></div>
              <p className="text-gray-600 max-w-2xl">
                Explora nuestra selección de propiedades destacadas disponibles.
              </p>
            </div>
            <Link
              to="/properties"
              className="group hidden md:flex items-center text-primary font-medium hover:text-amber-600 transition-colors"
            >
              <span>Ver todas las propiedades</span>
              <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mensaje de carga */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Mensaje si no hay propiedades */}
          {!loading && properties.length === 0 && (
            <div className="bg-gray-50 rounded-xl py-12 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay propiedades disponibles</h3>
                <p className="text-gray-500 mb-6">
                  Actualmente no hay propiedades destacadas en esta categoría. Por favor, consulta más tarde.
                </p>
              </div>
            </div>
          )}

          {/* Grid de propiedades - Responsive: 1 columna en móvil, 2 en tablet, 3 en desktop */}
          {!loading && properties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={{
                    ...property,
                    price_ars: property.price_ars === null ? '' : property.price_ars,
                    bedrooms: property.bedrooms === null ? 0 : property.bedrooms,
                    bathrooms: property.bathrooms === null ? 0 : property.bathrooms,
                    covered_area: property.covered_area?.toString() || '0',
                    total_area: property.total_area?.toString() || undefined,
                    main_image: property.main_image || '',
                    featured: property.featured ? 1 : undefined
                  }}
                  index={index}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}

          {/* Botón mobile para ver todas */}
          <div className="mt-8 text-center md:hidden">
            <Button asChild>
              <Link to="/properties">
                Ver todas las propiedades
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}; 
// src/components/home/FeaturedProperties.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api, { Property } from '../../services/api';
import { Button } from '../ui/Button';
import { PropertyCard } from '../property/PropertyCard';

export const FeaturedProperties = () => {
  const [saleProperties, setSaleProperties] = useState<Property[]>([]);
  const [rentProperties, setRentProperties] = useState<Property[]>([]);
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
          // Filtrar propiedades por estado
          const salesProps = response.data
            .filter(prop => prop.status === 'sale')
            .slice(0, 5);

          const rentProps = response.data
            .filter(prop => prop.status === 'rent' || prop.status === 'temporary_rent')
            .slice(0, 5);

          setSaleProperties(salesProps);
          setRentProperties(rentProps);
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

  // Componente de sección de propiedades
  const PropertySection = ({
    title,
    subtitle,
    accentColor,
    properties,
    viewAllLink,
    viewAllText,
    backgroundColor = "bg-white"
  }: {
    title: string;
    subtitle: string;
    accentColor: string;
    properties: Property[];
    viewAllLink: string;
    viewAllText: string;
    backgroundColor?: string;
  }) => (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-black">{title}</h2>
            <div className={`h-1 w-24 ${accentColor} my-3`}></div>
            <p className="text-gray-600 max-w-2xl">
              {subtitle}
            </p>
          </div>
          <Link
            to={viewAllLink}
            className="group hidden md:flex items-center text-primary font-medium hover:text-amber-600 transition-colors"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mensaje de carga */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${accentColor}`}></div>
          </div>
        )}

        {/* Mensaje si no hay propiedades */}
        {!loading && properties.length === 0 && (
          <div className={`${backgroundColor === 'bg-white' ? 'bg-gray-50' : 'bg-white'} rounded-xl py-12 text-center`}>
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay propiedades disponibles</h3>
              <p className="text-gray-500 mb-6">
                Actualmente no hay propiedades destacadas en esta categoría. Por favor, consulta más tarde.
              </p>
            </div>
          </div>
        )}

        {/* Grid de propiedades - Ahora uniforme con 3 columnas como máximo */}
        {!loading && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((property, index) => (
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
            <Link to={viewAllLink}>
              {viewAllText}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );

  // Renderizado principal
  return (
    <div className="bg-white">
      {/* Propiedades en Venta */}
      <PropertySection
        title="Propiedades en Venta"
        subtitle="Descubre nuestra selección de propiedades destacadas a la venta en las mejores ubicaciones."
        accentColor="bg-amber-400"
        properties={saleProperties}
        viewAllLink="/properties?estado=sale"
        viewAllText="Ver todas las propiedades en venta"
      />

      {/* Propiedades en Alquiler */}
      <PropertySection
        title="Propiedades en Alquiler"
        subtitle="Encuentra tu próximo hogar con nuestra selección de propiedades destacadas en alquiler."
        accentColor="bg-blue-500"
        properties={rentProperties}
        viewAllLink="/properties?estado=rent"
        viewAllText="Ver todas las propiedades en alquiler"
        backgroundColor="bg-gray-50"
      />

      {/* Sección de propiedades aleatorias */}
      <PropertySection
        title="Propiedades Destacadas"
        subtitle="Explora nuestra selección de propiedades destacadas en diversas categorías."
        accentColor="bg-primary"
        properties={[...saleProperties, ...rentProperties]
          .sort(() => Math.random() - 0.5) // Mezclar aleatoriamente
          .slice(0, 3)} // Tomar solo 3
        viewAllLink="/properties"
        viewAllText="Ver todas las propiedades"
      />
    </div>
  );
};
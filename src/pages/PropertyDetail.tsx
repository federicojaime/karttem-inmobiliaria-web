// src/pages/PropertyDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag, MapPin, Building, CalendarClock, Heart, Share } from 'lucide-react';
import { Property } from '../services/api';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { PropertyGallery } from '../components/property/PropertyGallery';
import { PropertyFeatures } from '../components/property/PropertyFeatures';
import { PropertyMap } from '../components/property/PropertyMap';
import { PropertyContact } from '../components/property/PropertyContact';
import { PROVINCES } from '../data/locations'; // Importar la lista de provincias

export const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await api.getPublicProperty(id!);
        if (response.ok) {
          setProperty(response.data);
        } else {
          setError(response.msg);
        }
      } catch (err) {
        setError('Error al cargar la propiedad');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded-md w-1/3"></div>
          <div className="aspect-video bg-muted rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="h-6 bg-muted rounded-md w-1/2"></div>
              <div className="h-32 bg-muted rounded-md"></div>
              <div className="h-64 bg-muted rounded-md"></div>
            </div>
            <div className="h-96 bg-muted rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-destructive/10 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-lg text-destructive mb-6">{error || 'No se pudo cargar la propiedad'}</p>
          <Button asChild>
            <Link to="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a propiedades
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Status text
  const statusText = {
    'sale': 'Venta',
    'rent': 'Alquiler',
    'temporary_rent': 'Alquiler temporario',
    'sold': 'Vendido',
    'rented': 'Alquilado'
  }[property.status] || property.status;

  // Price text
  const getPriceText = () => {
    if (property.price_ars) {
      return `$${property.price_ars.toLocaleString()}`;
    } else if (property.price_usd) {
      return `U$D ${property.price_usd.toLocaleString()}`;
    }
    return 'Consultar';
  };

  // Obtener el nombre legible de la provincia a partir del ID
  const getProvinceName = (provinceId) => {
    // Buscar la provincia en el array de PROVINCES
    const province = PROVINCES.find(p => p.id === provinceId);
    // Si se encuentra, devolver su nombre, de lo contrario devolver el ID
    return province ? province.name : provinceId;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Botón volver a propiedades */}
      <div className="mb-6">
        <Link 
          to="/properties" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a propiedades
        </Link>
      </div>
      
      {/* Título y detalles principales de la propiedad */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="w-full">
          <h1 className="text-3xl font-bold break-words">{property.title}</h1>
          <div className="flex flex-wrap items-center mt-3 text-muted-foreground gap-3">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {property.address}, {property.city}, {getProvinceName(property.province)}
              </span>
            </div>
            
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{property.type_name || property.type}</span>
            </div>
            
            <div className="flex items-center">
              <CalendarClock className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>Publicado: {new Date(property.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        {/* Botones de acción pueden ir aquí si necesitas añadirlos */}
      </div>
      
      {/* Galería de imágenes */}
      <PropertyGallery images={property.images} title={property.title} />
      
      {/* Contenido principal y sidebar */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna principal */}
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
            <div className="prose prose-stone max-w-none">
              <p>{property.description}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Características y Amenities</h2>
            <PropertyFeatures property={property} />
          </div>
          
          {(property.latitude && property.longitude) && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ubicación</h2>
              <PropertyMap 
                latitude={property.latitude} 
                longitude={property.longitude} 
                title={property.title} 
                address={`${property.address}, ${property.city}, ${getProvinceName(property.province)}`}
              />
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                <Tag className="h-4 w-4 mr-1" />
                {statusText}
              </div>
              {property.featured && (
                <div className="inline-flex items-center bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full">
                  Destacada
                </div>
              )}
            </div>
            
            <div className="text-3xl font-bold mb-4">
              {getPriceText()}
            </div>
            
            {/* Botones de acción */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex items-center justify-center"
                onClick={() => {/* Lógica para guardar */}}
              >
                <Heart className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center"
                onClick={() => {/* Lógica para compartir */}}
              >
                <Share className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
          
          {/* Componente de contacto */}
          <PropertyContact property={property} />
        </div>
      </div>
    </div>
  );
};
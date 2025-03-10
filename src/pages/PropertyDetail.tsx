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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link 
          to="/properties" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a propiedades
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <div className="flex flex-wrap items-center mt-2 text-muted-foreground gap-2">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {property.address}, {property.city}, {property.province}
            </span>
            
            <span className="flex items-center ml-4">
              <Building className="h-4 w-4 mr-1" />
              {property.type_name || property.type}
            </span>
            
            <span className="flex items-center ml-4">
              <CalendarClock className="h-4 w-4 mr-1" />
              Publicado: {new Date(property.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Guardar
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
      </div>
      
      <PropertyGallery images={property.images} title={property.title} />
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                address={property.address}
              />
            </div>
          )}
        </div>
        
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
            
            {(property.owner && property.owner.name) && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Propietario:</p>
                <p className="font-medium">{property.owner.name}</p>
              </div>
            )}
          </div>
          
          <PropertyContact property={property} />
        </div>
      </div>
    </div>
  );
};
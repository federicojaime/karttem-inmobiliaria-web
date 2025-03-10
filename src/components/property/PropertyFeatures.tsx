// src/components/property/PropertyFeatures.tsx
import { 
    Bed, Bath, AreaChart, Car, Zap, Waves , Flame, 
    TreeDeciduous, Wind, Home, Maximize, Check
  } from 'lucide-react';
  import { Property } from '../../services/api';
  
  interface PropertyFeaturesProps {
    property: Property;
  }
  
  export const PropertyFeatures = ({ property }: PropertyFeaturesProps) => {
    // Main features
    const mainFeatures = [
      { name: 'Habitaciones', value: property.bedrooms, icon: <Bed className="h-5 w-5" /> },
      { name: 'Baños', value: property.bathrooms, icon: <Bath className="h-5 w-5" /> },
      { name: 'Superficie Cubierta', value: `${property.covered_area}m²`, icon: <Home className="h-5 w-5" /> },
      { name: 'Superficie Total', value: `${property.total_area}m²`, icon: <AreaChart className="h-5 w-5" /> },
      { name: 'Cochera', value: property.garage ? 'Sí' : 'No', icon: <Car className="h-5 w-5" /> },
    ];
  
    // Property features
    const propertyFeatures = [
      { name: 'Electricidad', value: property.has_electricity, icon: <Zap className="h-5 w-5" /> },
      { name: 'Gas Natural', value: property.has_natural_gas, icon: <Flame className="h-5 w-5" /> },
      { name: 'Cloacas', value: property.has_sewage, icon: <Waves  className="h-5 w-5" /> },
      { name: 'Calle Pavimentada', value: property.has_paved_street, icon: <Car className="h-5 w-5" /> },
    ];
  
    // Amenities
    const amenities = [
      { name: 'Piscina', value: property.amenities?.has_pool, icon: <Waves  className="h-5 w-5" /> },
      { name: 'Calefacción', value: property.amenities?.has_heating, icon: <Flame className="h-5 w-5" /> },
      { name: 'Aire Acondicionado', value: property.amenities?.has_ac, icon: <Wind className="h-5 w-5" /> },
      { name: 'Jardín', value: property.amenities?.has_garden, icon: <TreeDeciduous className="h-5 w-5" /> },
      { name: 'Lavadero', value: property.amenities?.has_laundry, icon: <Waves  className="h-5 w-5" /> },
      { name: 'Estacionamiento', value: property.amenities?.has_parking, icon: <Car className="h-5 w-5" /> },
      { name: 'Calefacción Central', value: property.amenities?.has_central_heating, icon: <Flame className="h-5 w-5" /> },
      { name: 'Césped', value: property.amenities?.has_lawn, icon: <TreeDeciduous className="h-5 w-5" /> },
      { name: 'Chimenea', value: property.amenities?.has_fireplace, icon: <Flame className="h-5 w-5" /> },
      { name: 'Aire Acondicionado Central', value: property.amenities?.has_central_ac, icon: <Wind className="h-5 w-5" /> },
      { name: 'Techos Altos', value: property.amenities?.has_high_ceiling, icon: <Maximize className="h-5 w-5" /> },
    ].filter(item => item.value);
  
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {mainFeatures.map((feature, index) => (
            feature.value !== null && feature.value !== undefined && (
              <div key={index} className="bg-secondary text-white p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">{feature.icon}</div>
                <p className="font-semibold">{feature.value}</p>
                <p className="text-sm text-muted-foreground">{feature.name}</p>
              </div>
            )
          ))}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Características</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {propertyFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`flex items-center p-3 rounded-md ${
                  feature.value ? 'bg-primary/10' : 'bg-muted'
                }`}
              >
                {feature.icon}
                <span className="ml-2">{feature.name}</span>
                {feature.value && (
                  <Check className="h-4 w-4 ml-auto text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {amenities.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center p-3 rounded-md bg-primary/10">
                  {amenity.icon}
                  <span className="ml-2">{amenity.name}</span>
                  <Check className="h-4 w-4 ml-auto text-primary" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
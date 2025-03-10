// src/components/property/PropertyMap.tsx
declare module 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '../ui/Button';
import { Layers } from 'lucide-react';

// Fix Leaflet marker icon issue
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
}

export const PropertyMap = ({ latitude, longitude, title, address }: PropertyMapProps) => {
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');

  // Map URLs
  const mapUrls = {
    standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  if (!latitude || !longitude) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Ubicación no disponible</p>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden border border-border">
      <MapContainer
        center={[latitude, longitude] as [number, number]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' as any}
          url={mapUrls[mapType]}
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="p-1">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm">{address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      <div className="absolute top-3 right-3 z-[1000]">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
        >
          <Layers className="h-4 w-4 mr-2" />
          {mapType === 'standard' ? 'Satélite' : 'Mapa'}
        </Button>
      </div>
    </div>
  );
};
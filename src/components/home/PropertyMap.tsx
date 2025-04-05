// src/components/home/PropertyMap.tsx
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, Square, ExternalLink, Layers } from 'lucide-react';
import { Button } from '../ui/Button';
import api, { Property } from '../../services/api';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issue
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet icon issue
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// URL base para las imágenes
const API_BASE_URL = 'https://codeo.site/api-karttem';

// Coordenadas de San Luis capital
const SAN_LUIS_COORDS = [-33.3022, -66.3377]; // Latitud, Longitud
const DEFAULT_ZOOM = 12;

export const PropertyMap = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
    const navigate = useNavigate();

    // Cargar propiedades
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const response = await api.getPublicProperties();
                if (response.ok) {
                    // Filtrar propiedades que tienen coordenadas válidas
                    let propertiesWithCoords = response.data.filter(
                        (prop) => prop.latitude && prop.longitude
                    );

                    // Si no hay propiedades con coordenadas, generar algunas para demo
                    if (propertiesWithCoords.length === 0) {
                        propertiesWithCoords = response.data.slice(0, 10).map((prop) => {
                            // Generar coordenadas aleatorias alrededor de San Luis
                            const randomLat = SAN_LUIS_COORDS[0] + (Math.random() - 0.5) * 0.05;
                            const randomLng = SAN_LUIS_COORDS[1] + (Math.random() - 0.5) * 0.05;

                            return {
                                ...prop,
                                latitude: randomLat,
                                longitude: randomLng
                            };
                        });
                    }

                    setProperties(propertiesWithCoords);
                }
            } catch (err) {
                console.error('Error al cargar propiedades:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Formatear URL de la imagen
    const formatImageUrl = (imageUrl: string) => {
        if (!imageUrl) return '/placeholder-property.jpg';
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${API_BASE_URL}/${imageUrl}`;
    };

    // Formatear número con separadores de miles
    const formatNumber = (num: number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // Obtener texto del precio
    const getPriceText = (property: Property) => {
        if (property.price_ars) {
            return `$${formatNumber(property.price_ars)}`;
        } else if (property.price_usd) {
            return `U$D ${formatNumber(property.price_usd)}`;
        }
        return 'Consultar';
    };

    // Obtener texto del estado
    const getStatusText = (status: string) => {
        switch (status) {
            case 'sale': return 'Venta';
            case 'rent': return 'Alquiler';
            case 'temporary_rent': return 'Alquiler temporario';
            default: return status;
        }
    };

    // Navegar a la página de detalle
    const handleViewProperty = (propertyId: number) => {
        navigate(`/property/${propertyId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="h-[500px] md:h-[600px] w-full rounded-xl overflow-hidden shadow-xl border border-gray-200">
            <MapContainer
                center={SAN_LUIS_COORDS as [number, number]}
                zoom={DEFAULT_ZOOM}
                style={{ height: '100%', width: '100%' }}
                className="max-w-full"
                scrollWheelZoom={true}
                zoomControl={false}
                attributionControl={false}
            >
                {mapType === 'standard' ? (
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                ) : (
                    <TileLayer
                        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                )}

                <ZoomControl position="bottomright" />

                {/* Control para cambiar tipo de mapa */}
                <div className="leaflet-top leaflet-right">
                    <div className="leaflet-control leaflet-bar" style={{ margin: '10px' }}>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="shadow-md"
                            onClick={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
                            style={{ zIndex: 1000 }}
                        >
                            <Layers className="h-4 w-4 mr-2" />
                            {mapType === 'standard' ? 'Satélite' : 'Mapa'}
                        </Button>
                    </div>
                </div>

                {properties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.latitude!, property.longitude!] as [number, number]}
                    >
                        <Popup className="property-popup" minWidth={280} maxWidth={320}>
                            <div className="popup-content">
                                <div className="relative h-32 w-full mb-2 overflow-hidden rounded-md">
                                    <img
                                        src={formatImageUrl(property.main_image || (property.images[0]?.image_url || ''))}
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-primary text-secondary px-2 py-1 rounded-full text-xs font-semibold">
                                        {getStatusText(property.status)}
                                    </div>
                                </div>

                                <div className="p-1">
                                    <h3 className="text-base font-bold leading-tight mb-1 truncate">{property.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2 truncate">{property.address}, {property.city}</p>
                                    <div className="font-bold text-lg text-secondary mb-2">{getPriceText(property)}</div>
                                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                        {property.description.substring(0, 100)}{property.description.length > 100 ? '...' : ''}
                                    </p>

                                    <div className="flex justify-between text-xs text-gray-600 mb-3">
                                        {property.bedrooms !== null && (
                                            <div className="flex items-center">
                                                <Bed className="h-3 w-3 mr-1 text-primary" />
                                                <span>{property.bedrooms}</span>
                                            </div>
                                        )}

                                        {property.bathrooms !== null && (
                                            <div className="flex items-center">
                                                <Bath className="h-3 w-3 mr-1 text-primary" />
                                                <span>{property.bathrooms}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center">
                                            <Square className="h-3 w-3 mr-1 text-primary" />
                                            <span>{property.covered_area}m²</span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full mt-2 flex items-center justify-center text-sm py-1"
                                        onClick={() => handleViewProperty(property.id)}
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Ver propiedad
                                    </Button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
// src/components/home/PropertyMap.tsx
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, Square, ExternalLink, Layers } from 'lucide-react';
import { Button } from '../ui/Button';
import api, { Property } from '../../services/api';
import 'leaflet/dist/leaflet.css';
import { getPropertyPrice } from '../../utils/format';


// Fix Leaflet marker icon issue
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// URL base para las imágenes
const API_BASE_URL = 'https://codeo.site/api-karttem';

// Coordenadas de San Luis capital
const SAN_LUIS_COORDS = [-33.3022, -66.3377]; // Latitud, Longitud
const DEFAULT_ZOOM = 12;

// Crear íconos personalizados para los marcadores
const createMarkerIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
    });
};

// Íconos de marcadores por estado
const markerIcons = {
    sale: createMarkerIcon('#ff0000'), // Rojo para En Venta
    rent: createMarkerIcon('#008080'), // Verde azulado para En Alquiler
    default: L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    })
};

export const PropertyMap = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
    const [showLegend, setShowLegend] = useState(false); // Leyenda oculta por defecto
    const navigate = useNavigate();

    // Cargar propiedades
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const response = await api.getPublicProperties();
                if (response.ok) {
                    // Filtrar propiedades disponibles con coordenadas válidas
                    let propertiesWithCoords = response.data
                        .filter(prop =>
                            prop.latitude &&
                            prop.longitude &&
                            (prop.status === 'sale' || prop.status === 'rent')
                        );

                    // Si no hay propiedades con coordenadas, generar algunas para demo
                    if (propertiesWithCoords.length === 0) {
                        // Tomar solo las propiedades en venta o alquiler
                        const availableProps = response.data
                            .filter(prop => prop.status === 'sale' || prop.status === 'rent')
                            .slice(0, 10);

                        propertiesWithCoords = availableProps.map((prop) => {
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

    // Obtener el icono adecuado para el marcador
    const getMarkerIcon = (property: Property) => {
        return markerIcons[property.status as keyof typeof markerIcons] || markerIcons.default;
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

                {/* Controles del mapa */}
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

                    <div className="leaflet-control leaflet-bar" style={{ margin: '10px', marginTop: '55px' }}>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="shadow-md"
                            onClick={() => setShowLegend(!showLegend)}
                            style={{ zIndex: 1000 }}
                        >
                            {showLegend ? 'Ocultar leyenda' : 'Mostrar leyenda'}
                        </Button>
                    </div>
                </div>

                {/* Leyenda - Ahora en la esquina superior derecha */}
                {showLegend && (
                    <div className="leaflet-top leaflet-right">
                        <div
                            className="leaflet-control"
                            style={{
                                margin: '10px',
                                marginTop: '70px',
                                backgroundColor: 'white',
                                padding: '8px 10px',
                                borderRadius: '4px',
                                boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
                                border: '1px solid #ccc',
                                zIndex: 1001 // Asegurar que esté por encima de otros controles
                            }}
                        >
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <div style={{
                                        backgroundColor: '#ff0000',
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        marginRight: '8px'
                                    }}></div>
                                    <span className="text-xs">En Venta</span>
                                </div>
                                <div className="flex items-center">
                                    <div style={{
                                        backgroundColor: '#008080',
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        marginRight: '8px'
                                    }}></div>
                                    <span className="text-xs">En Alquiler</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Marcadores de propiedades */}
                {properties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.latitude!, property.longitude!] as [number, number]}
                        icon={getMarkerIcon(property)}
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
                                    <div className="font-bold text-lg text-secondary mb-2">
                                        {getPropertyPrice(property)}
                                    </div>
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
                                            <span>{property.covered_area} m²</span>
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
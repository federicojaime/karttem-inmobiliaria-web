// src/pages/Properties.tsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PropertyCard } from '../components/properties/PropertyCard';
import { PropertyFilter } from '../components/properties/PropertyFilter';
import { Pagination } from '../components/ui/Pagination';
import api, { Property, PropertyType } from '../services/api';

export const Properties = () => {
    const [searchParams] = useSearchParams();
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        type_id: searchParams.get('type_id') || '',
        status: searchParams.get('status') || '',
        min_price_ars: searchParams.get('min_price_ars') || '',
        max_price_ars: searchParams.get('max_price_ars') || '',
        min_price_usd: searchParams.get('min_price_usd') || '',
        max_price_usd: searchParams.get('max_price_usd') || '',
        bedrooms: searchParams.get('bedrooms') || '',
        bathrooms: searchParams.get('bathrooms') || '',
        city: searchParams.get('city') || '',
        search: searchParams.get('search') || '',
    });

    // Fetch property types
    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await api.getPropertyTypes();
                if (response.ok) {
                    setPropertyTypes(response.data);
                }
            } catch (err) {
                console.error('Error fetching property types:', err);
            }
        };

        fetchPropertyTypes();
    }, []);

    // Fetch properties with filters
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                // Remove empty filters
                const activeFilters = Object.fromEntries(
                    Object.entries(filters).filter(([_, value]) => value !== '')
                );

                const response = await api.searchProperties({
                    ...activeFilters,
                    page: currentPage,
                    limit: 12
                });

                if (response.ok) {
                    console.log('Propiedades cargadas:', response.data);

                    setProperties(response.data);
                    // For pagination - this would be handled differently with a real API that returns pagination info
                    setTotalPages(Math.ceil(response.data.length / 12));
                } else {
                    setError(response.msg);
                }
            } catch (err) {
                setError('Error al cargar las propiedades');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [filters, currentPage]);

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page on filter change
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold">Propiedades</h1>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <PropertyFilter
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        propertyTypes={propertyTypes}
                    />
                </div>

                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="rounded-lg overflow-hidden bg-muted animate-pulse h-80" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="bg-destructive/10 p-4 rounded-lg">
                            <p className="text-center text-destructive">{error}</p>
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="bg-muted p-8 rounded-lg text-center">
                            <h3 className="text-xl font-semibold">No se encontraron propiedades</h3>
                            <p className="text-muted-foreground mt-2">
                                Intenta cambiar los filtros de búsqueda para encontrar propiedades disponibles.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {properties.map(property => (
                                    <PropertyCard 
                                        key={property.id} 
                                        property={{
                                            id: property.id,
                                            title: property.title,
                                            address: property.address,
                                            city: property.city,
                                            status: property.status,
                                            price_ars: property.price_ars,
                                            price_usd: property.price_usd,
                                            bedrooms: property.bedrooms,
                                            bathrooms: property.bathrooms,
                                            covered_area: property.covered_area,
                                            total_area: property.total_area,
                                            main_image: property.main_image || '',
                                            featured: property.featured
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="mt-8">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
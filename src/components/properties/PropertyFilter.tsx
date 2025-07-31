// src/components/properties/PropertyFilter.tsx
import { ChangeEvent, FormEvent, useState } from 'react';
import { Search, Sliders } from 'lucide-react';
import { Button } from '../ui/Button';
import { PropertyType } from '../../services/api';

interface PropertyFilterProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  propertyTypes: PropertyType[];
}

export const PropertyFilter = ({ filters, onFilterChange, propertyTypes }: PropertyFilterProps) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev: Record<string, string>) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFilterChange(localFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const emptyFilters = Object.keys(localFilters).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {} as Record<string, string>);

    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
    setIsOpen(false);
  };

  return (
    <div className="bg-card rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
        >
          <Sliders className="h-4 w-4 mr-2" />
          {isOpen ? 'Ocultar' : 'Mostrar'}
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`space-y-4 ${isOpen ? 'block' : 'hidden lg:block'}`}
      >
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-1">
            Búsqueda
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              name="search"
              value={localFilters.search}
              onChange={handleChange}
              placeholder="Buscar por título, dirección..."
              className="w-full rounded-md border-border pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label htmlFor="type_id" className="block text-sm font-medium mb-1">
            Tipo de propiedad
          </label>
          <select
            id="type_id"
            name="type_id"
            value={localFilters.type_id}
            onChange={handleChange}
            className="w-full rounded-md border-border px-4 py-2"
          >
            <option value="">Todas</option>
            {propertyTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Operación
          </label>
          <select
            id="status"
            name="status"
            value={localFilters.status}
            onChange={handleChange}
            className="w-full rounded-md border-border px-4 py-2"
          >
            <option value="">Todas</option>
            <option value="sale">Venta</option>
            <option value="rent">Alquiler</option>
            <option value="venta_en_pozo">Venta en Pozo</option>
          </select>
        </div>

        {/* Price ARS Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Precio ARS
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                id="min_price_ars"
                name="min_price_ars"
                value={localFilters.min_price_ars}
                onChange={handleChange}
                placeholder="Mínimo"
                className="w-full rounded-md border-border px-4 py-2"
              />
            </div>
            <div>
              <input
                type="number"
                id="max_price_ars"
                name="max_price_ars"
                value={localFilters.max_price_ars}
                onChange={handleChange}
                placeholder="Máximo"
                className="w-full rounded-md border-border px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Price USD Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Precio USD
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                id="min_price_usd"
                name="min_price_usd"
                value={localFilters.min_price_usd}
                onChange={handleChange}
                placeholder="Mínimo"
                className="w-full rounded-md border-border px-4 py-2"
              />
            </div>
            <div>
              <input
                type="number"
                id="max_price_usd"
                name="max_price_usd"
                value={localFilters.max_price_usd}
                onChange={handleChange}
                placeholder="Máximo"
                className="w-full rounded-md border-border px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium mb-1">
              Habitaciones
            </label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={localFilters.bedrooms}
              onChange={handleChange}
              className="w-full rounded-md border-border px-4 py-2"
            >
              <option value="">Todos</option>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}+</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium mb-1">
              Baños
            </label>
            <select
              id="bathrooms"
              name="bathrooms"
              value={localFilters.bathrooms}
              onChange={handleChange}
              className="w-full rounded-md border-border px-4 py-2"
            >
              <option value="">Todos</option>
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num}+</option>
              ))}
            </select>
          </div>
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={localFilters.city}
            onChange={handleChange}
            placeholder="Ej: San Luis"
            className="w-full rounded-md border-border px-4 py-2"
          />
        </div>

        <div className="flex flex-col space-y-2 pt-4">
          <Button type="submit" className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Aplicar filtros
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            className="w-full"
          >
            Limpiar filtros
          </Button>
        </div>
      </form>
    </div>
  );
};
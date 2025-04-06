// src/utils/format.ts

/**
 * Formatea un número eliminando los centavos y agregando separadores de miles
 * @param value Número a formatear
 * @returns Cadena formateada
 */
export const formatNumber = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined || value === '') return '0';
    
    // Convertir a número si es string
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // Redondear para eliminar centavos
    const roundedValue = Math.round(numValue);
    
    // Formatear con separadores de miles (punto como separador de miles)
    return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  /**
   * Formatea un precio según la moneda
   * @param price Valor del precio
   * @param currency Moneda (ARS o USD)
   * @returns Precio formateado
   */
  export const formatPrice = (
    price: number | string | null | undefined, 
    currency: 'ARS' | 'USD' = 'ARS'
  ): string => {
    if (!price) return 'Consultar';
    
    const formattedValue = formatNumber(price);
    
    return currency === 'ARS' 
      ? `$${formattedValue}` 
      : `U$D ${formattedValue}`;
  };
  
  /**
   * Formatea el precio de una propiedad según su disponibilidad
   * @param property Propiedad con price_ars y price_usd
   * @returns Precio formateado
   */
  export const getPropertyPrice = (property: { 
    price_ars: number | null; 
    price_usd: number | null 
  }): string => {
    if (property.price_ars) {
      return formatPrice(property.price_ars, 'ARS');
    } else if (property.price_usd) {
      return formatPrice(property.price_usd, 'USD');
    }
    return 'Consultar';
  };
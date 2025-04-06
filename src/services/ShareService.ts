// src/services/ShareService.ts
import { Property } from './api';
import { getPropertyPrice } from '../utils/format';

/**
 * Servicio para compartir propiedades a través de diferentes plataformas
 */
export class ShareService {
  /**
   * Comparte una propiedad por WhatsApp
   * @param property Propiedad a compartir
   * @param currentUrl URL actual
   */
  static shareByWhatsApp(property: Property, currentUrl: string): void {
    const priceText = getPropertyPrice(property);
    const statusText = this.getStatusText(property.status);
    const typeText = property.type_name || property.type || 'Propiedad';
    
    const text = encodeURIComponent(
      `¡Mira esta ${typeText} en ${statusText.toLowerCase()} en KARTTEM Inmobiliaria!\n\n` +
      `📍 ${property.address}, ${property.city}\n` +
      `💰 ${priceText}\n\n` +
      `${property.description ? property.description.substring(0, 100) + '...\n\n' : ''}` +
      `Más detalles: ${currentUrl}`
    );
    
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  /**
   * Comparte una propiedad por correo electrónico
   * @param property Propiedad a compartir
   * @param currentUrl URL actual
   */
  static shareByEmail(property: Property, currentUrl: string): void {
    const priceText = getPropertyPrice(property);
    const statusText = this.getStatusText(property.status);
    const typeText = property.type_name || property.type || 'Propiedad';
    
    const subject = encodeURIComponent(`${typeText} en ${statusText.toLowerCase()} - ${property.address}`);
    const body = encodeURIComponent(
      `¡Mira esta propiedad que encontré en KARTTEM Inmobiliaria!\n\n` +
      `${property.title}\n` +
      `Ubicación: ${property.address}, ${property.city}\n` +
      `Precio: ${priceText}\n\n` +
      `${property.description ? property.description + '\n\n' : ''}` +
      `Características principales:\n` +
      `${property.bedrooms !== null ? '- Habitaciones: ' + property.bedrooms + '\n' : ''}` +
      `${property.bathrooms !== null ? '- Baños: ' + property.bathrooms + '\n' : ''}` +
      `${property.covered_area ? '- Superficie cubierta: ' + property.covered_area + ' m²\n' : ''}` +
      `${property.total_area ? '- Superficie total: ' + property.total_area + ' m²\n\n' : '\n'}` +
      `Más detalles: ${currentUrl}`
    );
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  /**
   * Comparte una propiedad en Facebook
   * @param currentUrl URL actual
   */
  static shareByFacebook(currentUrl: string): void {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  }

  /**
   * Comparte una propiedad en Twitter/X
   * @param property Propiedad a compartir
   * @param currentUrl URL actual
   */
  static shareByTwitter(property: Property, currentUrl: string): void {
    const priceText = getPropertyPrice(property);
    const text = encodeURIComponent(`${property.title} - ${priceText} | KARTTEM Inmobiliaria`);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
  }

  /**
   * Copia el enlace de la propiedad al portapapeles
   * @param currentUrl URL actual
   * @returns Promise que se resuelve cuando se ha copiado el enlace
   */
  static async copyLink(currentUrl: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(currentUrl);
      return true;
    } catch (err) {
      console.error('Error al copiar: ', err);
      return false;
    }
  }

  /**
   * Comparte usando la API nativa de navegador Web Share
   * @param property Propiedad a compartir
   * @param currentUrl URL actual
   * @returns Promise que se resuelve cuando se ha compartido
   */
  static async shareNative(property: Property, currentUrl: string): Promise<boolean> {
    if (!navigator.share) return false;
    
    try {
      const priceText = getPropertyPrice(property);
      await navigator.share({
        title: `${property.title} - ${priceText}`,
        text: `${property.title} - ${property.address}, ${property.city}`,
        url: currentUrl
      });
      return true;
    } catch (err) {
      console.error('Error al compartir:', err);
      return false;
    }
  }
  
  /**
   * Obtiene el texto del estado de la propiedad
   */
  private static getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'sale': 'En Venta',
      'rent': 'En Alquiler',
      'temporary_rent': 'Alquiler Temporario',
      'sold': 'Vendido',
      'rented': 'Alquilado',
      'reserved': 'Reservado'
    };
    
    return statusMap[status] || status;
  }
}
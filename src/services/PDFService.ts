// src/services/PDFService.ts
import jsPDF from 'jspdf';
import { Property } from './api';
import { getPropertyPrice } from '../utils/format';

export class PDFService {
  /**
   * Genera un PDF con un diseño personalizado de la propiedad
   * @param property Datos de la propiedad
   * @returns Promise<void>
   */
  static async generatePropertyPDF(property: Property): Promise<void> {
    try {
      setLoading(true);
      
      // Crear documento PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Crear PDF con diseño personalizado
      await this.createCustomPDF(pdf, property);
      
      // Guardar el PDF
      pdf.save(`KARTTEM-Propiedad-${property.id}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      throw new Error('No se pudo generar el PDF');
    } finally {
      setLoading(false);
    }
  }
  
  /**
   * Crea un PDF con diseño personalizado sin depender de captura de pantalla
   */
  private static async createCustomPDF(pdf: jsPDF, property: Property) {
    // Constantes para el diseño
    const pageWidth = 210; // Ancho A4 en mm
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    
    // Añadir encabezado
    this.addHeader(pdf, property);
    
    // Posición vertical actual
    let yPos = 40;
    
    // Título de la propiedad
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`${property.title}`, margin, yPos);
    yPos += 8;
    
    // Dirección
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(80, 80, 80);
    pdf.text(`${property.address}, ${property.city}`, margin, yPos);
    yPos += 10;
    
    // Añadir imágenes si están disponibles
    if (property.images && property.images.length > 0) {
      try {
        // Usar la primera imagen como principal
        const imageUrl = this.getFullImageUrl(property.images[0].image_url);
        const img = await this.loadImage(imageUrl);
        
        // Calcular dimensiones manteniendo relación de aspecto
        const imgWidth = contentWidth;
        const imgHeight = (img.height * imgWidth) / img.width;
        
        // Añadir imagen
        pdf.addImage(img.src, 'JPEG', margin, yPos, imgWidth, imgHeight);
        yPos += imgHeight + 10;
        
        // Añadir miniaturas si hay más imágenes
        if (property.images.length > 1) {
          const thumbsPerRow = 3;
          const thumbWidth = (contentWidth - (thumbsPerRow - 1) * 5) / thumbsPerRow;
          
          let xThumbPos = margin;
          const initialYThumb = yPos;
          let rowHeight = 0;
          
          // Añadir hasta 6 miniaturas adicionales
          for (let i = 1; i < Math.min(7, property.images.length); i++) {
            const thumbUrl = this.getFullImageUrl(property.images[i].image_url);
            const thumbImg = await this.loadImage(thumbUrl);
            
            // Calcular altura manteniendo relación de aspecto
            const thumbHeight = (thumbImg.height * thumbWidth) / thumbImg.width;
            rowHeight = Math.max(rowHeight, thumbHeight);
            
            // Añadir miniatura
            pdf.addImage(thumbImg.src, 'JPEG', xThumbPos, yPos, thumbWidth, thumbHeight);
            
            // Actualizar posición para la siguiente miniatura
            xThumbPos += thumbWidth + 5;
            
            // Nueva fila después de cada 3 miniaturas
            if ((i % thumbsPerRow) === 0) {
              yPos += rowHeight + 5;
              xThumbPos = margin;
              rowHeight = 0;
            }
          }
          
          // Actualizar posición vertical después de las miniaturas
          yPos = initialYThumb + (Math.ceil(Math.min(6, property.images.length - 1) / thumbsPerRow) * (rowHeight + 5));
        }
      } catch (error) {
        console.error('Error al cargar imágenes:', error);
        yPos += 10; // Incrementar posición si hay error
      }
    }
    
    yPos += 10;
    
    // Línea separadora
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 8;
    
    // Sección de precio
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(getPropertyPrice(property), margin, yPos);
    
    // Estado de la propiedad (venta, alquiler, etc)
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    const statusText = this.getStatusText(property.status);
    const statusWidth = pdf.getTextWidth(statusText);
    pdf.text(statusText, pageWidth - margin - statusWidth, yPos);
    yPos += 12;
    
    // Descripción
    if (property.description) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(40, 40, 40);
      pdf.text('Descripción', margin, yPos);
      yPos += 8;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      
      // Dividir texto largo en múltiples líneas
      const splitDescription = pdf.splitTextToSize(property.description, contentWidth);
      pdf.text(splitDescription, margin, yPos);
      yPos += (splitDescription.length * 6) + 10;
    }
    
    // Características principales
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(40, 40, 40);
    pdf.text('Características principales', margin, yPos);
    yPos += 10;
    
    // Mostrar características en 2 columnas
    const colWidth = contentWidth / 2;
    let featureYPos = yPos;
    
    // Primera columna
    if (property.covered_area) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text('Superficie Cubierta:', margin, featureYPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.covered_area} m²`, margin + 45, featureYPos);
      featureYPos += 7;
    }
    
    if (property.total_area) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text('Superficie Total:', margin, featureYPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.total_area} m²`, margin + 45, featureYPos);
      featureYPos += 7;
    }
    
    if (property.bedrooms !== null) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text('Habitaciones:', margin, featureYPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.bedrooms}`, margin + 45, featureYPos);
      featureYPos += 7;
    }
    
    // Segunda columna
    featureYPos = yPos;
    const colStart = margin + colWidth;
    
    if (property.bathrooms !== null) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text('Baños:', colStart, featureYPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.bathrooms}`, colStart + 30, featureYPos);
      featureYPos += 7;
    }
    
    if (property.garage) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text('Cochera:', colStart, featureYPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Sí', colStart + 30, featureYPos);
      featureYPos += 7;
    }
    
    // Actualizar posición vertical a la más baja de las dos columnas
    yPos = Math.max(yPos + 28, featureYPos);
    
    // Amenities
    if (property.amenities) {
      const amenities = this.getPropertyAmenities(property);
      
      if (amenities.length > 0) {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(40, 40, 40);
        pdf.text('Amenities', margin, yPos);
        yPos += 8;
        
        // Mostrar amenities en 2 columnas
        const halfLength = Math.ceil(amenities.length / 2);
        
        // Primera columna
        for (let i = 0; i < halfLength; i++) {
          pdf.setFontSize(11);
          pdf.text(`• ${amenities[i]}`, margin, yPos);
          yPos += 6;
        }
        
        // Segunda columna
        let secondColY = yPos - (halfLength * 6);
        for (let i = halfLength; i < amenities.length; i++) {
          pdf.setFontSize(11);
          pdf.text(`• ${amenities[i]}`, margin + colWidth, secondColY);
          secondColY += 6;
        }
        
        // Establecer posición vertical a la más baja de las dos columnas
        if (amenities.length > halfLength) {
          yPos = Math.max(yPos, secondColY);
        }
      }
    }
    
    // Añadir pie de página
    this.addFooter(pdf);
  }
  
  /**
   * Añade un encabezado al PDF con el logo y la información de la inmobiliaria
   */
  private static addHeader(pdf: jsPDF, property: Property): void {
    const margin = 15;
    const pageWidth = 210;
    
    // Logo (simulado con texto)
    pdf.setFontSize(22);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.text('KARTTEM', margin, 25);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('INMOBILIARIA', margin, 32);
    
    // Título y precio en la derecha
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(80, 80, 80);
    const statusText = this.getPropertyTypeText(property);
    pdf.text(statusText, pageWidth - margin, 25, { align: 'right' });
    
    // Precio
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.text(getPropertyPrice(property), pageWidth - margin, 32, { align: 'right' });
    
    // Línea separadora
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, 35, pageWidth - margin, 35);
  }
  
  /**
   * Añade un pie de página al PDF
   */
  private static addFooter(pdf: jsPDF): void {
    const pageWidth = 210;
    const margin = 15;
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(120, 120, 120);
    
    // Información de contacto
    pdf.text('KARTTEM Inmobiliaria', margin, 280);
    pdf.text('Tel: +54 9 2664 46-3038', margin, 285);
    pdf.text('Email: info@karttemsa.com', margin, 290);
    
    // Website y fecha
    const today = new Date();
    const dateStr = today.toLocaleDateString('es-AR');
    pdf.text('www.karttemsa.com', pageWidth - margin, 290, { align: 'right' });
    pdf.text(`Generado el: ${dateStr}`, pageWidth - margin, 285, { align: 'right' });
  }
  
  /**
   * Obtiene una lista de amenities de la propiedad
   */
  private static getPropertyAmenities(property: Property): string[] {
    const amenities: string[] = [];
    
    if (property.amenities) {
      if (property.amenities.has_pool) amenities.push('Piscina');
      if (property.amenities.has_heating) amenities.push('Calefacción');
      if (property.amenities.has_ac) amenities.push('Aire Acondicionado');
      if (property.amenities.has_garden) amenities.push('Jardín');
      if (property.amenities.has_laundry) amenities.push('Lavadero');
      if (property.amenities.has_parking) amenities.push('Estacionamiento');
      if (property.amenities.has_central_heating) amenities.push('Calefacción Central');
      if (property.amenities.has_lawn) amenities.push('Césped');
      if (property.amenities.has_fireplace) amenities.push('Chimenea');
      if (property.amenities.has_central_ac) amenities.push('Aire Acondicionado Central');
      if (property.amenities.has_high_ceiling) amenities.push('Techos Altos');
    }
    
    // Añadir otros amenities/características
    if (property.has_electricity) amenities.push('Electricidad');
    if (property.has_natural_gas) amenities.push('Gas Natural');
    if (property.has_sewage) amenities.push('Cloacas');
    if (property.has_paved_street) amenities.push('Calle Pavimentada');
    
    return amenities;
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
  
  /**
   * Obtiene el texto del tipo de propiedad con su estado
   */
  private static getPropertyTypeText(property: Property): string {
    const type = property.type_name || property.type || 'Propiedad';
    const status = this.getStatusText(property.status).toLowerCase();
    
    return `${type} en ${status} en ${property.city}`;
  }
  
  /**
   * Obtiene la URL completa de la imagen
   */
  private static getFullImageUrl(imageUrl: string): string {
    if (!imageUrl) return '';
    
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    return `https://codeo.site/api-karttem/${imageUrl}`;
  }
  
  /**
   * Carga una imagen y devuelve una promesa
   */
  private static loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }
}

// Variable global para el estado de carga
let setLoading: (loading: boolean) => void = () => {};

/**
 * Establece la función para actualizar el estado de carga
 */
export const initPDFService = (setLoadingFunction: (loading: boolean) => void) => {
  setLoading = setLoadingFunction;
};
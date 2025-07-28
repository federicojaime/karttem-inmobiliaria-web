// src/services/PDFService.ts
import jsPDF from 'jspdf';
import { Property } from './api';
import { getPropertyPrice } from '../utils/format';
import html2canvas from 'html2canvas';

// Variable global para el estado de carga
let setLoadingState: (loading: boolean) => void = () => {};

export class PDFService {
  /**
   * Genera un PDF con información de la propiedad
   */
  static async generatePropertyPDF(property: Property): Promise<void> {
    try {
      // Iniciar indicador de carga
      setLoadingState(true);
      console.log("Iniciando generación de PDF para propiedad:", property.id);
      
      // Crear documento PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Intentar obtener la imagen utilizando una captura del DOM (método que evita CORS)
      let mainImageBase64: string | null = null;
      try {
        // Buscar elemento de imagen en el DOM
        console.log("Buscando elemento de imagen en el DOM...");
        
        // Intenta obtener la imagen principal del DOM directamente
        const imgElement = document.querySelector('.property-gallery img') as HTMLImageElement;
        
        if (imgElement && imgElement.complete && imgElement.naturalWidth > 0) {
          console.log("Imagen encontrada en el DOM, capturando...");
          
          // Usar html2canvas para capturar la imagen (evita problemas de CORS)
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Dimensiones proporcionadas
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 450;
          
          // Calcular dimensiones proporcionales
          let width = imgElement.naturalWidth;
          let height = imgElement.naturalHeight;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.floor(height * (MAX_WIDTH / width));
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.floor(width * (MAX_HEIGHT / height));
              height = MAX_HEIGHT;
            }
          }
          
          // Configurar canvas
          canvas.width = width;
          canvas.height = height;
          
          // Fondo blanco
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, width, height);
          
          // Dibujar imagen
          ctx.drawImage(imgElement, 0, 0, width, height);
          
          // Convertir a base64
          mainImageBase64 = canvas.toDataURL('image/jpeg', 0.7);
          console.log("Imagen capturada exitosamente del DOM");
        } else {
          // Si no encuentra la imagen, usa html2canvas para capturar toda la sección
          console.log("Intentando capturar sección completa de galería...");
          const gallerySection = document.querySelector('.property-gallery') as HTMLElement;
          
          if (gallerySection) {
            const canvas = await html2canvas(gallerySection, {
              scale: 1,
              useCORS: true,
              allowTaint: true,
              backgroundColor: "#ffffff"
            });
            
            mainImageBase64 = canvas.toDataURL('image/jpeg', 0.7);
            console.log("Sección de galería capturada exitosamente");
          } else {
            console.log("No se encontró la sección de galería en el DOM");
          }
        }
      } catch (captureError) {
        console.error("Error al capturar imagen del DOM:", captureError);
      }
      
      // Generar el contenido del PDF
      console.log("Generando contenido del PDF...");
      await this.generatePDFContent(pdf, property, mainImageBase64);
      
      // Guardar el PDF
      console.log("Guardando PDF...");
      pdf.save(`KARTTEM-Propiedad-${property.id}.pdf`);
      console.log("PDF generado exitosamente");
    } catch (error) {
      console.error('Error al generar PDF:', error);
      throw error;
    } finally {
      // Finalizar indicador de carga
      setLoadingState(false);
    }
  }

  /**
   * Genera el contenido del PDF
   */
  private static async generatePDFContent(
    pdf: jsPDF, 
    property: Property, 
    mainImageBase64: string | null
  ): Promise<void> {
    // Constantes para el diseño
    const pageWidth = 210; // Ancho A4 en mm
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    
    // Position vertical actual
    let yPos = 20;
    
    // Encabezado con logo
    pdf.setFontSize(22);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.text('KARTTEM', margin, yPos);
    yPos += 7;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('INMOBILIARIA', margin, yPos);
    yPos += 10;
    
    // Línea separadora
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
    
    // Referencia de la propiedad
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(`REF: ${property.id}`, margin, yPos);
    yPos += 8;
    
    // Título de la propiedad
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    
    // Manejar títulos largos
    const titleLines = pdf.splitTextToSize(property.title || "Propiedad sin título", contentWidth);
    pdf.text(titleLines, margin, yPos);
    yPos += (titleLines.length * 8) + 2;
    
    // Ubicación de la propiedad
    if (property.address || property.city) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(80, 80, 80);
      const location = `${property.address || ""}, ${property.city || ""}`;
      pdf.text(location, margin, yPos);
      yPos += 8;
    }
    
    // Precio y estado
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(getPropertyPrice(property), margin, yPos);
    yPos += 7;
    
    // Estado de la propiedad
    const statusText = this.getStatusText(property.status || "");
    const typeText = property.type_name || property.type || 'Propiedad';
    pdf.setFontSize(12);
    pdf.setTextColor(80, 80, 80);
    pdf.text(`${typeText} en ${statusText.toLowerCase()}`, margin, yPos);
    yPos += 15;
    
    // Agregar imagen principal si existe
    if (mainImageBase64) {
      try {
        console.log("Intentando añadir imagen al PDF...");
        // Calcular dimensiones manteniendo proporción
        const imageHeight = 50; // altura en mm (reducida para evitar problemas)
        
        try {
          // Añadir imagen al PDF con método seguro
          pdf.addImage(
            mainImageBase64, 
            'JPEG', 
            margin, 
            yPos, 
            contentWidth, 
            imageHeight
          );
          console.log("Imagen añadida exitosamente al PDF");
        } catch (innerErr) {
          console.error("Error al añadir imagen al PDF:", innerErr);
          pdf.setFontSize(10);
          pdf.setTextColor(150, 150, 150);
          pdf.text('(Error al insertar imagen en el PDF)', margin, yPos + 20);
        }
        
        yPos += imageHeight + 10; // Espacio después de la imagen
      } catch (err) {
        console.error('Error al añadir imagen al PDF:', err);
        // Si hay error, agregar un espacio para la imagen
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text('(No se pudo cargar la imagen)', margin, yPos + 20);
        yPos += 40;
      }
    } else {
      // Si no hay imagen, agregar un espacio para ella
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(mainImageBase64 +'(No hay imagen disponible)', margin, yPos + 20);
      yPos += 40;
    }
    
    // Descripción
    if (property.description) {
      // Línea separadora
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;
      
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

    // Verificar si necesitamos una nueva página
    if (yPos > 250) {
      pdf.addPage();
      yPos = 20;
    }
    
    // Características principales
    // Línea separadora
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(40, 40, 40);
    pdf.text('Características principales', margin, yPos);
    yPos += 10;
    
    // Lista de características en formato tabla
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    
    // Diseño de tabla - 2 columnas
    const colWidth = contentWidth / 2;
    let rowCount = 0;
    
    // Superficie cubierta
    if (property.covered_area) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Superficie Cubierta:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.covered_area} m²`, margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }
    
    // Superficie total
    if (property.total_area) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Superficie Total:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.total_area} m²`, margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }
    
    // Dormitorios
    if (property.bedrooms !== null && property.bedrooms !== undefined) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Dormitorios:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.bedrooms}`, margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }
    
    // Baños
    if (property.bathrooms !== null && property.bathrooms !== undefined) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Baños:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.bathrooms}`, margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }
    
    // Garage
    if (property.garage !== undefined) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Cochera:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(property.garage ? 'Sí' : 'No', margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }
    
    // Más características básicas
    if (property.has_electricity !== undefined) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Electricidad:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(property.has_electricity ? 'Sí' : 'No', margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }
    
    if (property.has_natural_gas !== undefined) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Gas Natural:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(property.has_natural_gas ? 'Sí' : 'No', margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }
    
    // Si no hay características, mostrar mensaje
    if (rowCount === 0) {
      pdf.text('No hay características adicionales especificadas.', margin, yPos);
      yPos += 10;
    }

    // Verificar si necesitamos una nueva página
    if (yPos > 250) {
      pdf.addPage();
      yPos = 20;
    }
    
    // Amenities - solo si hay al menos uno
    const amenities = this.getPropertyAmenities(property);
    
    if (amenities.length > 0) {
      // Línea separadora
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPos, margin + contentWidth, yPos);
      yPos += 8;
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(40, 40, 40);
      pdf.text('Servicios y Amenities', margin, yPos);
      yPos += 10;
      
      // Dibujar amenities en formato de lista con columnas
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      
      // Máximo 2 columnas para evitar que se vea muy apretado
      const maxCols = 2;
      const amenityColWidth = contentWidth / maxCols;
      
      for (let i = 0; i < amenities.length; i++) {
        const col = i % maxCols; // 0, 1
        const row = Math.floor(i / maxCols);
        
        const xPos = margin + (col * amenityColWidth);
        const itemYPos = yPos + (row * 7);
        
        pdf.text(`• ${amenities[i]}`, xPos, itemYPos);
      }
      
      // Actualizar posición vertical
      yPos += (Math.ceil(amenities.length / maxCols) * 7) + 12;
    }

    // Verificar si necesitamos una nueva página
    if (yPos > 250) {
      pdf.addPage();
      yPos = 20;
    }
    
    // Información de contacto
    // Línea separadora
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPos, margin + contentWidth, yPos);
    yPos += 8;
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(40, 40, 40);
    pdf.text('Contacto', margin, yPos);
    yPos += 8;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    pdf.text('Para más información sobre esta propiedad, contáctenos:', margin, yPos);
    yPos += 6;
    
    pdf.text('• Teléfono: +54 9 2664 46-3038', margin, yPos);
    yPos += 6;
    pdf.text('• Email: info@karttemsa.com', margin, yPos);
    yPos += 6;
    pdf.text('• Dirección: Colón 647, San Luis, Argentina', margin, yPos);
    
    // Pie de página
    this.addFooter(pdf);
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
    
    // Verificar si property.amenities existe
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
    
    return amenities;
  }

  /**
   * Obtiene el texto del estado de la propiedad
   */
  private static getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'sale': 'Venta',
      'rent': 'Alquiler',
      'temporary_rent': 'Alquiler Temporario',
      'sold': 'Vendido',
      'rented': 'Alquilado',
      'reserved': 'Reservado'
    };
    
    return statusMap[status] || status;
  }
}

/**
 * Establece la función para actualizar el estado de carga
 */
export const initPDFService = (setLoadingFunction: (loading: boolean) => void) => {
  setLoadingState = setLoadingFunction;
};
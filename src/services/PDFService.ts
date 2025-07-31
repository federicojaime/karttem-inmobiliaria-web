// src/services/PDFService.ts
import jsPDF from 'jspdf';
import { Property } from './api';

// Variable global para el estado de carga
let setLoadingState: (loading: boolean) => void = () => { };

export class PDFService {
  /**
   * Genera un PDF con información de la propiedad para cliente
   */
  static async generatePropertyPDF(property: Property): Promise<void> {
    try {
      setLoadingState(true);
      console.log("Iniciando generación de PDF para cliente:", property.id);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let mainImageBase64: string | null = null;
      try {
        const imgElement = document.querySelector('.property-gallery img') as HTMLImageElement;

        if (imgElement && imgElement.complete && imgElement.naturalWidth > 0) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) {
            const MAX_WIDTH = 600;
            const MAX_HEIGHT = 450;

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

            canvas.width = width;
            canvas.height = height;

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(imgElement, 0, 0, width, height);

            mainImageBase64 = canvas.toDataURL('image/jpeg', 0.7);
          }
        }
      } catch (captureError) {
        console.error("Error al capturar imagen:", captureError);
      }

      await this.generateClientPDFContent(pdf, property, mainImageBase64);
      pdf.save(`KARTTEM-SA-Propiedad-${property.id}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      throw error;
    } finally {
      setLoadingState(false);
    }
  }

  /**
   * Genera un PDF para uso interno
   */
  static async generateInternalPDF(property: Property, ownerName?: string, ownerPhone?: string): Promise<void> {
    try {
      setLoadingState(true);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let mainImageBase64: string | null = null;
      try {
        const imgElement = document.querySelector('.property-gallery img') as HTMLImageElement;

        if (imgElement && imgElement.complete && imgElement.naturalWidth > 0) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) {
            const MAX_WIDTH = 600;
            const MAX_HEIGHT = 450;

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

            canvas.width = width;
            canvas.height = height;

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(imgElement, 0, 0, width, height);

            mainImageBase64 = canvas.toDataURL('image/jpeg', 0.7);
          }
        }
      } catch (captureError) {
        console.error("Error al capturar imagen:", captureError);
      }

      await this.generateInternalPDFContent(pdf, property, mainImageBase64, ownerName, ownerPhone);
      pdf.save(`KARTTEM-SA-Interno-Propiedad-${property.id}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF interno:', error);
      throw error;
    } finally {
      setLoadingState(false);
    }
  }

  /**
   * Genera el contenido del PDF para cliente
   */
  private static async generateClientPDFContent(
    pdf: jsPDF,
    property: Property,
    mainImageBase64: string | null
  ): Promise<void> {
    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    let yPos = 20;

    // Encabezado
    pdf.setFontSize(22);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.text('KARTTEM S.A.', margin, yPos);
    yPos += 7;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('INMOBILIARIA', margin, yPos);
    yPos += 10;

    // Línea separadora
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // Información de contacto
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text('Colón 647, San Luis, Argentina', margin, yPos);
    yPos += 4;
    pdf.text('Tel: +54 266 4424950 | Cel: +54 9 2664 463038', margin, yPos);
    yPos += 8;

    // Referencia de la propiedad
    pdf.text(`REF: ${property.id}`, margin, yPos);
    yPos += 8;

    // Título de la propiedad
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);

    const titleLines = pdf.splitTextToSize(property.title || "Propiedad sin título", contentWidth);
    pdf.text(titleLines, margin, yPos);
    yPos += (titleLines.length * 8) + 2;

    // Ubicación
    if (property.address || property.city) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(80, 80, 80);
      const location = `${property.address || ""}, ${property.city || ""}`;
      pdf.text(location, margin, yPos);
      yPos += 8;
    }

    // Precio sin centavos
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const priceText = this.formatPriceWithoutCents(property);
    pdf.text(priceText, margin, yPos);
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
        const imageHeight = 50;
        pdf.addImage(mainImageBase64, 'JPEG', margin, yPos, contentWidth, imageHeight);
        yPos += imageHeight + 10;
      } catch (err) {
        console.error('Error al añadir imagen al PDF:', err);
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text('(Error al insertar imagen en el PDF)', margin, yPos + 20);
        yPos += 40;
      }
    } else {
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('(No hay imagen disponible)', margin, yPos + 20);
      yPos += 40;
    }

    // Descripción
    if (property.description) {
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

      const splitDescription = pdf.splitTextToSize(property.description, contentWidth);
      pdf.text(splitDescription, margin, yPos);
      yPos += (splitDescription.length * 6) + 10;
    }

    if (yPos > 250) {
      pdf.addPage();
      yPos = 20;
    }

    // Características principales
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(40, 40, 40);
    pdf.text('Características principales', margin, yPos);
    yPos += 10;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);

    let rowCount = 0;

    if (property.covered_area) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Superficie Cubierta:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.covered_area} m²`, margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }

    if (property.total_area) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Superficie Total:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.total_area} m²`, margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }

    if (property.bedrooms !== null && property.bedrooms !== undefined) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Dormitorios:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.bedrooms}`, margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }

    if (property.bathrooms !== null && property.bathrooms !== undefined) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Baños:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${property.bathrooms}`, margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }

    if (property.garage !== undefined) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Cochera:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(property.garage ? 'Sí' : 'No', margin + 45, yPos);
      rowCount++;
      yPos += 7;
    }

    if (rowCount === 0) {
      pdf.text('No hay características adicionales especificadas.', margin, yPos);
      yPos += 10;
    }

    // Información de contacto
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

    pdf.text('• Teléfono Fijo: +54 266 4424950', margin, yPos);
    yPos += 6;
    pdf.text('• Celular/WhatsApp: +54 9 2664 463038', margin, yPos);
    yPos += 6;
    pdf.text('• Email: info@karttemsa.com', margin, yPos);
    yPos += 6;
    pdf.text('• Dirección: Colón 647, San Luis, Argentina', margin, yPos);
  }

  /**
   * Genera el contenido del PDF para uso interno
   */
  private static async generateInternalPDFContent(
    pdf: jsPDF,
    property: Property,
    mainImageBase64: string | null,
    ownerName?: string,
    ownerPhone?: string
  ): Promise<void> {
    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    let yPos = 20;

    // Encabezado
    pdf.setFontSize(22);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.text('KARTTEM S.A. - USO INTERNO', margin, yPos);
    yPos += 15;

    // Información del propietario
    if (ownerName || ownerPhone) {
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(40, 40, 40);
      pdf.text('Información del Propietario', margin, yPos);
      yPos += 8;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);

      if (ownerName) {
        pdf.text(`Nombre: ${ownerName}`, margin, yPos);
        yPos += 6;
      }

      if (ownerPhone) {
        pdf.text(`Teléfono: ${ownerPhone}`, margin, yPos);
        yPos += 6;
      }

      yPos += 6;
    }

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

    const titleLines = pdf.splitTextToSize(property.title || "Propiedad sin título", contentWidth);
    pdf.text(titleLines, margin, yPos);
    yPos += (titleLines.length * 8) + 2;

    // Ubicación
    if (property.address || property.city) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(80, 80, 80);
      const location = `${property.address || ""}, ${property.city || ""}`;
      pdf.text(location, margin, yPos);
      yPos += 8;
    }

    // Precio sin centavos
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const priceText = this.formatPriceWithoutCents(property);
    pdf.text(priceText, margin, yPos);
    yPos += 7;

    // Estado de la propiedad
    const statusText = this.getStatusText(property.status || "");
    const typeText = property.type_name || property.type || 'Propiedad';
    pdf.setFontSize(12);
    pdf.setTextColor(80, 80, 80);
    pdf.text(`${typeText} en ${statusText.toLowerCase()}`, margin, yPos);
    yPos += 15;

    // Foto
    if (mainImageBase64) {
      try {
        const imageHeight = 50;
        pdf.addImage(mainImageBase64, 'JPEG', margin, yPos, contentWidth, imageHeight);
        yPos += imageHeight + 10;
      } catch (err) {
        console.error('Error al añadir imagen al PDF:', err);
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text('(Error al insertar imagen)', margin, yPos + 20);
        yPos += 40;
      }
    }

    // Espacio para plano
    pdf.setDrawColor(200, 200, 200);
    pdf.rect(margin, yPos, contentWidth, 60);
    pdf.setFontSize(12);
    pdf.setTextColor(150, 150, 150);
    pdf.text('ESPACIO PARA PLANO', margin + (contentWidth / 2), yPos + 30, { align: 'center' });
  }

  /**
   * Formatea el precio sin centavos
   */
  private static formatPriceWithoutCents(property: { price_ars: number | null; price_usd: number | null }): string {
    if (property.price_ars) {
      const rounded = Math.round(property.price_ars);
      return `$${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    } else if (property.price_usd) {
      const rounded = Math.round(property.price_usd);
      return `U$D ${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    }
    return 'Consultar';
  }

  /**
   * Obtiene el texto del estado de la propiedad
   */
  private static getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'sale': 'Venta',
      'rent': 'Alquiler',
      'temporary_rent': 'Alquiler Temporario',
      'venta_en_pozo': 'Venta en Pozo',
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
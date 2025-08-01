// src/components/common/Footer.tsx
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Clock, Smartphone } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import LogoCodeo from '../../assets/codeo-logo.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5492664463038?text=Hola%20KARTTEM%20Inmobiliaria,%20me%20gustaría%20recibir%20información', '_blank');
  };

  // Esta función manejará los enlaces con parámetros de consulta para forzar la recarga
  const handleQueryParamLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    // Cambiamos la ubicación directamente para forzar una recarga de la página
    window.location.href = path;
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex flex-col">
              <Logo size="lg" variant="full" />
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Tu agencia inmobiliaria de confianza en San Luis. Encontramos el hogar de tus sueños con el mejor servicio y asesoramiento profesional.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://www.facebook.com/share/1E3ffJnabQ/" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/inmobiliaria.karttem?igsh=MXFra25sYndsdWF4bg==" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-primary mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-primary transition-colors">
                  Propiedades
                </Link>
              </li>
              <li>
                <a
                  href="/karttem-web/properties?search=true"
                  className="text-gray-300 hover:text-primary transition-colors"
                  onClick={(e) => handleQueryParamLink(e, '/karttem-web/properties?search=true')}
                >
                  Buscar
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-primary mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/karttem-web/properties?status=sale"
                  className="text-gray-300 hover:text-primary transition-colors"
                  onClick={(e) => handleQueryParamLink(e, '/karttem-web/properties?status=sale')}
                >
                  Venta de propiedades
                </a>
              </li>
              <li>
                <a
                  href="/karttem-web/properties?status=rent"
                  className="text-gray-300 hover:text-primary transition-colors"
                  onClick={(e) => handleQueryParamLink(e, '/karttem-web/properties?status=rent')}
                >
                  Alquiler de propiedades
                </a>
              </li>
              <li>
                <a
                  href="/karttem-web/properties?status=venta_en_pozo"
                  className="text-gray-300 hover:text-primary transition-colors"
                  onClick={(e) => handleQueryParamLink(e, '/karttem-web/properties?status=venta_en_pozo')}
                >
                  Venta en Pozo
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Asesoramiento inmobiliario
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-primary mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Colón 647, San Luis, Argentina</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                <span className="text-gray-300">Lunes a viernes de 8:30 a 12:30 y de 16:30 a 20:30. <br /> Sábados de 9:00 a 12:00</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                <a
                  href="tel:+542664424950"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  +54 266 4424950
                </a>
              </li>
              <li className="flex items-center">
                <Smartphone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleWhatsAppClick();
                  }}
                >
                  +54 9 2664 463038
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                <a href="mailto:info@karttemsa.com" className="text-gray-300 hover:text-primary transition-colors">
                  info@karttemsa.com                </a>
              </li>
            </ul>

            <Button
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleWhatsAppClick}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <p className="text-center text-sm text-gray-400">
              &copy; {currentYear} KARTTEM S.A. Inmobiliaria.
            </p>
            <div className="flex items-center text-gray-400">
              <span className="mx-2 hidden md:inline">|</span>
              <span className="text-sm">Desarrollado por</span>
              <a
                href="https://codeo.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center ml-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src={LogoCodeo}
                  alt="Codeo.Ar"
                  className="h-5 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
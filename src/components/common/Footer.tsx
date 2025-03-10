// src/components/common/Footer.tsx
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-bold text-primary">KARTTEM</span>
              <span className="text-lg font-medium">Inmobiliaria</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Tu agencia inmobiliaria de confianza. Encontramos el hogar de tus sueños.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Navegación</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">Inicio</Link>
              </li>
              <li>
                <Link to="/properties" className="text-muted-foreground hover:text-primary">Propiedades</Link>
              </li>
              <li>
                <Link to="/properties?search=true" className="text-muted-foreground hover:text-primary">Buscar</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">Contacto</Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Servicios</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/properties?status=sale" className="text-muted-foreground hover:text-primary">Venta de propiedades</Link>
              </li>
              <li>
                <Link to="/properties?status=rent" className="text-muted-foreground hover:text-primary">Alquiler de propiedades</Link>
              </li>
              <li>
                <Link to="/properties?status=temporary_rent" className="text-muted-foreground hover:text-primary">Alquiler temporario</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">Tasaciones</Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Contacto</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">San Luis, Argentina</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <a href="tel:+5492664463038" className="text-muted-foreground hover:text-primary">+54 9 2664 46-3038</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <a href="mailto:info@karttem.com" className="text-muted-foreground hover:text-primary">info@karttem.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KARTTEM Inmobiliaria. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
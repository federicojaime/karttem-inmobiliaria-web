// src/components/common/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './Logo';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Propiedades', path: '/properties' },
    { name: 'Contacto', path: '/contact' },
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5492664463038?text=Hola%20KARTTEM%20Inmobiliaria,%20me%20gustaría%20recibir%20información', '_blank');
  };

  return (
    <>
      {/* Primera franja de información de contacto - solo visible en desktop */}
      <div className={`bg-secondary py-2 transition-all duration-300 hidden md:block ${isScrolled ? 'md:hidden' : 'md:block'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div className="flex items-center text-white text-xs">
                <MapPin className="h-3 w-3 mr-1 text-primary" />
                <span>Av. Presidente Illia 256, San Luis, Argentina</span>
              </div>
              <div className="flex items-center text-white text-xs">
                <Clock className="h-3 w-3 mr-1 text-primary" />
                <span>Lun - Vie: 9:00 - 18:00 | Sáb: 9:00 - 13:00</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+5492664463038" 
                className="flex items-center text-white text-xs hover:text-primary transition-colors"
              >
                <Phone className="h-3 w-3 mr-1 text-primary" />
                +54 9 2664 46-3038
              </a>
              <Button 
                size="sm" 
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-2"
              >
                <svg 
                  className="w-3 h-3 mr-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navbar principal */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-black shadow-lg py-2' : 'bg-black py-4'
        }`}
      >
        {/* Borde amarillo superior */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="relative z-10">
              {/* Usar Logo sin Link interno */}
              <Logo size={isScrolled ? "sm" : "md"} variant="full" asLink={false} />
            </Link>
            
            {/* Navegación desktop */}
            <nav className="hidden md:flex items-center">
              <ul className="flex space-x-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`relative block px-4 py-2 text-sm font-medium hover:text-primary transition-colors ${
                        location.pathname === item.path 
                          ? 'text-primary' 
                          : 'text-white'
                      }`}
                    >
                      {item.name}
                      {location.pathname === item.path && (
                        <motion.div 
                          layoutId="underline"
                          className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={handleWhatsAppClick}
                className="ml-6 bg-primary text-black hover:bg-primary/90 font-semibold"
              >
                CONTACTAR
              </Button>
            </nav>
            
            {/* Botón de menú móvil */}
            <button
              className="block md:hidden p-2 focus:outline-none text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Menú móvil */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black border-t border-gray-800 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <ul className="space-y-0">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`block py-3 border-b border-gray-800 text-center ${
                          location.pathname === item.path 
                            ? 'text-primary font-medium' 
                            : 'text-white'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 flex flex-col space-y-4 items-center">
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-primary text-black hover:bg-primary/90 font-semibold"
                  >
                    <svg 
                      className="w-4 h-4 mr-2" 
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    CONTACTAR POR WHATSAPP
                  </Button>
                  
                  <a 
                    href="tel:+5492664463038"
                    className="text-white hover:text-primary transition-colors text-sm flex items-center"
                  >
                    <Phone className="h-3 w-3 mr-1 text-primary" />
                    +54 9 2664 46-3038
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
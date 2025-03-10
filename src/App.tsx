// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { NotFound } from './pages/NotFound';
import { Contact } from './pages/Contact';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import karttemLogo from './assets/karttem-full-logo.png'; // Solo KARTTEM si es necesario

// Componente para manejar el scroll al cambiar de ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Componente para el botón "volver arriba"
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar el botón cuando el usuario baja 300px
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-10 left-6 z-40 bg-black text-white p-3 rounded-full shadow-lg ${isVisible ? 'flex' : 'hidden'
        } items-center justify-center hover:bg-gray-800 transition-all duration-300`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
      aria-label="Volver arriba"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </motion.button>
  );
};

// Componente para la notificación de cookies
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si ya se aceptaron las cookies
    const hasConsent = localStorage.getItem('cookieConsent');

    if (!hasConsent) {
      // Mostrar después de 2 segundos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 bg-white z-50 shadow-lg border-t border-gray-200`}
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.5 }}
    >
      {isVisible && (
        <div className="container mx-auto py-4 px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-6">
            <p className="text-gray-700">
              Este sitio utiliza cookies para mejorar su experiencia. Al continuar navegando, acepta nuestra política de cookies.
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-amber-500 text-white font-medium rounded hover:bg-amber-600 transition-colors"
            >
              Aceptar
            </button>
            <a
              href="/privacy-policy"
              className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Más información
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Componente para la pantalla de carga
const LoadingScreen = ({ isLoading }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <div className="text-center">
        <img
          src={karttemLogo}
          alt="KARTTEM Inmobiliaria"
          className="h-16 mx-auto mb-6"
        />
        <div className="relative w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-amber-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router basename="/karttem-web">
      <ScrollToTop />

      {/* Pantalla de carga inicial */}
      <AnimatePresence>
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>

      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>

      {/* Componentes flotantes */}
      <ScrollToTopButton />

      {/* Botón flotante de WhatsApp */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <a
          href="https://wa.me/5492664463038?text=Hola%20KARTTEM%20Inmobiliaria,%20me%20gustaría%20recibir%20información"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white shadow-xl hover:bg-green-700 transition-all duration-300 hover:scale-110"
          aria-label="Contactar por WhatsApp"
        >
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </motion.div>

      {/* Notificación de cookies 
      <CookieConsent />*/}
    </Router>
  );
}

export default App;
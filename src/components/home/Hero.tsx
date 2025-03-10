// src/components/home/Hero.tsx
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Search} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5492664463038?text=Hola%20KARTTEM%20Inmobiliaria,%20me%20gustaría%20recibir%20información%20sobre%20propiedades', '_blank');
  };

  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
          alt="Karttem Inmobiliaria"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Tu hogar ideal te está esperando
          </motion.h1>
          <motion.p
            className="mt-6 text-xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            En KARTTEM Inmobiliaria te ayudamos a encontrar la propiedad de tus sueños en San Luis y alrededores.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" asChild>
              <Link to="/properties">
                <Search className="mr-2 h-5 w-5" />
                Explorar propiedades
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700"
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
          </motion.div>
        </div>
      </div>

      {/* Search Bar 
      <div className="absolute bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur translate-y-1/2">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de propiedad</label>
                <div className="relative">
                  <select className="w-full rounded-md border-border px-10 py-2 bg-white appearance-none">
                    <option value="">Todas las propiedades</option>
                    <option value="1">Casa</option>
                    <option value="2">Departamento</option>
                    <option value="3">Terreno</option>
                    <option value="4">Local comercial</option>
                  </select>
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Operación</label>
                <div className="relative">
                  <select className="w-full rounded-md border-border px-10 py-2 bg-white appearance-none">
                    <option value="">Todas las operaciones</option>
                    <option value="sale">Venta</option>
                    <option value="rent">Alquiler</option>
                    <option value="temporary_rent">Alquiler temporario</option>
                  </select>
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ubicación</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ciudad, barrio..." 
                    className="w-full rounded-md border-border pl-10 pr-4 py-2"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex items-end">
                <Button size="lg" className="w-full">
                  <Search className="mr-2 h-5 w-5" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
    </div>
  );
};
// src/components/home/Hero.tsx
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa" 
          alt="Karttem Inmobiliaria" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Encuentra tu hogar ideal con Karttem Inmobiliaria
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ofrecemos las mejores opciones en venta y alquiler de propiedades en San Luis y alrededores.
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
                Ver propiedades
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-primary border-white" asChild>
              <Link to="/contact">
                <MapPin className="mr-2 h-5 w-5" />
                Contactar
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 translate-y-1/2">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de propiedad</label>
                <select className="w-full rounded-md border-border px-4 py-2">
                  <option value="">Todas las propiedades</option>
                  <option value="1">Casa</option>
                  <option value="2">Departamento</option>
                  <option value="3">Terreno</option>
                  <option value="4">Local comercial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Operación</label>
                <select className="w-full rounded-md border-border px-4 py-2">
                  <option value="">Todas las operaciones</option>
                  <option value="sale">Venta</option>
                  <option value="rent">Alquiler</option>
                  <option value="temporary_rent">Alquiler temporario</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ubicación</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ciudad, barrio..." 
                    className="w-full rounded-md border-border pl-10 pr-4 py-2"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                <Search className="mr-2 h-5 w-5" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
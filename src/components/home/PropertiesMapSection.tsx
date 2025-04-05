// src/components/home/PropertiesMapSection.tsx
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { PropertyMap } from './PropertyMap';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const PropertiesMapSection = () => {
  return (
    <div className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-secondary">Propiedades en San Luis</h2>
          <div className="h-1 w-20 bg-primary mx-auto my-4"></div>
          <p className="mt-4 text-gray-600">
            Explore nuestras propiedades disponibles en San Luis y alrededores. Haga clic en los marcadores 
            para ver más detalles o utilice los filtros para encontrar la propiedad perfecta.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Elementos decorativos */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary opacity-10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-black opacity-5 rounded-full"></div>
          
          {/* Mapa */}
          <PropertyMap />
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <span>
                Haga clic en los marcadores para ver los detalles de las propiedades
              </span>
            </div>
            
            <Button asChild variant="default" className="shadow-md">
              <Link to="/properties">
                <Search className="h-4 w-4 mr-2" />
                Ver todas las propiedades
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
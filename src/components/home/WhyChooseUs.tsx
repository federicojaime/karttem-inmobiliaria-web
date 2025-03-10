// src/components/home/WhyChooseUs.tsx
import { motion } from 'framer-motion';
import { Shield, Clock, ThumbsUp, Award } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: 'Confianza y seguridad',
    description: 'Trabajamos con transparencia y profesionalismo en cada operación inmobiliaria.'
  },
  {
    icon: <Clock className="h-12 w-12 text-primary" />,
    title: 'Atención inmediata',
    description: 'Valoramos tu tiempo y atendemos tus consultas con la mayor rapidez posible.'
  },
  {
    icon: <ThumbsUp className="h-12 w-12 text-primary" />,
    title: 'Satisfacción garantizada',
    description: 'Nuestro compromiso es encontrar la propiedad perfecta para cada cliente.'
  },
  {
    icon: <Award className="h-12 w-12 text-primary" />,
    title: 'Experiencia y conocimiento',
    description: 'Contamos con años de experiencia en el mercado inmobiliario de San Luis.'
  }
];

export const WhyChooseUs = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-secondary">¿Por qué elegirnos?</h2>
          <div className="h-1 w-20 bg-primary mx-auto my-4"></div>
          <p className="mt-4 text-gray-600">
            En KARTTEM Inmobiliaria nos destacamos por ofrecer un servicio integral con los más altos estándares de calidad y atención personalizada.
          </p>
        </motion.div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-8 text-center shadow-lg border border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-secondary">{feature.title}</h3>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Nuestra misión es facilitar el proceso de compra, venta o alquiler de propiedades, brindando asesoramiento profesional y un trato personalizado a cada cliente.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
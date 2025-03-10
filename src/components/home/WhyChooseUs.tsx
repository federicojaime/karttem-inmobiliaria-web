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
    title: 'Respuesta rápida',
    description: 'Atendemos tus consultas y requerimientos con la mayor celeridad posible.'
  },
  {
    icon: <ThumbsUp className="h-12 w-12 text-primary" />,
    title: 'Satisfacción garantizada',
    description: 'Nuestro objetivo es encontrar la propiedad perfecta para cada cliente.'
  },
  {
    icon: <Award className="h-12 w-12 text-primary" />,
    title: 'Experiencia y conocimiento',
    description: 'Contamos con años de experiencia en el mercado inmobiliario de San Luis.'
  }
];

export const WhyChooseUs = () => {
  return (
    <div className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">¿Por qué elegirnos?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            En Karttem Inmobiliaria nos destacamos por ofrecer un servicio integral con los más altos estándares de calidad.
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
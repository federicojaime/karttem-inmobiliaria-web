// src/pages/Contact.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ContactSection } from '../components/contact/ContactSection';
import { Helmet } from 'react-helmet'; // Asegúrate de tener instalado react-helmet

export const Contact = () => {
  // Animaciones para la página
  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contacto | KARTTEM Inmobiliaria</title>
        <meta name="description" content="Póngase en contacto con KARTTEM Inmobiliaria para consultas sobre propiedades y servicios inmobiliarios en San Luis, Argentina" />
      </Helmet>

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        {/* Banner principal */}
        <div className="relative bg-black text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/images/contact-banner.jpg')" }}
          ></div>
          
          <div className="container mx-auto px-6 py-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl font-bold mb-4">Contacto</h1>
              <div className="h-1.5 w-20 bg-amber-400 mb-8"></div>
              <p className="text-xl">
                Estamos aquí para ayudarle a encontrar la propiedad perfecta. Contáctenos para obtener más información sobre nuestros servicios inmobiliarios.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Descripción breve */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Estamos a su servicio</h2>
              <p className="text-gray-600 text-lg">
                En KARTTEM Inmobiliaria entendemos que cada cliente tiene necesidades únicas. Nuestro equipo de profesionales está disponible para atender todas sus consultas relacionadas con propiedades en venta, alquiler o inversiones inmobiliarias en San Luis.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Componente de Contacto */}
        <ContactSection />

        {/* FAQs o Información adicional */}
        <div className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Preguntas Frecuentes</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Cuáles son los horarios de atención?</h3>
                  <p className="text-gray-600">
                    Nuestras oficinas están abiertas de lunes a viernes de 9:00 a 18:00 y los sábados de 9:00 a 13:00. También puede contactarnos por WhatsApp en cualquier momento.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Cómo puedo agendar una visita a una propiedad?</h3>
                  <p className="text-gray-600">
                    Puede llamarnos por teléfono, enviarnos un correo electrónico o completar el formulario de contacto en esta página. Un asesor se pondrá en contacto con usted para coordinar la visita.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Qué documentación necesito para alquilar una propiedad?</h3>
                  <p className="text-gray-600">
                    Generalmente se requiere DNI, comprobantes de ingresos de los últimos 3 meses, garantía propietaria y/o recibo de sueldo. Los requisitos pueden variar según el propietario y el tipo de propiedad.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Ofrecen asesoramiento para inversiones inmobiliarias?</h3>
                  <p className="text-gray-600">
                    Sí, contamos con un equipo especializado en asesoramiento para inversiones inmobiliarias. Podemos ayudarle a identificar las mejores oportunidades según su presupuesto y objetivos.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
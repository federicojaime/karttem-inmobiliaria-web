// src/pages/Contact.tsx
declare module 'react-helmet';
import { motion } from 'framer-motion';
import { ContactSection } from '../components/contact/ContactSection';
import { Helmet } from 'react-helmet';
import { Facebook } from 'lucide-react';

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
              
              <div className="mt-8 flex justify-center space-x-6">
                <a 
                  href="https://www.facebook.com/share/1E3ffJnabQ/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                
                <a 
                  href="https://wa.me/5492664463038?text=Hola%20KARTTEM%20Inmobiliaria,%20me%20gustaría%20recibir%20información"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  <svg 
                    className="h-6 w-6"
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Componente de Contacto */}
        <ContactSection />

        {/* Mapa de Google Maps */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Ubicación</h2>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.60382235276!2d-66.33696622495658!3d-33.303026189976315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4395504bce67f%3A0x251207c12feefd95!2sInmobiliaria%20Karttem%20SA!5e0!3m2!1ses-419!2sar!4v1741586986232!5m2!1ses-419!2sar" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de KARTTEM Inmobiliaria"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>

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
                    Nuestras oficinas están abiertas de lunes a viernes de 8:30 a 12:30 y de 16:30 a 20:30, los sábados de 9:00 a 12:00.
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
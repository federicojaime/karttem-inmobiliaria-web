// src/components/home/AboutUs.tsx
import { motion } from 'framer-motion';
import { Building2, Users, Award, Globe } from 'lucide-react';

export const AboutUs = () => {
  const stats = [
    {
      icon: <Building2 className="h-8 w-8 text-primary" />,
      number: "1980",
      label: "Año de fundación"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      number: "30+",
      label: "Años de experiencia promedio"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      number: "3",
      label: "Martilleros fundadores"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      number: "45+",
      label: "Años en el mercado"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-secondary mb-6">
            Nuestra Historia y Compromiso
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido de texto */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                En <span className="font-semibold text-secondary">KARTTEM INMOBILIARIA</span>, nuestra página web es una herramienta clave para informar y ofrecer a nuestros clientes diversas opciones de inversión y soluciones habitacionales. Además de nuestra presencia en redes sociales como Instagram y Facebook, nos esforzamos por acercar y facilitar el acceso a nuestras opciones inmobiliarias.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Asimismo nuestro moderno software nos permite administrar numerosos inmuebles con eficiencia y transparencia, dinamizando el negocio inmobiliario y reduciendo costos.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Sin embargo, seguimos valorando el <span className="font-semibold text-secondary">contacto personal y directo</span> con nuestros clientes, característica que nos ha definido desde que abrimos nuestras puertas en 1980 en nuestro local propio de <span className="font-semibold text-primary">Colón 647</span>.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Nuestra inmobiliaria cuenta con un equipo administrativo experimentado, con un promedio de más de 30 años de antigüedad, y está integrada por 3 martilleros fundadores con más de 45 años de experiencia. Combinamos tecnología moderna con una amplia experiencia y conocimiento del mercado local, lo que nos permite brindar <span className="font-semibold text-secondary">seguridad y previsibilidad</span> en cada operación inmobiliaria.
              </p>
              
              <p className="text-primary font-medium">
                Con esta herramienta actualizada, esperamos cumplir mejor con nuestros objetivos de progresar en beneficio de nuestros clientes.
              </p>
            </div>
          </motion.div>

          {/* Estadísticas */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-secondary rounded-full p-3">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-secondary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary opacity-5 rounded-full -z-10"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary opacity-5 rounded-full -z-10"></div>
      </div>
    </div>
  );
};
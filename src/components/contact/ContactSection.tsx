// src/components/contact/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

export const ContactSection = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
      };
      
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simular envío de formulario
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);

            // Reset formulario después de mostrar mensaje de éxito
            setTimeout(() => {
                setIsSubmitted(false);
                setFormState({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            }, 3000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: <MapPin className="h-6 w-6" />,
            title: 'Dirección',
            details: ['Av. San Martín 1250', 'San Luis, Argentina']
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: 'Teléfonos',
            details: ['+54 266 442-5588', '+54 266 15-456-7890']
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: 'Email',
            details: ['info@karttem.com', 'ventas@karttem.com']
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: 'Horario de Atención',
            details: ['Lunes a Viernes: 9:00 - 18:00', 'Sábados: 9:00 - 13:00']
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <div className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-gray-800">Contáctenos</h2>
                    <div className="h-1.5 w-20 bg-amber-400 mx-auto my-6"></div>
                    <p className="text-gray-600 text-lg">
                        Estamos a su disposición para responder todas sus consultas sobre propiedades y servicios inmobiliarios.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Columna 1: Información de contacto */}
                    <motion.div
                        className="bg-white rounded-xl shadow-xl overflow-hidden"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-black text-white p-8">
                            <h3 className="text-2xl font-bold mb-4">Información de Contacto</h3>
                            <p className="text-gray-300">
                                Contáctenos con cualquier consulta sobre propiedades, servicios o para agendar una visita.
                            </p>
                        </div>

                        <motion.div
                            className="p-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {contactInfo.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex mb-8 last:mb-0"
                                    variants={itemVariants}
                                >
                                    <div className="flex-shrink-0 bg-amber-400 text-black h-12 w-12 rounded-full flex items-center justify-center mr-4">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                                        {item.details.map((line, i) => (
                                            <p key={i} className="text-gray-600">{line}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>



                    </motion.div>

                    {/* Columna 2: Formulario de contacto */}
                    <motion.div
                        className="bg-white rounded-xl shadow-xl overflow-hidden relative"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {/* Elemento decorativo */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-20 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-10 rounded-full -ml-16 -mb-16"></div>

                        <div className="p-8 relative">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Envíenos un Mensaje</h3>

                            {isSubmitted ? (
                                <motion.div
                                    className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg flex items-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Check className="h-8 w-8 mr-4 text-green-500" />
                                    <div>
                                        <h4 className="font-semibold text-lg">¡Mensaje enviado correctamente!</h4>
                                        <p>Nos pondremos en contacto con usted a la brevedad.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre Completo</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300"
                                                placeholder="Ingrese su nombre"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300"
                                                placeholder="Ingrese su email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Teléfono</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formState.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300"
                                                placeholder="Ingrese su teléfono"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Asunto</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formState.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300"
                                                placeholder="Asunto de su consulta"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensaje</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formState.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300"
                                            placeholder="Detalle su consulta"
                                            required
                                        ></textarea>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="px-8 py-4 bg-amber-500 text-white font-bold rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300 flex items-center"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" />
                                                Enviar Mensaje
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>


            </div>
        </div>
    );
};
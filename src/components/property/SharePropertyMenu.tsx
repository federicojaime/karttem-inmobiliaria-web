// src/components/property/SharePropertyMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Share2, Link, Mail, Download, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Property } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingModal } from '../ui/LoadingModal';
import { Notification } from '../ui/Notification';
import { PDFService, initPDFService } from '../../services/PDFService';
import { ShareService } from '../../services/ShareService';

interface SharePropertyMenuProps {
    property: Property;
    variant?: 'default' | 'gallery';
}

export const SharePropertyMenu: React.FC<SharePropertyMenuProps> = ({
    property,
    variant = 'default'
}) => {
    // Estados
    const [isOpen, setIsOpen] = useState(false);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);

    // Inicializar PDFService con la función de setLoading
    useEffect(() => {
        initPDFService(setIsLoading);
    }, []);

    // Cerrar el menú al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Funciones para compartir
    const shareByEmail = () => {
        ShareService.shareByEmail(property, window.location.href);
        setIsOpen(false);
    };

    const shareByWhatsApp = () => {
        ShareService.shareByWhatsApp(property, window.location.href);
        setIsOpen(false);
    };

    const copyLink = async () => {
        const result = await ShareService.copyLink(window.location.href);
        if (result) {
            setShowCopiedMessage(true);
            setTimeout(() => setShowCopiedMessage(false), 2000);
        }
        setIsOpen(false);
    };

    // Función para descargar PDF
    const downloadPDF = async () => {
        setIsOpen(false);
        setLoadingMessage('Generando PDF...');

        try {
            // Usar el nuevo método mejorado que no requiere un elemento HTML
            await PDFService.generatePropertyPDF(property);
        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.');
        }
    };

    // Estilos según la variante
    const getButtonStyles = () => {
        if (variant === 'gallery') {
            return "flex items-center justify-center bg-black/60 text-white hover:bg-black/80 rounded-full w-10 h-10 p-0 backdrop-blur-sm shadow-md";
        }
        return "flex items-center justify-center bg-black text-white hover:bg-gray-800 rounded-full w-10 h-10 p-0";
    };

    return (
        <div className="relative" ref={menuRef}>
            <Button
                variant="secondary"
                className={getButtonStyles()}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Compartir propiedad"
            >
                <Share2 className="h-5 w-5" />
            </Button>

            {/* Modal de carga */}
            <LoadingModal isOpen={isLoading} message={loadingMessage} />

            {/* Notificación de enlace copiado */}
            <Notification
                type="success"
                message="¡Enlace copiado al portapapeles!"
                isVisible={showCopiedMessage}
                onClose={() => setShowCopiedMessage(false)}
                position="bottom-center"
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                        <div className="flex justify-between items-center px-5 py-3 bg-white border-b">
                            <span className="font-medium text-gray-700">Compartir vía</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-4">
                            {/* Botones de compartir en círculos - más grandes y simples */}
                            <div className="flex justify-center space-x-8 mb-6">
                                {/* WhatsApp */}
                                <button
                                    onClick={shareByWhatsApp}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-white rounded-full mb-2 hover:bg-green-600 transition-colors">
                                        <svg
                                            className="w-7 h-7"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">WhatsApp</span>
                                </button>

                                {/* Email */}
                                <button
                                    onClick={shareByEmail}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-14 h-14 flex items-center justify-center bg-blue-500 text-white rounded-full mb-2 hover:bg-blue-600 transition-colors">
                                        <Mail className="w-7 h-7" />
                                    </div>
                                    <span className="text-sm font-medium">Email</span>
                                </button>
                            </div>

                            <div className="border-t border-gray-100 my-4"></div>

                            {/* Opciones adicionales - estilo más limpio */}
                            <div className="space-y-2">
                                <button
                                    onClick={copyLink}
                                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <Link className="h-5 w-5 mr-3 text-gray-500" />
                                    <span>Copiar Enlace</span>
                                </button>

                                <button
                                    onClick={downloadPDF}
                                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <Download className="h-5 w-5 mr-3 text-red-500" />
                                    <span>Descargar PDF</span>
                                </button>

                                {/* Opción de compartir nativa */}

                                <button
                                    onClick={async () => {
                                        await ShareService.shareNative(property, window.location.href);
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <Share2 className="h-5 w-5 mr-3 text-purple-500" />
                                    <span>Compartir (nativo)</span>
                                </button>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
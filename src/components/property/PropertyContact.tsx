// src/components/property/PropertyContact.tsx
import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Property } from '../../services/api';

interface PropertyContactProps {
    property: Property;
}

// Definir el tipo para los status de la propiedad
type PropertyStatus = 'sale' | 'rent' | 'temporary_rent' | 'venta_en_pozo' | 'sold' | 'rented' | 'reserved';

// Mapeo de status a texto legible
const statusTextMap: Record<PropertyStatus, string> = {
    'sale': 'comprar',
    'rent': 'alquilar',
    'temporary_rent': 'alquilar temporalmente',
    'venta_en_pozo': 'adquirir en pozo',
    'sold': 'consultar sobre',
    'rented': 'consultar sobre',
    'reserved': 'consultar sobre'
};

export const PropertyContact = ({ property }: PropertyContactProps) => {
    const [loading, setLoading] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // Obtener el texto del status de forma type-safe
    const statusText: string = statusTextMap[property.status as PropertyStatus] || property.status;

    // WhatsApp handler
    const handleWhatsAppClick = () => {
        const text = `Hola, estoy interesado/a en ${statusText} la propiedad: ${property.title} (ID: ${property.id}). ¿Podrían brindarme más información?`;
        window.open(`https://wa.me/5492664463038?text=${encodeURIComponent(text)}`, '_blank');
    };

    // Form handler que enviará el mensaje a WhatsApp
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Construir mensaje para WhatsApp
        const whatsappMessage = `*Consulta por propiedad ID: ${property.id}*
*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Teléfono:* ${formData.phone}
*Mensaje:* ${formData.message}
*Propiedad:* ${property.title}`;

        // Simular proceso y luego redirigir a WhatsApp
        setTimeout(() => {
            setLoading(false);
            window.open(`https://wa.me/5492664463038?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            setMessageSent(true);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (messageSent) {
        return (
            <div className="bg-green-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-secondary">¡Mensaje enviado a WhatsApp!</h3>
                <p className="mt-2 text-gray-600">
                    Gracias por contactarnos. Te responderemos a la brevedad posible.
                </p>
                <Button
                    className="mt-4 bg-primary text-secondary hover:bg-primary/90"
                    onClick={() => setMessageSent(false)}
                >
                    Enviar otro mensaje
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-secondary mb-4">¿Te interesa esta propiedad?</h3>
            <p className="text-gray-600 mb-6">
                Completa el formulario y nos pondremos en contacto contigo a la brevedad, o contáctanos directamente por WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">
                        Nombre completo
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-700">
                        Teléfono
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700">
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                        placeholder={`Hola, estoy interesado/a en ${statusText} esta propiedad...`}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-primary text-secondary hover:bg-primary/90"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar consulta
                        </>
                    )}
                </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center mb-4 text-gray-600">También puedes contactarnos directamente:</p>
                <Button
                    variant="outline"
                    className="w-full bg-green-600 hover:bg-green-700 text-white border-green-600"
                    onClick={handleWhatsAppClick}
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    </svg>
                    Contactar por WhatsApp
                </Button>
            </div>
        </div>
    );
};
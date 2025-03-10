// src/components/property/PropertyContact.tsx
import { useState } from 'react';
import { Phone, Send, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Property } from '../../services/api';

interface PropertyContactProps {
    property: Property;
}

export const PropertyContact = ({ property }: PropertyContactProps) => {
    const [loading, setLoading] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const statusText = {
        'sale': 'comprar',
        'rent': 'alquilar',
        'temporary_rent': 'alquilar temporalmente'
    }[property.status] || property.status;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulated form submission (you'd send this to your backend in a real app)
        setTimeout(() => {
            setLoading(false);
            setMessageSent(true);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Generate WhatsApp link
    const generateWhatsAppLink = () => {
        const text = `Hola, estoy interesado/a en ${statusText} la propiedad: ${property.title} (ID: ${property.id}). ¿Podrían brindarme más información?`;
        return `https://wa.me/5492664463038?text=${encodeURIComponent(text)}`;
    };

    if (messageSent) {
        return (
            <div className="bg-primary/10 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold">¡Mensaje enviado!</h3>
                <p className="mt-2">
                    Gracias por contactarnos. Te responderemos a la brevedad posible.
                </p>
                <Button
                    className="mt-4"
                    onClick={() => setMessageSent(false)}
                >
                    Enviar otro mensaje
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-lg shadow p-6">
    // src/components/property/PropertyContact.tsx (continuación)
            <h3 className="text-xl font-semibold mb-4">¿Te interesa esta propiedad?</h3>
            <p className="text-muted-foreground mb-6">
                Completa el formulario y nos pondremos en contacto contigo a la brevedad.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Nombre completo
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border-border px-4 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border-border px-4 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Teléfono
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border-border px-4 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-md border-border px-4 py-2"
                        placeholder={`Hola, estoy interesado/a en ${statusText} esta propiedad...`}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
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

            <div className="mt-6 pt-6 border-t border-border">
                <p className="text-center mb-4">También puedes contactarnos directamente:</p>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(generateWhatsAppLink(), '_blank')}
                >
                    <Phone className="h-4 w-4 mr-2" />
                    Contactar por WhatsApp
                </Button>
            </div>
        </div>
    );
};
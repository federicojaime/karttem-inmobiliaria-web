// src/components/home/ContactCTA.tsx
import { Phone } from 'lucide-react';
import { Button } from '../ui/Button';

export const ContactCTA = () => {
  return (
    <div className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">¿Buscas asesoramiento inmobiliario?</h2>
        <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
          Contacta con nuestro equipo de profesionales. Te ayudaremos a encontrar la propiedad ideal o a vender la tuya al mejor precio.
        </p>
        <div className="mt-10">
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => window.open(`https://wa.me/5492664463038?text=${encodeURIComponent('Hola, me gustaría recibir información sobre propiedades.')}`, '_blank')}
          >
            <Phone className="mr-2 h-5 w-5" />
            Contactar por WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};
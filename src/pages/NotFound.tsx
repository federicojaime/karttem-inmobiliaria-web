// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-8">Página no encontrada</h2>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>
      </Button>
    </div>
  );
};
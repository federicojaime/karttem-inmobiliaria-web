// src/components/common/Logo.tsx
import { Link } from 'react-router-dom';
import karttemFullLogo from '../../assets/karttem-full-logo.png'; // Logo completo con "INMOBILIARIA"
import karttemLogo from '../../assets/karttem-full-logo.png'; // Solo KARTTEM si es necesario

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  asLink?: boolean;
}

export const Logo = ({ size = 'md', variant = 'full', asLink = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  // Seleccionar la imagen apropiada según la variante
  const logoSrc = variant === 'full' ? karttemFullLogo : karttemLogo;

  const LogoContent = () => (
    <img 
      src={logoSrc} 
      alt="KARTTEM Inmobiliaria" 
      className={sizeClasses[size]}
    />
  );

  if (asLink) {
    return (
      <Link to="/" className="flex items-center">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};
// src/components/common/Navbar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Search, Building, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { name: 'Inicio', path: '/', icon: <Home className="w-5 h-5 mr-2" /> },
    { name: 'Propiedades', path: '/properties', icon: <Building className="w-5 h-5 mr-2" /> },
    { name: 'Buscar', path: '/properties?search=true', icon: <Search className="w-5 h-5 mr-2" /> },
    { name: 'Contacto', path: '/contact', icon: <Phone className="w-5 h-5 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur ">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">KARTTEM</span>
            <span className="text-lg font-medium hidden sm:inline-block">Inmobiliaria</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={closeMenu}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <Button size="sm">
            <Phone className="w-4 h-4 mr-2" />
            +54 9 2664 46-3038
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
                <Button size="sm" className="w-full justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +54 9 2664 46-3038
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
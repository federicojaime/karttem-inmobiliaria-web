// src/components/ui/Notification.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Info } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  type: NotificationType;
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 3000,
  position = 'bottom-center'
}) => {
  useEffect(() => {
    let timer: number;
    if (isVisible && onClose) {
      timer = window.setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, onClose, duration]);

  // Define posición CSS según la prop position
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
    }
  };

  // Obtener el icono según el tipo de notificación
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-white" />;
      case 'error':
        return <X className="h-5 w-5 text-white" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-white" />;
      case 'info':
        return <Info className="h-5 w-5 text-white" />;
      default:
        return null;
    }
  };

  // Obtener color según el tipo
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${getPositionClasses()} z-50 flex items-center min-w-[280px] max-w-md`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <div className={`${getBackgroundColor()} text-white rounded-md shadow-lg overflow-hidden flex items-center w-full`}>
            <div className="flex-shrink-0 flex items-center justify-center p-4">
              {getIcon()}
            </div>
            <div className="py-3 px-4 flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="flex-shrink-0 p-2 rounded-full hover:bg-white/10 transition-colors mr-2"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
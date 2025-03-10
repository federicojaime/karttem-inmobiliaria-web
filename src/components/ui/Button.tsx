// src/components/ui/Button.tsx
import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-primary text-secondary font-semibold hover:bg-primary/90': variant === 'default',
            'bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'bg-secondary text-primary font-semibold hover:bg-secondary/90': variant === 'secondary',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'underline-offset-4 hover:underline text-primary font-semibold': variant === 'link',
            'h-10 px-4 py-2': size === 'default',
            'h-9 px-3 text-sm rounded-md': size === 'sm',
            'h-12 px-8 rounded-md text-base': size === 'lg',
            'h-10 w-10 p-0': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
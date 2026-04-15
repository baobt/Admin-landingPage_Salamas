import React from 'react';

const styles = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
  outline: 'border border-primary text-primary hover:bg-primary/10',
};

export default function CTAButton({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-md font-semibold transition ${styles[variant] || styles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
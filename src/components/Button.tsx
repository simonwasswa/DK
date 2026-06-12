import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({ children, variant = 'primary', onClick, href, className = '' }: ButtonProps) {
  const baseClasses = 'font-bold py-3 px-6 rounded transition-all duration-300 cursor-pointer';

  const variants = {
    primary: 'bg-amber-400 text-slate-900 hover:bg-amber-500',
    secondary: 'border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900',
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={buttonClasses}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={buttonClasses}
    >
      {children}
    </motion.button>
  );
}
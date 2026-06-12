import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedBackgroundProps {
  images: string[];
  children?: React.ReactNode;
  duration?: number;
  overlay?: boolean;
  overlayOpacity?: number;
}

export default function AnimatedBackground({
  images,
  children,
  duration = 8,
  overlay = true,
  overlayOpacity = 0.5,
}: AnimatedBackgroundProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [images.length, duration]);

  const variants = {
    enter: {
      opacity: 0,
      scale: 1.05,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration * 0.8,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: duration * 0.2,
      },
    },
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated Background Images */}
      <div className="absolute w-full h-full inset-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial="enter"
            animate={currentImageIndex === index ? 'center' : 'exit'}
            variants={variants}
            className="absolute inset-0"
          >
            <img
              src={image}
              alt={`background-${index}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Animated Overlay Gradient */}
      <motion.div
        animate={{
          backgroundPosition: ['1% 1%', '100% 100%'],
        }}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/70 to-slate-900"
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100],
              x: [0, Math.sin(i) * 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-2 h-2 bg-amber-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  title: string;
  image: string;
  text: string;
  rating: number;
}

export default function TestimonialCard({ name, title, image, text, rating }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/50 border border-amber-400/20 rounded-lg p-6 backdrop-blur-sm"
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Star size={18} className="fill-amber-400 text-amber-400" />
          </motion.div>
        ))}
      </div>

      <p className="text-gray-300 text-sm mb-6 leading-relaxed">"{text}"</p>

      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/30"
        />
        <div>
          <p className="text-white font-bold text-sm">{name}</p>
          <p className="text-gray-400 text-xs">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}
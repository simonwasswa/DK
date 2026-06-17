import { motion } from 'framer-motion';
import { ArrowRight, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  priceRange?: string | null;
  onBook?: () => void;
}

export default function ServiceCard({ icon, title, description, image, priceRange, onBook }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
      className="group bg-slate-800/50 border border-amber-400/20 hover:border-amber-400/50 rounded-2xl overflow-hidden backdrop-blur-sm flex flex-col"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-amber-400 p-3 rounded-lg text-slate-900 group-hover:rotate-12 transition-transform duration-300">
          {icon}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{description}</p>
        {priceRange && (
          <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold mb-4">
            <DollarSign size={14} />
            {priceRange}
          </div>
        )}
        {onBook ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBook}
            className="w-full btn-primary text-sm py-2 rounded-3xl flex items-center justify-center gap-2"
          >
            BOOK NOW <ArrowRight size={16} />
          </motion.button>
        ) : (
          <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2 rounded-3xl text-amber-400 font-semibold text-sm cursor-pointer">
            Read More <ArrowRight size={16} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Wrench, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'SERVICES', path: '/services' },
    { label: 'ABOUT', path: '/about' },
    { label: 'PORTFOLIO', path: '/portfolio' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-900 border-b border-amber-400/20 sticky top-0 z-50 w-full transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 md:h-20 w-full">
          <Link to="/" className="flex items-center gap-1 sm:gap-2 group min-h-12 min-w-12 flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-amber-500 dark:text-amber-400"
            >
              <Wrench size={24} className="md:w-8 md:h-8" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white leading-tight">DK</h1>
              <p className="text-xs text-amber-500 dark:text-amber-400 font-bold tracking-widest whitespace-nowrap">
                CAR MOD
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-slate-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 font-semibold text-xs xl:text-sm tracking-wide transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Theme Toggle + CTA Button */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-amber-500 dark:text-amber-400 p-2 rounded-full bg-amber-400/10 hover:bg-amber-400/20 transition-colors duration-300 flex items-center justify-center"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="btn-primary text-xs xl:text-sm font-bold px-3 xl:px-6 rounded-3xl"
              >
                BOOK NOW
              </Link>
            </motion.div>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-amber-500 dark:text-amber-400 p-2 rounded-full bg-amber-400/10 min-h-12 min-w-12 flex items-center justify-center"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="text-amber-500 dark:text-amber-400 p-2 rounded-3xl min-h-12 min-w-12 flex items-center justify-center"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-amber-400/20 transition-colors duration-300"
        >
          <nav className="flex flex-col gap-2 p-4 pb-6 pt-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 font-semibold text-sm tracking-wide transition-colors duration-300 block py-2 touch-target"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.05 }}
              className="pt-2"
            >
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-sm font-bold block text-center"
              >
                BOOK NOW
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
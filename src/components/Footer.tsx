import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
        { label: 'Portfolio', href: '/portfolio' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Exterior Detailing', href: '/services' },
        { label: 'Interior Detailing', href: '/services' },
        { label: 'Paint Correction', href: '/services' },
        { label: 'Engine Diagnostics', href: '/services' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: '+256 759 082 109', href: 'tel:+256759082109' },
        { label: '+256 785 598 590', href: 'tel:+256785598590' },
        { label: 'info@dkcarmod.com', href: 'mailto:info@dkcarmod.com' },
        { label: 'Support Available 24/7', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-950 border-t border-amber-400/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="text-amber-400">
                <Wrench size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">DK</h3>
                <p className="text-xs text-amber-400 font-bold">CAR MOD</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Premium car modification and detailing services for automotive enthusiasts.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-amber-400/10 hover:bg-amber-400 text-amber-400 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            >
              <h4 className="text-white font-bold mb-4 text-sm tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-amber-400/10 my-8"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="py-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © 2026 DK Car Modification. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
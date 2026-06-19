import { Link } from 'react-router-dom';
import { Facebook, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAPI } from '../hooks/useAPI';
import { supabase } from '../lib/supabase';

// Simple inline TikTok icon since lucide-react doesn't have one
function TikTokIcon({ size = 18 }: { size?: number | string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<{ size?: number | string }>> = {
  facebook: Facebook,
  tiktok: TikTokIcon,
};

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);
  const { getSocialLinks } = useAPI();

  useEffect(() => {
    getSocialLinks().then(setSocialLinks);

    const channel = supabase
      .channel('social-links-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'social_links' },
        async () => {
          const updated = await getSocialLinks();
          setSocialLinks(updated);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
        { label: 'www.dkcarmod.com', href: 'https://www.dkcarmod.com' },
        { label: 'Support Available 24/7', href: '#' },
      ],
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-100 dark:bg-slate-950 border-t border-amber-400/20 transition-colors duration-300"
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
              <div className="text-amber-500 dark:text-amber-400">
                <Wrench size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">DK</h3>
                <p className="text-xs text-amber-500 dark:text-amber-400 font-bold">CAR MOD</p>
              </div>
            </Link>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Premium car modification and detailing services for automotive enthusiasts.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = iconMap[social.platform.toLowerCase()];
                if (!Icon) return null;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-amber-400/10 hover:bg-amber-400 text-amber-500 dark:text-amber-400 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors duration-300"
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
              <h4 className="text-slate-900 dark:text-white font-bold mb-4 text-sm tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-slate-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 text-sm transition-colors duration-300"
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
          <p className="text-slate-500 dark:text-gray-500 text-sm">
            © 2026 DK Car Modification. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
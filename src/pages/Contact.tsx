import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Loader } from 'lucide-react';
import { useState } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useAPI } from '../hooks/useAPI';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const { loading, error, submitContact } = useAPI();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitContact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      subject: formData.service || undefined,
      message: formData.message,
      service_interest: formData.service || undefined,
    });

    if (success) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      details: '+256759082109, +256785598590',
      link: 'tel:+256759082109',
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: 'info@dkcarmod.com',
      link: 'mailto:info@dkcarmod.com',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Address',
      details: '123 Automotive Ave, Tech City, TC 12345',
      link: '#',
    },
    {
      icon: <Clock size={24} />,
      title: 'Hours',
      details: 'Mon-Sun: 08:00 AM - 06:00 PM',
      link: '#',
    },
  ];

  return (
    <div className="bg-slate-900">
      {/* Hero Section with Animated Background */}
      <section className="relative py-24  sm:px-6 lg:px-9 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={10}
          overlayOpacity={0.7}
        >
          <div className="max-w-7xl mx-auto text-center relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                Get in <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Have questions? Our team is here to help and will respond within 24 hours
              </p>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Contact Info Cards with Animated Background */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={11}
          overlayOpacity={0.8}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/50 border border-amber-400/20 hover:border-amber-400/50 rounded-lg p-6 text-center transition-colors duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="inline-block text-amber-400 mb-4 p-3 bg-amber-400/10 rounded-lg"
                  >
                    {info.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                  <p className="text-gray-400 text-sm">{info.details}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Contact Form Section with Animated Background */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625605/pexels-photo-3625605.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625610/pexels-photo-3625610.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={12}
          overlayOpacity={0.75}
        >
          <div className="max-w-4xl mx-auto relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-black text-white mb-8">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors duration-300"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Phone Number</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors duration-300"
                      placeholder="+256759082109"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Service Interested In</label>
                    <motion.select
                      whileFocus={{ scale: 1.02 }}
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded-lg px-4 py-3 text-white outline-none transition-colors duration-300"
                    >
                      <option value="">Select a service...</option>
                      <option value="detailing">Exterior Detailing</option>
                      <option value="interior">Interior Detailing</option>
                      <option value="paint">Paint Correction</option>
                      <option value="engine">Engine Diagnostics</option>
                      <option value="electrical">Electrical Repairs</option>
                      <option value="suspension">Suspension & Brakes</option>
                      <option value="custom">Custom Modifications</option>
                    </motion.select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Message</label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell us about your project..."
                    ></motion.textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary font-bold py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        SENDING...
                      </>
                    ) : submitted ? (
                      '✓ Message Sent!'
                    ) : (
                      'SEND MESSAGE'
                    )}
                  </motion.button>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm text-center"
                    >
                      Error: {error}
                    </motion.div>
                  )}

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-400 text-sm text-center"
                    >
                      Thank you for your message! We'll get back to you soon.
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-black text-white mb-8">Why Choose Us?</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Expert Team',
                      description: 'Certified technicians with 15+ years of experience in automotive modifications',
                    },
                    {
                      title: 'Premium Quality',
                      description: 'Only the finest materials and cutting-edge equipment for exceptional results',
                    },
                    {
                      title: 'Fast Turnaround',
                      description: 'Quick service without compromising on quality or attention to detail',
                    },
                    {
                      title: '24/7 Support',
                      description: 'Always available to answer your questions and provide assistance',
                    },
                  ].map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-700/50 border border-amber-400/20 rounded-lg p-4"
                    >
                      <h3 className="text-lg font-bold text-amber-400 mb-2">{reason.title}</h3>
                      <p className="text-gray-400 text-sm">{reason.description}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 border border-amber-400/30 rounded-lg p-6"
                >
                  <p className="text-sm text-gray-300">
                    <span className="text-amber-400 font-bold">Emergency Support Available!</span>
                    {' '}For urgent automotive issues, call us at +256759082109 and we'll prioritize your request.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Map Section with Animated Background */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625585/pexels-photo-3625585.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={11}
          overlayOpacity={0.8}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-slate-800/50 border border-amber-400/20 rounded-lg overflow-hidden h-96"
            >
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.8919522227557!2d-122.40522392343055!3d37.78995807179881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085817c6b3a0001%3A0x1234567890abcdef!2s123%20Automotive%20Ave%2C%20San%20Francisco!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>
    </div>
  );
}
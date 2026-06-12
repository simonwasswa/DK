import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader } from 'lucide-react';
import { useState } from 'react';
import { useAPI } from '../hooks/useAPI';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
  serviceId?: string;
}

export default function BookingModal({ isOpen, onClose, serviceName, serviceId }: BookingModalProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    booking_date: '',
    booking_time: '',
    vehicle_description: '',
    special_requests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const { loading, error, createBooking } = useAPI();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const booking = await createBooking({
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone || undefined,
      service_id: serviceId,
      service_name: serviceName || 'General Service',
      booking_date: formData.booking_date,
      booking_time: formData.booking_time || undefined,
      vehicle_description: formData.vehicle_description || undefined,
      special_requests: formData.special_requests || undefined,
    });

    if (booking) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          booking_date: '',
          booking_time: '',
          vehicle_description: '',
          special_requests: '',
        });
        setSubmitted(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-slate-900 border border-amber-400/20 rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Book {serviceName ? `${serviceName}` : 'Service'}
            </h2>
            <p className="text-gray-400 text-sm mb-6">Fill in your details below</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-1">Full Name</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded px-3 py-2 text-white placeholder-gray-500 outline-none transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-1">Email</label>
                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded px-3 py-2 text-white placeholder-gray-500 outline-none transition-colors text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-1">Phone</label>
                <input
                  type="tel"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded px-3 py-2 text-white placeholder-gray-500 outline-none transition-colors text-sm"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-1">Date</label>
                  <input
                    type="date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded px-3 py-2 text-white outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-1">Time</label>
                  <input
                    type="time"
                    name="booking_time"
                    value={formData.booking_time}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded px-3 py-2 text-white outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-1">Vehicle Description</label>
                <textarea
                  name="vehicle_description"
                  value={formData.vehicle_description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded px-3 py-2 text-white placeholder-gray-500 outline-none transition-colors text-sm resize-none"
                  placeholder="e.g., 2023 BMW M340i..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-1">Special Requests</label>
                <textarea
                  name="special_requests"
                  value={formData.special_requests}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-slate-700/50 border border-amber-400/20 focus:border-amber-400 rounded px-3 py-2 text-white placeholder-gray-500 outline-none transition-colors text-sm resize-none"
                  placeholder="Any special requests..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full btn-primary font-bold py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    BOOKING...
                  </>
                ) : submitted ? (
                  '✓ BOOKING CONFIRMED!'
                ) : (
                  'CONFIRM BOOKING'
                )}
              </motion.button>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded p-3 text-red-400 text-sm text-center">
                  Error: {error}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
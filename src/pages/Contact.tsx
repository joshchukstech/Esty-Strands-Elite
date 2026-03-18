import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-stone-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-stone-900 mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-stone-600 max-w-2xl mx-auto"
          >
            We'd love to hear from you. Book an appointment or ask us anything.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100"
          >
            <h2 className="text-3xl font-serif text-stone-900 mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-stone-900 mb-1">Phone & WhatsApp</h3>
                  <p className="text-stone-600">+234 810 357 9468</p>
                  <a 
                    href="https://wa.me/2348103579468" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-rose-600 hover:text-rose-700 text-sm font-medium mt-2 inline-block"
                  >
                    Chat on WhatsApp &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-stone-900 mb-1">Email</h3>
                  <p className="text-stone-600">enanesther3@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                {/* <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-rose-500" />
                </div> */}
                {/* <div>
                  <h3 className="text-lg font-medium text-stone-900 mb-1">Studio Location</h3>
                  <p className="text-stone-600 leading-relaxed">
                    123 Beauty Avenue, Victoria Island<br />
                    Lagos, Nigeria
                  </p>
                </div> */}
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-stone-900 mb-1">Business Hours</h3>
                  <p className="text-stone-600 leading-relaxed">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: Closed (Available for bridal bookings only)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-stone-900 p-10 rounded-3xl shadow-xl text-white"
          >
            <h2 className="text-3xl font-serif mb-8">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-stone-300 mb-2">Service Interested In</label>
                <select 
                  id="service" 
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow"
                >
                  <option>Wig Ventilation</option>
                  <option>Makeup & Gele</option>
                  <option>Bridal Styling</option>
                  <option>Wig Purchase</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-rose-500 text-white rounded-xl py-4 font-medium hover:bg-rose-600 transition-colors mt-4"
              >
                Send Message
              </button>
            </form>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
}

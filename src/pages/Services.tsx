import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Wig Ventilation",
      description: "Expert ventilation of frontal, closure, full lace, and braided wigs. We create natural-looking hairlines that blend seamlessly with your skin.",
      price: "From ₦15,000",
      features: ["Custom hairlines", "Bleached knots", "Plucking", "Durable lace"]
    },
    {
      title: "Makeup & Gele Tying",
      description: "Flawless makeup application for all occasions, paired with traditional and modern gele tying styles.",
      price: "From ₦20,000",
      features: ["Long-lasting products", "Skin prep", "Lash application", "Custom gele styles"]
    },
    {
      title: "Wig Installation",
      description: "Professional wig installation ensuring a secure, natural, and melt-into-skin finish.",
      price: "From ₦10,000",
      features: ["Bald cap method", "Adhesive or glueless", "Styling included", "Maintenance tips"]
    },
    {
      title: "Bridal Hair Styling",
      description: "Comprehensive bridal hair packages for your special day, including trials and touch-ups.",
      price: "Custom Quote",
      features: ["Consultation", "Trial session", "On-location service", "Veil placement"]
    },
    {
      title: "Wig Revamping",
      description: "Bring your old wigs back to life with our deep conditioning, restyling, and repair services.",
      price: "From ₦8,000",
      features: ["Deep wash & condition", "Detangling", "Restyling", "Lace repair"]
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-stone-900 mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-stone-600 max-w-2xl mx-auto"
          >
            Experience luxury beauty treatments tailored to enhance your natural elegance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-stone-100"
            >
              <h3 className="text-2xl font-serif text-stone-900 mb-4">{service.title}</h3>
              {/* <p className="text-rose-600 font-medium mb-6">{service.price}</p> */}
              <p className="text-stone-600 mb-8 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-stone-700">
                    <CheckCircle2 className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/2348103579468?text=Hello, I would like to book the ${service.title} service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-stone-900 text-white rounded-full hover:bg-rose-600 transition-colors"
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { motion } from "motion/react";

export default function About() {
  return (
    <div className="bg-stone-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/Esty's .jpeg" 
                  alt="Esty working on a client" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-rose-100 rounded-full -z-10" />
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-stone-200 rounded-full -z-10" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm font-semibold text-rose-500 uppercase tracking-widest mb-4">Our Story</h2>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8 leading-tight">
              Crafting Confidence Through Beauty
            </h1>
            
            <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
              <p>Hey there, I'm Esther Enan, CEO of Esty's Strands Elite 🎀</p>
              <p>I started my beauty business in 2020 with little or no  capital at all, relying on my monthly allowance from my parents cause 
                I was in school then Specialized in ventilating closures, frontals, full lace & braided wigs, makeup, gele, installation, bridal styling, and wig revamping.
                </p>
              <p>It wasn't easy but I kept pushing , cause my passion kept me going . I upsized my skills with online classes - installation, makeup & gele. Fast forward to 2025, I've grown, learned from mistakes & I'm doing better .
              </p>
              <p>I will keep pushing with God’s help. Watch me do even more better.</p>  
              <p>#EstysStrandsElite</p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-serif text-stone-900 mb-2">5+</h4>
                <p className="text-stone-500 text-sm uppercase tracking-wider">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-stone-900 mb-2">MANY</h4>
                <p className="text-stone-500 text-sm uppercase tracking-wider">Happy Clients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

export default function Location() {
  return (
    <section id="location" className="relative bg-cream py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs tracking-[0.3em] text-gold-dark uppercase">Visit Us</span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4">
            FIND OUR <span className="text-gradient-gold">STORE</span>
          </h2>
          <p className="text-ink/70 mt-4">
            Drop by our store in Madurai — try on the collection and let us help you find your fit.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-charcoal p-6 hover:border-gold-dark/40 transition-colors">
              <span className="rounded-xl bg-gold/15 p-3 text-gold-dark flex-shrink-0">
                <MapPin size={22} />
              </span>
              <div>
                <p className="text-ink font-semibold">Store Address</p>
                <p className="text-ink/70 text-sm mt-1 leading-relaxed">
                  Login Mens Only, Madurai, Tamil Nadu, India
                </p>
                <p className="text-ink/50 text-xs mt-2 italic">
                  Exact address pin to be updated on request.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-charcoal p-6 hover:border-gold-dark/40 transition-colors">
              <span className="rounded-xl bg-gold/15 p-3 text-gold-dark flex-shrink-0">
                <Clock size={22} />
              </span>
              <div>
                <p className="text-ink font-semibold">Store Hours</p>
                <p className="text-ink/70 text-sm mt-1">Everyday: 11:00 AM – 9:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-charcoal p-6 hover:border-gold-dark/40 transition-colors">
              <span className="rounded-xl bg-gold/15 p-3 text-gold-dark flex-shrink-0">
                <Phone size={22} />
              </span>
              <div>
                <p className="text-ink font-semibold">WhatsApp</p>
                <a
                  href="https://wa.me/919677340615"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-dark text-sm mt-1 hover:underline inline-block"
                >
                  +91 96773 40615
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-ink/10 min-h-[320px]"
          >
            <iframe
              title="Login Mens Only location map"
              src="https://www.google.com/maps?q=Madurai,Tamil%20Nadu,India&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="contrast-105 saturate-125"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

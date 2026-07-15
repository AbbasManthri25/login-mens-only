import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-cream bg-noise"
    >
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/50 via-transparent to-cream" />
      <div className="absolute -top-40 -right-40 w-128 h-128 bg-gold/25 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 -left-40 w-112 h-112 bg-gold-dark/20 rounded-full blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-dark/40 px-4 py-1.5 text-xs tracking-[0.2em] text-gold-dark uppercase mb-6">
            Est. October 2016 · Madurai
          </span>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-wide text-ink">
            DRESS SHARP.
            <br />
            <span className="text-gradient-gold">STAND OUT.</span>
          </h1>

          <p className="mt-6 max-w-md text-ink/70 text-base sm:text-lg leading-relaxed">
            Madurai's go-to men's fashion store — premium Shirts, Pants,
            T-Shirts &amp; Track Pants curated for the modern man since 2016.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-ink hover:bg-gold-light transition-all hover:shadow-[0_0_25px_rgba(244,196,48,0.55)] hover:-translate-y-0.5"
            >
              Explore Collection
            </a>
            <a
              href="https://wa.me/919677340615"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold-dark/50 px-8 py-3.5 text-sm font-semibold text-gold-dark hover:bg-gold/10 transition-all hover:-translate-y-0.5"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 max-w-sm gap-6 border-t border-ink/10 pt-6">
            <div>
              <p className="font-display text-3xl text-gold-dark">9+</p>
              <p className="text-xs text-ink/60 uppercase tracking-wide mt-1">Years Strong</p>
            </div>
            <div>
              <p className="font-display text-3xl text-gold-dark">4</p>
              <p className="text-xs text-ink/60 uppercase tracking-wide mt-1">Collections</p>
            </div>
            <div>
              <p className="font-display text-3xl text-gold-dark">1000+</p>
              <p className="text-xs text-ink/60 uppercase tracking-wide mt-1">Happy Customers</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden border border-gold-dark/20 shadow-[0_0_60px_rgba(244,196,48,0.2)]">
            <img
              src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1200&auto=format&fit=crop"
              alt="Stylish men's fashion at Login Mens Only"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-charcoal border border-gold-dark/30 rounded-2xl px-6 py-4 shadow-xl">
            <p className="font-display text-2xl text-gold-dark">2016</p>
            <p className="text-[11px] text-ink/60 uppercase tracking-wider">Established</p>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#shop"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-dark/70 hover:text-gold-dark"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <ArrowDown size={26} />
      </motion.a>
    </section>
  );
}

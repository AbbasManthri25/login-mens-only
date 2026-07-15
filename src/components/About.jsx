import { motion } from "framer-motion";
import { Award, Users, ShirtIcon, MapPin } from "lucide-react";

const STATS = [
  { icon: Award, label: "Established", value: "October 2016" },
  { icon: ShirtIcon, label: "Collections", value: "4 Curated Lines" },
  { icon: Users, label: "Customers Served", value: "1000+" },
  { icon: MapPin, label: "Rooted In", value: "Madurai" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-cream py-28 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-gold-dark/25">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000&auto=format&fit=crop"
              alt="Login Mens Only store"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream/80 to-transparent" />
          </div>
          <div className="absolute -top-6 -right-6 bg-gold text-ink rounded-2xl px-6 py-4 shadow-xl rotate-3">
            <p className="font-display text-xl leading-none">EST. 2016</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs tracking-[0.3em] text-ink uppercase">Our Story</span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4 leading-tight">
            ESTABLISHED IN <span className="text-gradient-gold">OCTOBER 2016</span>
          </h2>
          <p className="text-ink mt-6 leading-relaxed">
            What began as a small men's fashion store in Madurai has grown into
            a name trusted across the community. Since October 2016, Login Mens
            Only has been dedicated to bringing sharp, contemporary style to
            every man — without compromising on quality or comfort.
          </p>
          <p className="text-ink mt-4 leading-relaxed">
            From everyday T-Shirts to sharp formal Shirts, versatile Pants and
            comfortable Track Pants, every piece on our rack is chosen with one
            goal in mind: helping you look and feel your best.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-xl border border-ink/10 bg-white p-4 hover:border-gold-dark/40 transition-colors"
              >
                <span className="rounded-lg bg-gold/15 p-2 text-gold-dark">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-ink font-semibold text-sm">{value}</p>
                  <p className="text-ink/60 text-xs uppercase tracking-wide mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

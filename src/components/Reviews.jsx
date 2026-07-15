import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Arun Kumar",
    rating: 5,
    text: "Great collection of shirts and the fitting is spot on. The staff helped me pick the right size and even suggested a few combos. Definitely my go-to store in Madurai now.",
  },
  {
    name: "Vignesh S",
    rating: 5,
    text: "Bought a couple of track pants for the gym and they've held up really well after months of washing. Good quality fabric for the price.",
  },
  {
    name: "Mohammed Irfan",
    rating: 4,
    text: "Nice variety of formal shirts, picked one up for a wedding and got so many compliments. Only wish they had a slightly bigger size range for a few designs.",
  },
  {
    name: "Karthik Raja",
    rating: 5,
    text: "Been shopping here since 2018. Prices are honest and the quality has never disappointed me. The WhatsApp ordering makes it super convenient too.",
  },
  {
    name: "Suresh Babu",
    rating: 5,
    text: "Walked in looking for casual T-shirts and walked out with a full outfit. The staff aren't pushy, they just help you find what actually suits you.",
  },
  {
    name: "Prakash Raj",
    rating: 4,
    text: "Solid store for everyday menswear. The pants fit true to size and the fabric feels durable. Will be back for the new season stock.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative bg-cream py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs tracking-[0.3em] text-gold-dark uppercase">Testimonials</span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4">
            WHAT OUR <span className="text-gradient-gold">CUSTOMERS SAY</span>
          </h2>
          <p className="text-ink/70 mt-4">
            Real feedback from the people who shop with us in Madurai.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="flex flex-col rounded-2xl border border-ink/10 bg-charcoal p-6 hover:border-gold-dark/40 transition-colors"
            >
              <Quote className="text-gold-dark/40" size={28} />

              <div className="flex items-center gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className={idx < review.rating ? "text-gold-dark fill-gold-dark" : "text-ink/20"}
                  />
                ))}
              </div>

              <p className="text-ink/70 text-sm mt-4 leading-relaxed flex-1">
                "{review.text}"
              </p>

              <p className="text-ink font-semibold text-sm mt-5">{review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

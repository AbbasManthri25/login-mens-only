import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MapPin, Clock, Phone } from "lucide-react";

const CATEGORIES = [
  { label: "Shirts", to: "/shirts" },
  { label: "Pants", to: "/pants" },
  { label: "T-Shirts", to: "/tshirts" },
  { label: "Track Pants", to: "/track-pants" },
];
const LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/#shop" },
  { label: "About", href: "/#about" },
  { label: "Reviews", href: "/#reviews" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-cream border-t border-gold-dark/20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs tracking-[0.3em] text-gold-dark uppercase">Visit Us</span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4">
            FIND OUR <span className="text-gradient-gold">STORE</span>
          </h2>
          <p className="text-ink/70 mt-4">
            Drop by our store in Madurai — try on the collection and let us help you find your fit.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-2 flex flex-col gap-4">
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
          </div>

          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-ink/10 min-h-[320px]">
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-10 border-t border-ink/10">
        <div>
          <span className="font-display text-2xl text-ink">LOGIN</span>
          <span className="block text-xs tracking-[0.4em] text-gold-dark uppercase -mt-1">
            Mens Only
          </span>
          <p className="text-ink text-sm mt-4 leading-relaxed">
            Madurai's men's fashion destination since October 2016. Sharp
            styles, honest prices.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="https://www.facebook.com/Mazin.maf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold-dark/30 p-2.5 text-gold-dark hover:bg-gold hover:text-ink transition-all"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/loginmens"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold-dark/30 p-2.5 text-gold-dark hover:bg-gold hover:text-ink transition-all"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://wa.me/919677340615"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold-dark/30 p-2.5 text-gold-dark hover:bg-gold hover:text-ink transition-all"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-ink font-semibold mb-4">Quick Links</p>
          <ul className="space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-ink text-sm hover:text-gold-dark transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-ink font-semibold mb-4">Collections</p>
          <ul className="space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c.label}>
                <Link to={c.to} className="text-ink text-sm hover:text-gold-dark transition-colors">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-ink font-semibold mb-4">Get in Touch</p>
          <ul className="space-y-2.5 text-sm text-ink">
            <li>
              <a href="#contact" className="hover:text-gold-dark transition-colors">
                Store location &amp; address
              </a>
            </li>
            <li>
              <a href="https://wa.me/919677340615" target="_blank" rel="noopener noreferrer" className="hover:text-gold-dark transition-colors">
                +91 96773 40615
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <p className="text-ink/50 text-xs">
            &copy; {new Date().getFullYear()} Login Mens Only. All rights reserved.
          </p>
          <Link to="/admin/login" className="text-ink/40 text-xs hover:text-gold-dark transition-colors">
            Add
          </Link>
        </div>
        <p className="text-ink/50 text-xs">Established October 2016 · Madurai</p>
      </div>
    </footer>
  );
}

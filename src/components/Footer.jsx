import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  { label: "Location", href: "/#location" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-cream border-t border-gold-dark/20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
            <li>Madurai, Tamil Nadu, India</li>
            <li>11:00 AM – 9:00 PM, Everyday</li>
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

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo/Login_Logo.png";

const LINKS = [
  { label: "Home", href: "/#home", black: false },
  { label: "Shop", href: "/#shop", black: false },
  { label: "About", href: "/#about", black: true },
  { label: "Location", href: "/#location", black: false },
  { label: "Contact", href: "/#contact", black: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md border-b border-gold-dark/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {/* <img
            src={"/src/assets/Logo/Login_Logo.png"}
            alt="Login Mens Only"
            className="h-16 md:h-20 w-auto"
          /> */}
          <img
          src={logo}
          alt="Login Mens Only"
          className="h-16 md:h-20 w-auto"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`relative text-sm font-medium transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-gold-dark after:transition-all hover:after:w-full ${
                  link.black ? "text-ink hover:text-ink/70" : "text-[#ca8a04] hover:text-[#a16207]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin/add-product"
            className="inline-flex items-center gap-2 rounded-full border border-gold-dark/30 px-5 py-2.5 text-sm font-semibold text-gold-dark hover:bg-gold hover:text-ink transition-all"
          >
            <Plus size={16} /> Add Product
          </Link>
          <a
            href="https://wa.me/919677340615"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light transition-all hover:shadow-[0_0_20px_rgba(244,196,48,0.5)]"
          >
            Order on WhatsApp
          </a>
        </div>

        <button
          className="md:hidden text-gold-dark"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-cream/95 backdrop-blur-md border-t border-gold-dark/20 mt-4"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-base border-b border-ink/10 ${
                      link.black ? "text-ink" : "text-[#ca8a04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  to="/admin/add-product"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-gold-dark/30 px-5 py-3 text-sm font-semibold text-gold-dark"
                >
                  <Plus size={16} /> Add Product
                </Link>
              </li>
              <li className="pt-3">
                <a
                  href="https://wa.me/919677340615"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink"
                >
                  Order on WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Diamond } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Hotels", path: "/hotels" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? "bg-background/70 backdrop-blur-2xl border-b border-primary/5" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-24">
        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/logos/removedbg.png" 
              alt="easy checkin" 
              className="h-10 w-auto md:h-12"
            />
          </motion.div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ y: -2 }}
              className="relative"
            >
              <Link
                to={link.path}
                className={`text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-500 relative py-2 px-1 link-underline ${
                  location.pathname === link.path
                    ? "text-primary pointer-events-none cursor-default"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={(e) => location.pathname === link.path && e.preventDefault()}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary shadow-[0_0_8px_rgba(212,168,83,0.8)]"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/hotels"
              className="luxury-btn text-[10px] !px-7 !py-2.5 ml-4"
            >
              <span>Book Now</span>
            </Link>
          </motion.div>
        </div>


        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-primary/5"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-medium tracking-[0.2em] uppercase py-2 ${
                    location.pathname === link.path 
                      ? "text-primary pointer-events-none cursor-default" 
                      : "text-muted-foreground"
                  }`}
                  onClick={(e) => location.pathname === link.path && e.preventDefault()}
                >
                  {link.name}
                </Link>

              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

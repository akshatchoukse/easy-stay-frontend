import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Diamond, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="border-t border-border/10 relative overflow-hidden bg-background/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent shadow-[0_0_20px_rgba(212,168,83,0.1)]" />
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block group mb-8">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src="/logos/logo-dark-bg.png" 
                alt="easy checkin" 
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed font-light text-base">
              Discover the world's most extraordinary hotels. Where luxury meets unforgettable experiences through seamless check-ins.
            </p>
          </div>

          <div className="md:pl-10">
            <h4 className="luxury-label mb-8">Navigate</h4>
            <div className="flex flex-col gap-5">
              {["Home", "Hotels", "About", "Contact"].map((item) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                const isActive = location.pathname === path;

                return (
                  <motion.div
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={path}
                      className={`transition-all duration-500 text-sm font-light uppercase tracking-widest ${
                        isActive 
                          ? "text-primary pointer-events-none cursor-default font-semibold shadow-[0_0_10px_rgba(212,168,83,0.1)]" 
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      onClick={(e) => isActive && e.preventDefault()}
                    >
                      {item}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="luxury-label mb-8">Contact Us</h4>
            <div className="flex flex-col gap-6 text-sm text-muted-foreground font-light">
              <motion.a 
                whileHover={{ x: 5 }}
                href="mailto:easycheckin@gmail.com" 
                className="flex items-center gap-3 hover:text-primary transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span>easycheckin@gmail.com</span>
              </motion.a>
              <motion.a 
                whileHover={{ x: 5 }}
                href="tel:+919111177718" 
                className="flex items-center gap-3 hover:text-primary transition-all duration-300 group"
              >
                <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span>+91 91111 77718</span>
              </motion.a>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 group"
              >
                <MapPin className="w-4 h-4 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                <span>Vijay Nagar Indore,<br />Madhya Pradesh, India</span>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-border/10 text-center relative">
          <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <span className="luxury-label opacity-60">
            © {new Date().getFullYear()} easy checkin. Crafted for Luxury.
          </span>
        </div>
      </div>
    </footer>
  );
}


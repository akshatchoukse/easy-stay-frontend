import { Link, useLocation } from "react-router-dom";
import { Diamond } from "lucide-react";

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="border-t border-border/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logos/logo-dark-bg.png" alt="easy checkin" className="h-8 w-auto" />
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed font-light">
              Discover the world's most extraordinary hotels. Where luxury meets unforgettable experiences.
            </p>
          </div>
          <div>
            <h4 className="luxury-label mb-6">Navigate</h4>
            <div className="flex flex-col gap-4">
              {["Home", "Hotels", "About", "Contact"].map((item) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                const isActive = location.pathname === path;

                return (
                  <Link
                    key={item}
                    to={path}
                    className={`transition-colors duration-500 text-sm font-light ${
                      isActive 
                        ? "text-primary pointer-events-none cursor-default font-medium" 
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={(e) => isActive && e.preventDefault()}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="luxury-label mb-6">Contact</h4>
            <div className="flex flex-col gap-4 text-sm text-muted-foreground font-light">
              <a href="mailto:easycheckin@gmail.com" className="hover:text-primary transition-colors duration-300">
                easycheckin@gmail.com
              </a>
              <a href="tel:+919111177718" className="hover:text-primary transition-colors duration-300">
                +919111177718
              </a>
              <p>Vijay Nagar Indore<br />Madhya Pradesh, India</p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/10 text-center">
          <span className="luxury-label">
            © {new Date().getFullYear()} easy checkin. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

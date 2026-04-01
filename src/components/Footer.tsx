import { Link } from "react-router-dom";
import { Diamond } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Diamond className="w-4 h-4 text-primary" />
              <span className="font-heading text-2xl font-light text-foreground tracking-[0.15em]">
                LUXURIA
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed font-light">
              Discover the world's most extraordinary hotels. Where luxury meets unforgettable experiences.
            </p>
          </div>
          <div>
            <h4 className="luxury-label mb-6">Navigate</h4>
            <div className="flex flex-col gap-4">
              {["Home", "Hotels", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors duration-500 text-sm font-light"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="luxury-label mb-6">Contact</h4>
            <div className="flex flex-col gap-4 text-sm text-muted-foreground font-light">
              <p>hello@luxuria.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Luxury Avenue<br />New York, NY 10001</p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/10 text-center">
          <span className="luxury-label">
            © {new Date().getFullYear()} Luxuria Hotels. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

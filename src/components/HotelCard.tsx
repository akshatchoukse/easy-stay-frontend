import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import type { Hotel } from "@/data/hotels";

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

export default function HotelCard({ hotel, index }: HotelCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      style={{ perspective: 1000 }}
    >
      <Link to={`/hotels/${hotel.id}`} className="block group">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="glass-card-hover overflow-hidden hover-glow relative"
        >
          <div className="relative h-72 overflow-hidden hover-zoom-img" style={{ transform: "translateZ(50px)" }}>
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/20">
              <Star className="w-3 h-3 text-primary fill-primary" />
              <span className="text-[11px] font-medium text-foreground">{hotel.rating}</span>
            </div>
          </div>
          
          <div className="p-7" style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <MapPin className="w-3 h-3 text-primary/70" />
              <span className="luxury-label">{hotel.city}</span>
            </div>
            <h3 className="font-heading text-2xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-500 tracking-wide">
              {hotel.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2 font-light">
              {hotel.shortDescription}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border/10">
              <div>
                <span className="text-3xl font-heading font-light text-gradient-gold">₹{hotel.pricePerNight}</span>
                <span className="text-[10px] text-muted-foreground ml-1 uppercase tracking-wider">/ night</span>
              </div>
              <div className="flex items-center gap-2 group-hover:text-primary transition-all duration-500 overflow-hidden">
                <span className="luxury-label text-primary group-hover:translate-x-[-5px] transition-transform duration-500">
                  Discover
                </span>
                <ArrowRight className="w-3 h-3 text-primary translate-x-[-15px] group-hover:translate-x-0 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}


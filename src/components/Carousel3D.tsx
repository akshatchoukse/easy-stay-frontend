import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Hotel } from "@/data/hotels";

interface Carousel3DProps {
  hotels: Hotel[];
}

export default function Carousel3D({ hotels }: Carousel3DProps) {
  const [active, setActive] = useState(0);
  const total = hotels.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const getIndex = (offset: number) => ((active + offset) % total + total) % total;

  const positions = [
    { x: 0, z: 0, scale: 1, opacity: 1, rotateY: 0 },        // center
    { x: 320, z: -120, scale: 0.78, opacity: 0.6, rotateY: -25 },  // right
    { x: -320, z: -120, scale: 0.78, opacity: 0.6, rotateY: 25 },  // left
    { x: 550, z: -220, scale: 0.6, opacity: 0.3, rotateY: -40 },   // far right
    { x: -550, z: -220, scale: 0.6, opacity: 0.3, rotateY: 40 },   // far left
  ];

  const getCardStyle = (cardIndex: number) => {
    const diff = ((cardIndex - active) % total + total) % total;
    if (diff === 0) return { ...positions[0], zIndex: 10 };
    if (diff === 1) return { ...positions[1], zIndex: 8 };
    if (diff === total - 1) return { ...positions[2], zIndex: 8 };
    if (diff === 2) return { ...positions[3], zIndex: 6 };
    if (diff === total - 2) return { ...positions[4], zIndex: 6 };
    return { x: 0, z: -400, scale: 0.4, opacity: 0, rotateY: 0, zIndex: 0 };
  };

  return (
    <div className="relative w-full">
      {/* Carousel container */}
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ height: "480px", perspective: "1200px" }}
      >
        {hotels.map((hotel, i) => {
          const style = getCardStyle(i);
          const isActive = i === active;

          return (
            <motion.div
              key={hotel.id}
              className="absolute cursor-pointer"
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                rotateY: style.rotateY,
                z: style.z,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                zIndex: style.zIndex,
                transformStyle: "preserve-3d",
              }}
              onClick={() => setActive(i)}
            >
              <div
                className={`relative w-[340px] md:w-[400px] rounded-2xl overflow-hidden transition-shadow duration-700 ${
                  isActive
                    ? "shadow-[0_20px_80px_hsl(var(--gold)/0.2)]"
                    : "shadow-[0_10px_40px_hsl(0_0%_0%/0.4)]"
                }`}
              >
                {/* Image */}
                <div className="relative h-[320px] md:h-[380px] overflow-hidden">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/20">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="text-[11px] font-medium text-foreground">{hotel.rating}</span>
                  </div>

                  {/* Info overlay at bottom */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="absolute bottom-0 left-0 right-0 p-6"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-3 h-3 text-primary/70" />
                          <span className="luxury-label">{hotel.city}</span>
                        </div>
                        <h3 className="font-heading text-2xl font-light text-foreground tracking-wide mb-2">
                          {hotel.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-light line-clamp-2 mb-4">
                          {hotel.shortDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-heading font-light text-gradient-gold">
                              ₹{hotel.pricePerNight}
                            </span>
                            <span className="text-[10px] text-muted-foreground ml-1 uppercase tracking-wider">/ night</span>
                          </div>
                          <Link
                            to={`/hotels/${hotel.id}`}
                            className="luxury-label text-primary hover:tracking-[0.5em] transition-all duration-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Details →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => setActive((active - 1 + total) % total)}
          className="w-12 h-12 rounded-full border border-border/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-500"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {hotels.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-500 rounded-full ${
                i === active
                  ? "w-8 h-1.5 bg-primary"
                  : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setActive((active + 1) % total)}
          className="w-12 h-12 rounded-full border border-border/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-500"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

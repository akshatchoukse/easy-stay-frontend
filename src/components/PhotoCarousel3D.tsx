import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PhotoCarousel3DProps {
  images: string[];
}

export default function PhotoCarousel3D({ images }: PhotoCarousel3DProps) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const isMobile = useIsMobile();

  // Auto rotate every 3 seconds
  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [total]);

  if (total === 0) return null;

  const positions = isMobile ? [
    { x: 0, z: 0, scale: 1, opacity: 1, rotateY: 0 },        // center
    { x: 120, z: -80, scale: 0.8, opacity: 0.6, rotateY: -15 }, // right
    { x: -120, z: -80, scale: 0.8, opacity: 0.6, rotateY: 15 }, // left
    { x: 180, z: -150, scale: 0.6, opacity: 0.3, rotateY: -25 },  // far right
    { x: -180, z: -150, scale: 0.6, opacity: 0.3, rotateY: 25 },  // far left
  ] : [
    { x: 0, z: 0, scale: 1, opacity: 1, rotateY: 0 },        // center
    { x: 280, z: -100, scale: 0.8, opacity: 0.5, rotateY: -20 },  // right
    { x: -280, z: -100, scale: 0.8, opacity: 0.5, rotateY: 20 },  // left
    { x: 480, z: -200, scale: 0.6, opacity: 0.2, rotateY: -35 },   // far right
    { x: -480, z: -200, scale: 0.6, opacity: 0.2, rotateY: 35 },   // far left
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
    <div className="relative w-full py-10 overflow-hidden">
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ height: isMobile ? "300px" : "450px", perspective: "1000px" }}
      >
        {images.map((img, i) => {
          const style = getCardStyle(i);
          const isActive = i === active;

          return (
            <motion.div
              key={i}
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
                className={`relative w-[260px] md:w-[500px] h-[300px] md:h-[450px] rounded-3xl overflow-hidden transition-shadow duration-700 bg-transparent ${
                  isActive
                    ? "shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                    : "shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover" // Changed to object-cover for better 3D look
                  loading="lazy"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => setActive((active - 1 + total) % total)}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-500 bg-background/10 backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-500 rounded-full ${
                i === active
                  ? "w-8 h-1.5 bg-primary"
                  : "w-1.5 h-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setActive((active + 1) % total)}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-500 bg-background/10 backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Diamond } from "lucide-react";
import { hotels } from "@/data/hotels";
import HotelCard from "@/components/HotelCard";

export default function Hotels() {
  return (
    <div className="min-h-screen pt-28">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="luxury-label">
            Our Properties
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-light mt-4 text-foreground tracking-wide">
            Luxury <span className="italic text-gradient-gold">Hotels</span>
          </h1>
          <div className="luxury-divider max-w-xs mx-auto">
            <Diamond className="w-3 h-3 text-primary/40 flex-shrink-0" />
          </div>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto font-light">
            Explore our curated collection of the world's finest hotels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {hotels.map((hotel, i) => (
            <HotelCard key={hotel.id} hotel={hotel} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

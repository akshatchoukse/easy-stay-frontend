import { motion } from "framer-motion";
import { Diamond } from "lucide-react";
import { useHotels } from "@/hooks/useHotels";
import HotelCard from "@/components/HotelCard";
import SharedLoader from "@/components/SharedLoader";
import PageReveal from "@/components/PageReveal";

export default function Hotels() {
  const { data: hotels, isLoading, isError } = useHotels();

  return (
    <PageReveal>
      <div className="min-h-screen pt-28 pb-20" style={{ perspective: "2000px" }}>
        <div className="section-padding max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <span className="luxury-label">
              Our Properties
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-light mt-4 text-foreground tracking-wide">
              Luxury <span className="italic text-gradient-gold">Hotels</span>
            </h1>
            <div className="luxury-divider max-w-xs mx-auto">
              <Diamond className="w-3 h-3 text-primary/40 flex-shrink-0 animate-pulse" />
            </div>
            <p className="text-xl text-muted-foreground mt-2 max-w-lg mx-auto font-light">
              Explore our curated collection of the world's finest hotels.
            </p>
          </motion.div>

          {isLoading ? (
            <SharedLoader fullHeight />
          ) : isError ? (
            <div className="text-center py-20 text-muted-foreground">
              Failed to load hotels. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {hotels?.map((hotel, i) => (
                <HotelCard key={hotel.id} hotel={hotel} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageReveal>
  );
}


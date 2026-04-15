import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Diamond } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchHotels } from "@/lib/api";
import HotelCard from "@/components/HotelCard";
import Carousel3D from "@/components/Carousel3D";
import SharedLoader from "@/components/SharedLoader";
import PageReveal from "@/components/PageReveal";

const HeroScene = lazy(() => import("@/components/HeroScene"));

const sectionVariants = {
  hidden: { opacity: 0, y: 100, rotateX: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Index() {
  const { data: hotels, isLoading, isError } = useQuery({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
  });

  return (
    <PageReveal>
      <div className="min-h-screen" style={{ perspective: "2000px" }}>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
            <HeroScene />
          </Suspense>

          {/* Subtle overlay grain */}
          <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

          <div className="relative z-10 text-center px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/60" />
                <Diamond className="w-3 h-3 text-primary animate-pulse" />
                <span className="luxury-label">
                  Premium Collection
                </span>
                <Diamond className="w-3 h-3 text-primary animate-pulse" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/60" />
              </div>
              <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] mb-8 tracking-wide">
                <span className="text-foreground">Where Luxury</span>
                <br />
                <span className="text-gradient-gold font-semibold italic">Meets Wonder</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed font-light">
                Discover handpicked extraordinary hotels across the Indore, curated for the most discerning travelers.
              </p>
              <motion.a
                href="#featured"
                whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px -10px rgba(212,168,83,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="luxury-btn inline-block group overflow-hidden"
              >
                <span className="flex items-center gap-2">
                  Explore Hotels
                  <ArrowDown className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1" />
                </span>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          >
            <ArrowDown className="w-4 h-4 text-primary/60" />
          </motion.div>
        </section>

        {/* Stats */}
        <section className="section-padding border-y border-border/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-transparent" />
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
            {[
              { label: "Luxury Hotels", value: isLoading ? "..." : (hotels?.length || 0) + "+" },
              { label: "Countries", value: "25" },
              { label: "Happy Guests", value: "10K+" },
              { label: "Awards", value: "35" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 1 }}
                className="relative group"
              >
                <div className="text-4xl md:text-5xl font-heading font-light text-gradient-gold mb-2 transition-transform duration-500 group-hover:scale-110">
                  {stat.value}
                </div>
                <div className="luxury-label">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3D Carousel */}
        <section className="section-padding overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <span className="luxury-label">Explore</span>
              <h2 className="font-heading text-5xl md:text-6xl font-light mt-4 text-foreground tracking-wide">
                Our <span className="italic text-gradient-gold">Destinations</span>
              </h2>
              <div className="luxury-divider max-w-xs mx-auto">
                <Diamond className="w-3 h-3 text-primary/40 flex-shrink-0 animate-pulse" />
              </div>
            </motion.div>
            {hotels ? (
              <Carousel3D hotels={hotels} />
            ) : (
              <SharedLoader />
            )}
          </div>
        </section>


        <section id="featured" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <span className="luxury-label">
                Our Collection
              </span>
              <h2 className="font-heading text-5xl md:text-6xl font-light mt-4 text-foreground tracking-wide">
                Featured <span className="italic text-gradient-gold">Hotels</span>
              </h2>
              <div className="luxury-divider max-w-xs mx-auto">
                <Diamond className="w-3 h-3 text-primary/40 flex-shrink-0 animate-pulse" />
              </div>
              <p className="text-muted-foreground mt-2 max-w-lg mx-auto font-light">
                Each property is carefully selected for its exceptional quality, unique character, and unforgettable experiences.
              </p>
            </motion.div>

            {isLoading ? (
              <SharedLoader />
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
        </section>

        {/* CTA */}
        <section className="section-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center glass-card p-16 md:p-24 gold-glow relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <span className="luxury-label mb-6 block">Begin Your Journey</span>
            <h2 className="font-heading text-4xl md:text-6xl font-light text-foreground mb-6 tracking-wide">
              Ready for an <br className="hidden md:block" />
              <span className="text-gradient-gold italic font-semibold">Extraordinary</span> Stay?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto font-light">
              Let us help you find the perfect luxury escape for your next journey.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px -10px rgba(212,168,83,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="luxury-btn inline-block"
            >
              <span>Get in Touch</span>
            </motion.a>
          </motion.div>
        </section>
      </div>
    </PageReveal>
  );
}


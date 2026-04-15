import { motion } from "framer-motion";
import { Award, Globe, Heart, Users, Diamond } from "lucide-react";
import PageReveal from "@/components/PageReveal";

const values = [
  { icon: <Award className="w-7 h-7" />, title: "Excellence", desc: "We partner only with hotels that meet our exacting standards of luxury and service." },
  { icon: <Heart className="w-7 h-7" />, title: "Passion", desc: "Every recommendation comes from genuine love for extraordinary hospitality." },
  { icon: <Globe className="w-7 h-7" />, title: "Global Reach", desc: "From secluded island retreats to grand city landmarks, we span the globe." },
  { icon: <Users className="w-7 h-7" />, title: "Personal Touch", desc: "Our concierge team crafts bespoke itineraries tailored to your desires." },
];

export default function About() {
  return (
    <PageReveal>
      <div className="min-h-screen pt-28 pb-20" style={{ perspective: "1500px" }}>
        <div className="section-padding max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40, rotateX: -10 }} 
            animate={{ opacity: 1, y: 0, rotateX: 0 }} 
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
            className="text-center mb-16"
          >
            <span className="luxury-label">Our Story</span>
            <h1 className="font-heading text-5xl md:text-7xl font-light mt-4 text-foreground tracking-wide">
              About <span className="italic text-gradient-gold">easy checkin</span>
            </h1>
            <div className="luxury-divider max-w-xs mx-auto">
              <Diamond className="w-3 h-3 text-primary/40 flex-shrink-0 animate-pulse" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center mb-24"
          >
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-light">
              Founded in 2024, easy checkin was born from a simple belief: every journey deserves an effortless, extraordinary start. We've simplified the hospitality experience, hand-selecting hotels and streamlining the check-in process to ensure you spend more time enjoying your stay and less time at the front desk.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              Our team of travel connoisseurs personally visits and evaluates each property, ensuring that every hotel in our collection meets the highest standards of luxury, service, and character.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 50, rotateY: i % 2 === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card p-10 text-center group hover-lift border-primary/5 hover:border-primary/20 transition-all duration-700"
              >
                <div className="text-primary/60 mb-6 flex justify-center group-hover:scale-110 group-hover:text-primary transition-all duration-500">{v.icon}</div>
                <h3 className="font-heading text-2xl font-light text-foreground mb-4 tracking-wide">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-16 md:p-24 text-center gold-glow relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <span className="luxury-label mb-6 block">Our Purpose</span>
            <h2 className="font-heading text-5xl md:text-6xl font-light text-foreground mb-8 tracking-wide">
              Our <span className="text-gradient-gold italic font-semibold">Mission</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              To connect discerning travelers with the world's most remarkable hotels, creating memories that last a lifetime. We believe luxury isn't just about opulence — it's about authentic experiences, impeccable service, and moments of pure wonder.
            </p>
          </motion.div>
        </div>
      </div>
    </PageReveal>
  );
}


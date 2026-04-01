import { motion } from "framer-motion";
import { Award, Globe, Heart, Users, Diamond } from "lucide-react";

const values = [
  { icon: <Award className="w-7 h-7" />, title: "Excellence", desc: "We partner only with hotels that meet our exacting standards of luxury and service." },
  { icon: <Heart className="w-7 h-7" />, title: "Passion", desc: "Every recommendation comes from genuine love for extraordinary hospitality." },
  { icon: <Globe className="w-7 h-7" />, title: "Global Reach", desc: "From secluded island retreats to grand city landmarks, we span the globe." },
  { icon: <Users className="w-7 h-7" />, title: "Personal Touch", desc: "Our concierge team crafts bespoke itineraries tailored to your desires." },
];

export default function About() {
  return (
    <div className="min-h-screen pt-28">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="luxury-label">Our Story</span>
          <h1 className="font-heading text-5xl md:text-7xl font-light mt-4 text-foreground tracking-wide">
            About <span className="italic text-gradient-gold">Luxuria</span>
          </h1>
          <div className="luxury-divider max-w-xs mx-auto">
            <Diamond className="w-3 h-3 text-primary/40 flex-shrink-0" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-light">
            Founded in 2010, Luxuria was born from a simple belief: every journey deserves an extraordinary place to call home. We've spent over a decade travelling the world, hand-selecting hotels that offer more than just a room — they offer an experience.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            Our team of travel connoisseurs personally visits and evaluates each property, ensuring that every hotel in our collection meets the highest standards of luxury, service, and character.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="glass-card p-10 text-center group hover:border-primary/10 transition-all duration-700"
            >
              <div className="text-primary/60 mb-5 flex justify-center group-hover:text-primary transition-colors duration-500">{v.icon}</div>
              <h3 className="font-heading text-2xl font-light text-foreground mb-3 tracking-wide">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-16 md:p-24 text-center gold-glow relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <span className="luxury-label mb-4 block">Our Purpose</span>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-6 tracking-wide">
            Our <span className="text-gradient-gold italic font-semibold">Mission</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            To connect discerning travelers with the world's most remarkable hotels, creating memories that last a lifetime. We believe luxury isn't just about opulence — it's about authentic experiences, impeccable service, and moments of pure wonder.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

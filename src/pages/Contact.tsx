import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Diamond } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen pt-28">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="luxury-label">Get in Touch</span>
          <h1 className="font-heading text-5xl md:text-7xl font-light mt-4 text-foreground tracking-wide">
            Contact <span className="italic text-gradient-gold">Us</span>
          </h1>
          <div className="luxury-divider max-w-xs mx-auto">
            <Diamond className="w-3 h-3 text-primary/40 flex-shrink-0" />
          </div>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto font-light">
            We'd love to hear from you. Reach out and let us help plan your next luxury escape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            {[
              { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@luxuria.com" },
              { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: <MapPin className="w-5 h-5" />, label: "Address", value: "123 Luxury Avenue\nNew York, NY 10001" },
            ].map((item) => (
              <div key={item.label} className="glass-card p-8 flex items-start gap-5 group hover:border-primary/10 transition-all duration-500">
                <div className="text-primary/60 mt-0.5 group-hover:text-primary transition-colors duration-500">{item.icon}</div>
                <div>
                  <h3 className="font-heading text-xl font-light text-foreground mb-1 tracking-wide">{item.label}</h3>
                  <p className="text-muted-foreground whitespace-pre-line font-light">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="glass-card p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <h2 className="font-heading text-3xl font-light text-foreground mb-8 tracking-wide">Send a Message</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 transition-colors font-light"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 transition-colors font-light"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 transition-colors font-light"
              />
              <select className="w-full px-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-muted-foreground focus:outline-none focus:border-primary/30 transition-colors font-light">
                <option>General Inquiry</option>
                <option>Booking Request</option>
                <option>Partnership</option>
                <option>Press</option>
              </select>
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 resize-none transition-colors font-light"
              />
              <button
                type="submit"
                className="luxury-btn w-full text-center"
              >
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

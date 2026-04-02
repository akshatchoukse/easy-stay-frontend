import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Diamond, Calendar, Users, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    inquiryType: "general",
    checkIn: "",
    checkOut: "",
    guests: "1",
    message: ""
  });
  const [errorHeader, setErrorHeader] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "fullName" && value.trim()) {
      setErrorHeader(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      setErrorHeader(true);
      return;
    }

    const { fullName, inquiryType, checkIn, checkOut, guests, message } = formData;
    
    let whatsappText = `*New Inquiry from ${fullName}*\n\n`;
    whatsappText += `*Inquiry Type:* ${inquiryType.toUpperCase()}\n`;
    
    if (inquiryType === "booking") {
      whatsappText += `*Check-in:* ${checkIn}\n`;
      whatsappText += `*Check-out:* ${checkOut}\n`;
      whatsappText += `*Guests:* ${guests}\n`;
    }
    
    whatsappText += `\n*Message:*\n${message}`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/919111177718?text=${encodedText}`;
    
    window.open(whatsappUrl, "_blank");
    toast.success("Redirecting to WhatsApp...");
  };

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
              { icon: <Mail className="w-5 h-5" />, label: "Email", value: "easycheckin@gmail.com", href: "mailto:easycheckin@gmail.com" },
              { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+91 91111 77718", href: "tel:+919111177718" },
              { icon: <MapPin className="w-5 h-5" />, label: "Address", value: "Vijay Nagar Indore,\nMadhya Pradesh, India" },
            ].map((item) => (
              <div key={item.label} className="glass-card p-8 flex items-start gap-5 group hover:border-primary/10 transition-all duration-500">
                <div className="text-primary/60 mt-0.5 group-hover:text-primary transition-colors duration-500">{item.icon}</div>
                <div>
                  <h3 className="font-heading text-xl font-light text-foreground mb-1 tracking-wide">{item.label}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-muted-foreground whitespace-pre-line font-light hover:text-primary transition-colors duration-300">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground whitespace-pre-line font-light">{item.value}</p>
                  )}
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
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={`w-full px-5 py-4 bg-secondary/30 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all font-light ${
                    errorHeader ? "border-red-500/50 focus:border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-border/20 focus:border-primary/30"
                  }`}
                />
                <AnimatePresence>
                  {errorHeader && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-[11px] font-medium tracking-wide flex items-center gap-1.5 px-2 mt-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      Please provide your name to continue
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <Select 
                value={formData.inquiryType} 
                onValueChange={(val) => handleInputChange("inquiryType", val)}
              >
                <SelectTrigger className="w-full h-auto px-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground focus:ring-0 focus:ring-offset-0 focus:border-primary/30 transition-all font-light">
                  <SelectValue placeholder="Select Inquiry Type" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-xl border-primary/10">
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="booking">Booking Request</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="press">Press</SelectItem>
                </SelectContent>
              </Select>

              <AnimatePresence>
                {formData.inquiryType === "booking" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4 overflow-hidden pt-2"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                        <input
                          type="date"
                          value={formData.checkIn}
                          onChange={(e) => handleInputChange("checkIn", e.target.value)}
                          className="w-full pl-12 pr-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground focus:outline-none focus:border-primary/30 transition-all font-light [color-scheme:dark]"
                        />
                        <span className="absolute -top-2.5 left-4 px-2 bg-background/50 backdrop-blur-md text-[10px] text-primary uppercase tracking-widest font-medium border border-primary/10 rounded-full">Check-in</span>
                      </div>
                      <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                        <input
                          type="date"
                          value={formData.checkOut}
                          onChange={(e) => handleInputChange("checkOut", e.target.value)}
                          className="w-full pl-12 pr-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground focus:outline-none focus:border-primary/30 transition-all font-light [color-scheme:dark]"
                        />
                        <span className="absolute -top-2.5 left-4 px-2 bg-background/50 backdrop-blur-md text-[10px] text-primary uppercase tracking-widest font-medium border border-primary/10 rounded-full">Check-out</span>
                      </div>
                    </div>
                    <div className="relative group">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                      <input
                        type="number"
                        min="1"
                        placeholder="Number of Guests"
                        value={formData.guests}
                        onChange={(e) => handleInputChange("guests", e.target.value)}
                        className="w-full pl-12 pr-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground focus:outline-none focus:border-primary/30 transition-all font-light"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <textarea
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="w-full px-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 resize-none transition-all font-light"
              />
              <button
                type="submit"
                className="luxury-btn w-full text-center group"
              >
                <span className="flex items-center justify-center gap-2">
                  Send Message
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}




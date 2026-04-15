import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Star, ChevronLeft, Wifi, Car, Waves, UtensilsCrossed, Dumbbell, Sparkles, X, Diamond, CalendarIcon, Clock, Users, Navigation, Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchHotelById } from "@/lib/api";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import PhotoCarousel3D from "@/components/PhotoCarousel3D";
import DynamicIcon from "@/components/DynamicIcon";
import SharedLoader from "@/components/SharedLoader";
import PageReveal from "@/components/PageReveal";

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-5 h-5" />,
  Parking: <Car className="w-5 h-5" />,
  "Valet Parking": <Car className="w-5 h-5" />,
  Pool: <Waves className="w-5 h-5" />,
  "Infinity Pool": <Waves className="w-5 h-5" />,
  Restaurant: <UtensilsCrossed className="w-5 h-5" />,
  Gym: <Dumbbell className="w-5 h-5" />,
};

export default function HotelDetail() {
  const { id } = useParams();
  const { data: hotel, isLoading, isError } = useQuery({
    queryKey: ["hotel", id],
    queryFn: () => fetchHotelById(id!),
    enabled: !!id,
  });
  
  const [showEnquiry, setShowEnquiry] = useState(false);

  if (isLoading) {
    return <SharedLoader fullHeight />;
  }

  if (isError || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-5xl font-light text-foreground mb-4">Hotel Not Found</h1>
          <Link to="/hotels" className="text-primary hover:underline luxury-label">← Back to Hotels</Link>
        </div>
      </div>
    );
  }

  return (
    <PageReveal>
      <div className="min-h-screen pt-28 pb-20" style={{ perspective: "2000px" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/hotels" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-500 luxury-label mb-10 block group">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300" /> Back to Hotels
            </Link>
          </motion.div>

          {/* Dynamic Photo Gallery (3D Carousel) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }} 
            animate={{ opacity: 1, scale: 1, rotateX: 0 }} 
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
            className="mb-16 -mx-6 md:-mx-12 lg:-mx-24"
          >
            <PhotoCarousel3D images={hotel.images} />
          </motion.div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-3 h-3 text-primary/70" />
                <span className="luxury-label">{hotel.city}</span>
              </div>
              <h1 className="font-heading text-5xl md:text-7xl font-light text-foreground mb-8 tracking-wide leading-[1.1]">
                {hotel.name}
              </h1>
              <div className="luxury-divider max-w-[200px]">
                <Diamond className="w-2.5 h-2.5 text-primary/30 flex-shrink-0 animate-pulse" />
              </div>
              <p className="text-muted-foreground leading-relaxed text-xl mb-14 font-light whitespace-pre-wrap">
                {hotel.description}
              </p>

              {/* Amenities */}
              <h2 className="font-heading text-4xl font-light text-foreground mb-10 tracking-wide">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {hotel.amenities.map((amenity, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.6 }}
                    className="glass-card p-6 flex flex-col items-center gap-4 group/amenity hover-lift border-primary/5 hover:border-primary/20 transition-all duration-500"
                  >
                    <span className="text-primary/70 group-hover/amenity:scale-110 group-hover/amenity:text-primary transition-all duration-500">
                      <DynamicIcon 
                        iconName={amenity.icon} 
                        className="w-6 h-6" 
                        fallback={amenityIcons[amenity.name] || <Sparkles className="w-6 h-6" />}
                      />
                    </span>
                    <span className="text-xs uppercase tracking-widest text-foreground/80 font-medium group-hover/amenity:text-primary transition-colors duration-500 text-center">
                      {amenity.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-heading text-4xl font-light text-foreground tracking-wide">Location</h2>
                {hotel.mapLink && (
                  <motion.a
                    href={hotel.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-2 text-xs luxury-label text-primary transition-all duration-500"
                  >
                    <Navigation className="w-3 h-3" /> Get Direction
                  </motion.a>
                )}
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden border border-border/10 h-96 bg-secondary/20 relative group gold-glow"
              >
                {hotel.embedMapLink ? (
                  <iframe
                    src={hotel.embedMapLink}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hotel location"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-10 text-center">
                    <MapPin className="w-10 h-10 mb-4 opacity-20" />
                    <p className="text-lg font-light">Map view not available for this property yet.</p>
                    {hotel.mapLink && (
                      <motion.a 
                        href={hotel.mapLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        whileHover={{ scale: 1.05 }}
                        className="luxury-btn mt-8"
                      >
                        <span>View on Google Maps</span>
                      </motion.a>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-card p-10 sticky top-32 gold-glow relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                
                <div className="text-center mb-10">
                  <span className="luxury-label mb-2 block">Starting from</span>
                  <div className="text-6xl font-heading font-light text-gradient-gold mt-3 transition-transform duration-700 group-hover:scale-110 group-hover:tracking-tight">
                    ₹{hotel.pricePerNight}
                  </div>
                  <span className="luxury-label mt-2 block">per night</span>
                </div>

                <div className="space-y-6 mb-10 py-8 border-y border-border/10">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-5 text-sm"
                  >
                    <div className="p-2.5 rounded-full bg-primary/5 text-primary">
                      <Phone className="w-4 h-4" />
                    </div>
                    <a href={`tel:${hotel.contactNumber}`} className="text-foreground/90 font-light hover:text-primary transition-colors duration-300">
                      {hotel.contactNumber}
                    </a>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-5 text-sm"
                  >
                    <div className="p-2.5 rounded-full bg-primary/5 text-primary">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-foreground/90 font-light">{hotel.city}</span>
                  </motion.div>
                </div>

                <motion.button
                  onClick={() => setShowEnquiry(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="luxury-btn w-full text-center group overflow-hidden"
                >
                  <span className="flex items-center justify-center gap-2 group-hover:tracking-[0.4em] transition-all duration-500">
                    Send Enquiry
                    <Send className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enquiry Modal */}
        <EnquiryModal
          show={showEnquiry}
          onClose={() => setShowEnquiry(false)}
          hotelName={hotel.name}
          contactNumber={hotel.contactNumber}
        />
      </div>
    </PageReveal>
  );
}

function EnquiryModal({ show, onClose, hotelName, contactNumber }: { show: boolean; onClose: () => void; hotelName: string; contactNumber: string }) {
  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [time, setTime] = useState("14:00");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");

  const inputClass = "w-full px-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 transition-all font-light";

  const handleSubmit = () => {
    const digits = contactNumber.replace(/[^0-9]/g, "");
    const text = [
      `🏨 *Booking Enquiry - ${hotelName}*`,
      ``,
      `👤 *Name:* ${name || "Guest"}`,
      `📅 *Check-in:* ${checkIn ? format(checkIn, "PPP") : "Not selected"}`,
      `📅 *Check-out:* ${checkOut ? format(checkOut, "PPP") : "Not selected"}`,
      `🕐 *Arrival Time:* ${time}`,
      `👥 *Guests:* ${guests}`,
      message ? `💬 *Message:* ${message}` : "",
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-2xl p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotateX: 20 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
            className="glass-card p-10 max-w-lg w-full gold-glow relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-heading text-4xl font-light text-foreground">Book via WhatsApp</h3>
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                onClick={onClose} 
                className="text-muted-foreground hover:text-foreground transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="luxury-label mb-3 block">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="luxury-label mb-3 block">Check-in Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn(inputClass, "flex items-center gap-3 text-left", !checkIn && "text-muted-foreground")}>
                        <CalendarIcon className="w-4 h-4 text-primary/60 flex-shrink-0" />
                        {checkIn ? format(checkIn, "PPP") : "Select date"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-border/20 shadow-2xl" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-4 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="luxury-label mb-3 block">Check-out Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn(inputClass, "flex items-center gap-3 text-left", !checkOut && "text-muted-foreground")}>
                        <CalendarIcon className="w-4 h-4 text-primary/60 flex-shrink-0" />
                        {checkOut ? format(checkOut, "PPP") : "Select date"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-border/20 shadow-2xl" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date < (checkIn || new Date())}
                        initialFocus
                        className={cn("p-4 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Time & Guests row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="luxury-label mb-3 block">Arrival Time</label>
                  <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={cn(inputClass, "pl-11 [color-scheme:dark]")}
                    />
                  </div>
                </div>
                <div>
                  <label className="luxury-label mb-3 block">No. of Guests</label>
                  <div className="relative group">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className={cn(inputClass, "pl-11 appearance-none bg-secondary/30")}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n} className="bg-card">{n} {n === 1 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="luxury-label mb-3 block">Special Requests (Optional)</label>
                <textarea
                  placeholder="Any special requests..."
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(inputClass, "resize-none")}
                />
              </div>

              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(212,168,83,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="luxury-btn w-full text-center flex items-center justify-center gap-3 group"
              >
                <span className="flex items-center gap-2 group-hover:tracking-[0.4em] transition-all duration-500">
                  Send via WhatsApp
                  <Send className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


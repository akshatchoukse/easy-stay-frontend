import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Star, ChevronLeft, Wifi, Car, Waves, UtensilsCrossed, Dumbbell, Sparkles, X, Diamond, CalendarIcon, Clock, Users } from "lucide-react";
import { hotels } from "@/data/hotels";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
  const hotel = hotels.find((h) => h.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);

  if (!hotel) {
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
    <div className="min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/hotels" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-500 luxury-label mb-10 block">
            <ChevronLeft className="w-3 h-3" /> Back to Hotels
          </Link>
        </motion.div>

        {/* Gallery */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-16">
          <div className="relative h-[55vh] rounded-2xl overflow-hidden mb-4 group">
            <img
              src={hotel.images[selectedImage]}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/10" />
            <div className="absolute bottom-6 left-6 z-10">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-sm font-medium text-foreground">{hotel.rating}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {hotel.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`h-24 rounded-xl overflow-hidden border transition-all duration-500 ${
                  selectedImage === i ? "border-primary/50 shadow-[0_0_20px_hsl(var(--gold)/0.15)]" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-3 h-3 text-primary/70" />
              <span className="luxury-label">{hotel.city}</span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-light text-foreground mb-8 tracking-wide">{hotel.name}</h1>
            <div className="luxury-divider max-w-[200px]">
              <Diamond className="w-2.5 h-2.5 text-primary/30 flex-shrink-0" />
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg mb-14 font-light">{hotel.description}</p>

            {/* Amenities */}
            <h2 className="font-heading text-3xl font-light text-foreground mb-8 tracking-wide">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {hotel.amenities.map((amenity) => (
                <div key={amenity} className="glass-card p-5 flex items-center gap-3 group/amenity hover:border-primary/10 transition-all duration-500">
                  <span className="text-primary/70 group-hover/amenity:text-primary transition-colors duration-500">
                    {amenityIcons[amenity] || <Sparkles className="w-5 h-5" />}
                  </span>
                  <span className="text-sm text-foreground/80 font-light">{amenity}</span>
                </div>
              ))}
            </div>

            {/* Map */}
            <h2 className="font-heading text-3xl font-light text-foreground mb-8 tracking-wide">Location</h2>
            <div className="rounded-2xl overflow-hidden border border-border/10 h-72">
              <iframe
                src={hotel.mapLink}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel location"
              />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="glass-card p-10 sticky top-32 gold-glow relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="text-center mb-8">
                <span className="luxury-label">Starting from</span>
                <div className="text-5xl font-heading font-light text-gradient-gold mt-3">
                  ${hotel.pricePerNight}
                </div>
                <span className="luxury-label mt-1 block">per night</span>
              </div>

              <div className="space-y-5 mb-8 py-6 border-y border-border/10">
                <div className="flex items-center gap-4 text-sm">
                  <Phone className="w-4 h-4 text-primary/60" />
                  <span className="text-foreground/80 font-light">{hotel.contactNumber}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <MapPin className="w-4 h-4 text-primary/60" />
                  <span className="text-foreground/80 font-light">{hotel.city}</span>
                </div>
              </div>

              <button
                onClick={() => setShowEnquiry(true)}
                className="luxury-btn w-full text-center"
              >
                <span>Send Enquiry</span>
              </button>
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
  );
}

function EnquiryModal({ show, onClose, hotelName, contactNumber }: { show: boolean; onClose: () => void; hotelName: string; contactNumber: string }) {
  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [time, setTime] = useState("14:00");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");

  const inputClass = "w-full px-5 py-4 bg-secondary/30 border border-border/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 transition-colors font-light";

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-xl p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-10 max-w-md w-full gold-glow relative overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-heading text-3xl font-light text-foreground">Book via WhatsApp</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="luxury-label mb-2 block">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Check-in Date */}
              <div>
                <label className="luxury-label mb-2 block">Check-in Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn(inputClass, "flex items-center gap-3 text-left", !checkIn && "text-muted-foreground")}>
                      <CalendarIcon className="w-4 h-4 text-primary/60 flex-shrink-0" />
                      {checkIn ? format(checkIn, "PPP") : "Select date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-border/20" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out Date */}
              <div>
                <label className="luxury-label mb-2 block">Check-out Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn(inputClass, "flex items-center gap-3 text-left", !checkOut && "text-muted-foreground")}>
                      <CalendarIcon className="w-4 h-4 text-primary/60 flex-shrink-0" />
                      {checkOut ? format(checkOut, "PPP") : "Select date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-border/20" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) => date < (checkIn || new Date())}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time & Guests row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="luxury-label mb-2 block">Arrival Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={cn(inputClass, "pl-11")}
                    />
                  </div>
                </div>
                <div>
                  <label className="luxury-label mb-2 block">No. of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className={cn(inputClass, "pl-11 appearance-none")}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="luxury-label mb-2 block">Special Requests (Optional)</label>
                <textarea
                  placeholder="Any special requests..."
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(inputClass, "resize-none")}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="luxury-btn w-full text-center flex items-center justify-center gap-3"
              >
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  images: string[];
  amenities: { name: string; icon?: string }[];
  mapLink: string;
  embedMapLink?: string;
  contactNumber: string;
  rating: number;
}

export const hotels: Hotel[] = [
  {
    id: "the-royal-palace",
    name: "The Royal Palace",
    city: "Paris, France",
    description: "Nestled in the heart of Paris, The Royal Palace offers an unparalleled luxury experience with breathtaking views of the Eiffel Tower. Each suite is meticulously designed with hand-selected furnishings, marble bathrooms, and private balconies. Our Michelin-starred restaurant serves exquisite French cuisine, while the rooftop bar provides panoramic views of the City of Light. The spa features treatments inspired by ancient French beauty rituals.",
    shortDescription: "Luxury Parisian retreat with Eiffel Tower views and Michelin-starred dining.",
    pricePerNight: 850,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    ],
    amenities: [
      { name: "WiFi" }, { name: "Spa" }, { name: "Pool" }, { name: "Restaurant" }, 
      { name: "Bar" }, { name: "Gym" }, { name: "Concierge" }, { name: "Valet Parking" }
    ],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999!2d2.2945!3d48.8584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzMwLjIiTiAywrAxNyc0MC4yIkU!5e0!3m2!1sen!2sfr!4v1",
    contactNumber: "+33 1 42 86 82 00",
    rating: 4.9,
  },
  {
    id: "azure-coast-resort",
    name: "Azure Coast Resort",
    city: "Santorini, Greece",
    description: "Perched on the dramatic cliffs of Santorini, Azure Coast Resort offers an extraordinary escape where the Aegean Sea meets the sky. Our whitewashed suites feature infinity pools that seem to merge with the ocean horizon. Wake up to spectacular sunsets, enjoy Mediterranean cuisine at our cliffside restaurant, and explore the island's ancient villages. Every detail is crafted for an unforgettable Grecian experience.",
    shortDescription: "Cliffside Santorini paradise with infinity pools and Aegean Sea views.",
    pricePerNight: 720,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    ],
    amenities: [
      { name: "WiFi" }, { name: "Infinity Pool" }, { name: "Spa" }, { name: "Restaurant" }, 
      { name: "Bar" }, { name: "Beach Access" }, { name: "Yoga Studio" }, { name: "Helipad" }
    ],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3200!2d25.4615!3d36.3932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sgr!4v1",
    contactNumber: "+30 22860 71234",
    rating: 4.8,
  },
  {
    id: "sakura-gardens",
    name: "Sakura Gardens",
    city: "Kyoto, Japan",
    description: "Sakura Gardens is a serene haven where traditional Japanese aesthetics meet modern luxury. Set amidst ancient cherry blossom gardens, our ryokan-inspired suites feature private onsen baths, tatami floors, and shoji screens. Experience the art of kaiseki dining, participate in traditional tea ceremonies, and find inner peace in our Zen meditation gardens. A sanctuary for those seeking harmony and tranquility.",
    shortDescription: "Traditional Japanese luxury amidst ancient cherry blossom gardens.",
    pricePerNight: 680,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
    ],
    amenities: [
      { name: "WiFi" }, { name: "Onsen" }, { name: "Zen Garden" }, { name: "Tea Room" }, 
      { name: "Restaurant" }, { name: "Spa" }, { name: "Meditation Room" }, { name: "Library" }
    ],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268!2d135.7681!3d35.0116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sjp!4v1",
    contactNumber: "+81 75-541-3131",
    rating: 4.9,
  },
  {
    id: "desert-mirage",
    name: "Desert Mirage",
    city: "Dubai, UAE",
    description: "Rising from the golden sands of the Arabian desert, Desert Mirage is an architectural masterpiece that redefines luxury. Our palatial suites feature floor-to-ceiling windows overlooking the endless dunes, private plunge pools, and butler service. Experience desert safaris, falconry, and stargazing from our observatory. The hotel's seven restaurants offer cuisines from around the world, each a culinary journey.",
    shortDescription: "Palatial desert resort with panoramic dune views and world-class dining.",
    pricePerNight: 1200,
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1587874522487-fe10e954d035?w=800",
    ],
    amenities: [
      { name: "WiFi" }, { name: "Pool" }, { name: "Spa" }, { name: "7 Restaurants" }, 
      { name: "Desert Safari" }, { name: "Observatory" }, { name: "Butler Service" }, { name: "Helipad" }
    ],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600!2d55.2708!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sae!4v1",
    contactNumber: "+971 4 399 8888",
    rating: 4.7,
  },
  {
    id: "aurora-lodge",
    name: "Aurora Lodge",
    city: "Tromsø, Norway",
    description: "Aurora Lodge offers a once-in-a-lifetime experience beneath the Northern Lights. Our glass-roofed cabins provide unobstructed views of the Arctic sky, while the interiors wrap you in Scandinavian warmth with fur throws, fireplaces, and natural wood. Enjoy gourmet Nordic cuisine, husky sledding, and whale watching excursions. In summer, experience the midnight sun from our mountain-top hot tubs.",
    shortDescription: "Arctic luxury with glass-roofed cabins under the Northern Lights.",
    pricePerNight: 950,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    ],
    amenities: [
      { name: "WiFi" }, { name: "Hot Tub" }, { name: "Fireplace" }, { name: "Restaurant" }, 
      { name: "Bar" }, { name: "Husky Sledding" }, { name: "Whale Watching" }, { name: "Sauna" }
    ],
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1400!2d18.9551!3d69.6496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sno!4v1",
    contactNumber: "+47 77 75 30 00",
    rating: 4.8,
  },
];

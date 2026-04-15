import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface BackendHotel {
  _id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsappNumber: string;
  mapLink: string;
  images: Array<{ url: string; public_id: string; isCover?: boolean }>;
  amenities: Array<{ name: string; icon?: string }>;

  startingPrice: number;
  embedMapLink?: string;
}

export const fetchHotels = async () => {
  const { data } = await api.get<BackendHotel[]>('/hotels');
  return data.map(hotel => ({
    id: hotel._id,
    name: hotel.name,
    city: `${hotel.city}${hotel.state ? `, ${hotel.state}` : ''}`,
    description: hotel.description,
    shortDescription: hotel.description.length > 100 ? hotel.description.substring(0, 100) + '...' : hotel.description,
    pricePerNight: hotel.startingPrice,
    images: hotel.images.length > 0 
      ? [
          hotel.images.find(img => img.isCover)?.url || hotel.images[0].url,
          ...hotel.images.filter(img => !img.isCover).map(img => img.url)
        ] 
      : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"], // placeholder
    amenities: hotel.amenities,
    mapLink: hotel.mapLink,
    embedMapLink: hotel.embedMapLink,
    contactNumber: hotel.phone,
    rating: 4.9, // Default rating as backend doesn't have it yet
  }));
};

export const fetchHotelById = async (id: string) => {
  const { data } = await api.get<BackendHotel>(`/hotels/${id}`);
  return {
    id: data._id,
    name: data.name,
    city: `${data.city}${data.state ? `, ${data.state}` : ''}`,
    description: data.description,
    shortDescription: data.description.length > 100 ? data.description.substring(0, 100) + '...' : data.description,
    pricePerNight: data.startingPrice,
    images: data.images.length > 0 
      ? [
          data.images.find(img => img.isCover)?.url || data.images[0].url,
          ...data.images.filter(img => !img.isCover).map(img => img.url)
        ] 
      : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"], // placeholder
    amenities: data.amenities,
    mapLink: data.mapLink,
    embedMapLink: data.embedMapLink,
    contactNumber: data.phone,
    rating: 4.9,
  };
};

export default api;

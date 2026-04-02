import { useQuery } from "@tanstack/react-query";
import { fetchHotels } from "@/lib/api";

export function useHotels() {
  return useQuery({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
  });
}

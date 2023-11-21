import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { BACKEND_URL } from "../http";

// https://qtrip-dynamic-webapp.onrender.com/adventures?city=bangkok
const useAdventure = (city: string) => {
  const { data, error, isLoading } = useSWR(
    `${BACKEND_URL}/adventure?city=${city}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
  };
};

export default useAdventure;

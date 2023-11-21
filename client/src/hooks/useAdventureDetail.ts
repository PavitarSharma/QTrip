import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { BACKEND_URL } from "../http";

// https://qtrip-dynamic-webapp.onrender.com/adventures/detail?adventure=3409781073

const useAdventureDetail = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${BACKEND_URL}/adventure/details/${id}`,
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
    mutate
  };
};

export default useAdventureDetail;

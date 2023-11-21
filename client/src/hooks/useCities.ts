import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { BACKEND_URL } from "../http";

const useCities = ({ search = "" }) => {
  const url = search
    ? `${BACKEND_URL}/cities?city=${search}`
    : `${BACKEND_URL}/cities`;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useCities;

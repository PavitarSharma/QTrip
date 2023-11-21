import useSWR from "swr";
import { privateFetcher } from "../utils/fetcher";
import { BACKEND_URL } from "../http";

const useUserProfile = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${BACKEND_URL}/user/profile`,
    privateFetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUserProfile;

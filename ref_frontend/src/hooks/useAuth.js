import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
  const { 
    data: user, 
    ...rest 
  } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity, // will fetch the user once and the user will be cached and won't refetch the request
    ...opts,
  });
  return {
    user,
    ...rest,
  };
};

export default useAuth;

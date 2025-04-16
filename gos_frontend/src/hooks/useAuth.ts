
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";

export const AUTH = "auth"

const useAuth = (opts = {}) => {
    const{
        data: user,
        ...rest 
    } = useQuery({
        queryKey: [AUTH],
        queryFn:  getUser,
        staleTime: Infinity, // fetch user initially once and is cached - gets access to user data without having to keep remaking the same request
        ...opts
    })

    return {
        user, ...rest
    }
}

export default useAuth;
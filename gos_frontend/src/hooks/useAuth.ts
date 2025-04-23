
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { getUser, updateUser} from "../lib/api";

export const AUTH = "auth"

const useAuth = (opts = {}) => {

    const queryClient = useQueryClient();

    const{
        data: user,
        ...rest 
    } = useQuery({
        queryKey: [AUTH],
        queryFn:  getUser,
        staleTime: Infinity, // fetch user initially once and is cached - gets access to user data without having to keep remaking the same request
        ...opts
    });

    const {
        mutate: updateUserData,
        isError: isUpdateError,
    } = useMutation({
        mutationFn: updateUser,
        onSuccess: (newUserData) => {
            queryClient.setQueryData([AUTH], newUserData);
        },
    });

 
    return {
        user,
        updateUserData,
        isUpdateError,

        ...rest
    }
}

export default useAuth;
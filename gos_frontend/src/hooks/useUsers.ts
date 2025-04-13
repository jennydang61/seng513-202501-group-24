import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../lib/api";


export const USERS = "users"

const useUsers = (opts={}) => {
    const {
        data: users = [], ...rest
    } = useQuery({
        queryKey: [USERS],
        queryFn: getUsers,
        ...opts
    })

    return { users, ...rest };
};

export default useUsers;
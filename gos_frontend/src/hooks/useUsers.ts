import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../lib/api";


export const USERS = "users"

const useUsers = (opts={}) => {
    const {
        data: users = [], ...rest
    } = useQuery({
        queryKey: [USERS],
        queryFn: getAllUsers,
        ...opts
    })

    return { users, ...rest };
};

export default useUsers;
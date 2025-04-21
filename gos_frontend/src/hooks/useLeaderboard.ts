import { useQuery } from "@tanstack/react-query";
import { getLeaderboardUsers } from "../lib/api";


export const LEADERBOARD = "leaderboard"

const useLeaderboard = (opts={}) => {
    const {
        data: leaderboardUsers = [], ...rest
    } = useQuery({
        queryKey: [LEADERBOARD],
        queryFn: getLeaderboardUsers,
        ...opts
    })

    return { leaderboardUsers, ...rest };
};

export default useLeaderboard;
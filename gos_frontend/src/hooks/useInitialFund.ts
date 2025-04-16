import { useQuery } from "@tanstack/react-query"
import { getStartingFund } from "../lib/api"

export const FUND = "fund"

const useInitialFund = (opts={}) => {
    const {
        data: initialFundAmount,
        ...rest
    } = useQuery({
        queryKey: [FUND],
        queryFn: getStartingFund,
        ...opts
    })
    return { initialFundAmount, ...rest };
};

export default useInitialFund;
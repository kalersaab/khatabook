import { GetCash } from "@/services/cash"
import { useQuery } from "react-query"

export const useGetCash = ()=>{
    return useQuery(["Cash"],(()=>GetCash()))
}
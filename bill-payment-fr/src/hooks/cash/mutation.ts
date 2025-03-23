import cashService from "@/service/cash"
import { useMutation } from "react-query"
import { ICash } from "@/interfaces"

const { addCash, deleteCash,updateCash } = new cashService()
export const useAddCash = () => useMutation<void, Error, ICash>((payload) => addCash(payload).then((res:any)=>{
    if(res){
        return res
    }
}).catch((err)=>err))
export const useDeleteCash =()=>useMutation((payload)=>deleteCash(payload))
export const useUpdateCash = ()=>useMutation((payload)=>updateCash(payload))

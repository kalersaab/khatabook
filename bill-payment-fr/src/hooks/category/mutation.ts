import { useMutation } from "react-query"
import { ICash } from "@/interfaces"
import categoryService from "@/service/categories"

const { addCategory } = new categoryService()
export const useAddCash = () => useMutation<void, Error, ICash>((payload) => addCategory(payload).then((res:any)=>{
    if(res){
        return res
    }
}).catch((err:any)=>err))
// export const useDeleteCash =()=>useMutation((payload)=>deleteCash(payload))
// export const useUpdateCash = ()=>useMutation((payload)=>updateCash(payload))

import { useMutation } from "react-query";
import billService from "@/service/bills";
const { addBills } = new billService();
export const useAddBills = () => useMutation((payload) => addBills(payload).then((res:any)=>{
    if(res){
    return res
}}));

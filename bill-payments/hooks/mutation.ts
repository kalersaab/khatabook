import { queryClient } from "@/app/_layout";
import { CreateCash, DeleteCash } from "@/services/cash";
import { useMutation } from "react-query";

export const useDeleteCash = () => {
    return useMutation((payload:any) => DeleteCash(payload))
};
export const useCreateCash = () => {
    return useMutation((payload:any) => {
        return CreateCash(payload).then(async(res) => {
        await queryClient.refetchQueries({ queryKey: ["Cash"] });
        return res
    }).catch((err) => {
        console.log(err)
    })});
};
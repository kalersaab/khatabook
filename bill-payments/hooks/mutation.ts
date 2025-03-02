import { queryClient } from "@/app/_layout";
import { DeleteCash } from "@/services/cash";
import { useMutation } from "react-query";

export const useDeleteCash = () => {
    return useMutation((id) => DeleteCash(id).then(async(res) => {
        console.log('res', res)
        debugger
        await queryClient.refetchQueries({ queryKey: ["Cash"] });
        return res
    }));
};
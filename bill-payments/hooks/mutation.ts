import { queryClient } from "@/app/_layout";
import { CreateCash, DeleteCash, UpdateCash } from "@/services/cash";
import { useMutation } from "react-query";

export const useDeleteCash = () => {
  return useMutation((payload: any) => DeleteCash(payload));
};
export const useCreateCash = () => {
  return useMutation((payload: any) => {
    return CreateCash(payload)
      .then(async (res) => {
        await queryClient.refetchQueries({ queryKey: ["Cash"] });
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
export const useUpdateCash = () => {
  return useMutation((payload: any) => {
    return UpdateCash(payload)
      .then(async (res) => {
        await queryClient.refetchQueries({ queryKey: ["Cash"] });
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

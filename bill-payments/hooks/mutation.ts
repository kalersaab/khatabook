import { useMutation } from "@tanstack/react-query"
import { ICash } from "@/interface"
import cashService from "@/services/cash"

const { addCash, deleteCash, updateCash } = new cashService()

export const useAddCash = () =>
  useMutation<any, any, any>((payload:any) => addCash(payload));

export const useDeleteCash = () =>
  useMutation((payload) => deleteCash(payload));

export const useUpdateCash = () =>
  useMutation<void, Error, ICash>((payload: ICash) => updateCash(payload));

import { useMutation,useQueryClient } from "@tanstack/react-query"
import { ICash } from "@/interface"
import cashService from "@/services/cash"

const { addCash, deleteCash, updateCash } = new cashService()

export const useAddCash = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => addCash(payload),
    onSuccess: (data:any) => {
      queryClient.invalidateQueries({ queryKey: ['getCash'] });
      queryClient.setQueryData(['cashTotal'], (prev: {credit: number, debit: number} = {credit: 0, debit: 0}) => {
        const newTotal = {...prev};
        if (data.type === 'credit') {
          newTotal.credit += data.amount;
        } else {
          newTotal.debit += data.amount;
        }
        return newTotal;
      });
    },
    onError: (error) => {
      console.error('Error adding cash:', error);
    },
  });
};

export const useDeleteCash = () =>
  useMutation({
    mutationFn:(payload) => deleteCash(payload)});

export const useUpdateCash = () =>
  useMutation<any, Error, any>({
    mutationFn:(payload) => updateCash(payload)});

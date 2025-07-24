import { customer } from "@/interface";
import customerService from "@/services/customer";
import { useMutation } from "@tanstack/react-query";
const { createCustomer, updateCustomer, deleteCustomer } = new customerService();
export function usecreateCustomer() {
  return useMutation({
    mutationFn: (payload:customer) => createCustomer(payload),
  });
}
export function useUpdateCustomer() {
  return useMutation({
    mutationFn: (payload) => updateCustomer(payload),
  });
}
export function useDeleteCustomer() {
  return useMutation({
    mutationFn: (payload) => deleteCustomer(payload),
  });
}
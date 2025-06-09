import invoiceservice from "@/services/invoice";
import { useMutation } from "@tanstack/react-query";

const { createInvoice } = new invoiceservice();
export const useCreateInvoice = () => 
  useMutation({
    mutationFn: (payload) => createInvoice(payload)
  });
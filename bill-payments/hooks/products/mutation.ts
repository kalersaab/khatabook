import productService from "@/services/products";
import { useMutation } from "@tanstack/react-query";
const { createProduct, updateProduct, deleteProduct} = new productService();
export function usecreateProduct() {
  return useMutation({
    mutationFn: (payload) => createProduct(payload),
  });
}
export function useUpdateProduct() {
  return useMutation({
    mutationFn: (payload) => updateProduct(payload),
  });
}
export function useDeleteProduct() {
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
  });
}
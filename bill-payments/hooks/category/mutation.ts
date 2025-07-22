import categoryService from "@/services/category";
import { useMutation } from "@tanstack/react-query";
const { createCreate, updateCategory, deleteCategory } = new categoryService();
export function usecreateCategory() {
  return useMutation({
    mutationFn: (payload) => createCreate(payload),
  });
}
export function useUpdateCategory() {
  return useMutation({
    mutationFn: (payload) => updateCategory(payload),
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (categoryId: string) => deleteCategory(categoryId),
  });
}

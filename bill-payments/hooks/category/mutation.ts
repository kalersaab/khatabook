import categoryService from "@/services/category";
import { useMutation } from "@tanstack/react-query";
const {createCreate}  =new categoryService()
export function usecreateCategory() {
    return useMutation({
        mutationFn:(payload) =>  createCreate(payload)})
}
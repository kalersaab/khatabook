import UserService from "@/services/user";
import { useMutation } from "@tanstack/react-query";

const {addUser, loginUser} = new UserService();

export function useAddUser() {
    return useMutation({
        mutationFn:(payload) =>  addUser(payload)})
}
export const useLoginUser =()=>
     useMutation({mutationFn:(payload)=>loginUser(payload)})
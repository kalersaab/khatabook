import UserService from "@/services/user";
import { useMutation } from "@tanstack/react-query";

const {addUser, loginUser, signup} = new UserService();

export function useAddUser() {
    return useMutation({
        mutationFn:(payload) =>  addUser(payload)})
}
export const useLoginUser =()=>
     useMutation({mutationFn:(payload)=>loginUser(payload)})
export const useSignupUser = () =>
    useMutation({
        mutationFn: (payload) => signup(payload)
    });
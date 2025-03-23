import UserService from "@/service/user";
import { useMutation } from "react-query";

const {addUser, loginUser} = new UserService();

export function useAddUser() {
    return useMutation((payload) =>  addUser(payload))
}
export const useLoginUser =()=>
     useMutation((payload)=>loginUser(payload))
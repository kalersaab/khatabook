import UserService from "@/services/user";
import { useQuery } from "@tanstack/react-query";
const {meApi} = new UserService()
export const useMe = () => {
  return useQuery<any>({
    queryKey: ['me'],
    queryFn: () => meApi(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
import cashService from "@/services/cash";
import { useInfiniteQuery } from "@tanstack/react-query";

const {getCash} = new cashService()
export const useGetCash = (query:any)=>{
   return useInfiniteQuery({
        queryKey: ['getCash', query],
        queryFn: ({ pageParam = 0}) => getCash({ ...query, page: pageParam * 10,limit:10 }),
        getNextPageParam: (lastPage: any, pages: any[]) => {
            const totalItems = lastPage?.data?.count;
            const loadedItems = pages.flatMap(page => page ? page.data.data: [] ).length || 0
            if (loadedItems < totalItems) {
              return pages.length;
            }
            return undefined;
          },
         initialPageParam: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
    })}
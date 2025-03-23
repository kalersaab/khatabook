import cashService from "@/service/cash";
import { useInfiniteQuery } from "react-query"

const {getCash} = new cashService()
export const useGetCash = (query:any)=>
    useInfiniteQuery({
        queryKey: ['getCash', query],
        queryFn: ({ pageParam = 0 }) => getCash({ ...query, page: pageParam * 10,limit:10 }),
        getNextPageParam: (lastPage: any, pages: any[]) => {
            const totalItems = lastPage?.data?.count;
            const loadedItems = pages.flatMap(page => page ? page.data.data: [] ).length || 0
            if (loadedItems < totalItems) {
              return pages.length;
            }
            return undefined;
          },
        refetchOnWindowFocus: false,
        refetchInterval: 60 * 1000,
        staleTime: 10 * 60 * 1000,
    })
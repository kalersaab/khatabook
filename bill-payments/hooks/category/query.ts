import categoryService from "@/services/category";
import { useInfiniteQuery } from "@tanstack/react-query";

const { getCategories } = new categoryService();
export const useGetCategory = (query: any) => {
  return useInfiniteQuery({
    queryKey: ["getCategories", query],
    queryFn: ({ pageParam = 0 }) =>
      getCategories({ ...query, page: pageParam * 10, limit: 10 }),
    getNextPageParam: (lastPage: any, pages: any[]) => {
      const totalItems = lastPage?.data?.count;
      const loadedItems =
        pages.flatMap((page) => (page ? page.data.data : [])).length || 0;
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
  });
};

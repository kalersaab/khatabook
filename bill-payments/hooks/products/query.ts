import productService from "@/services/products";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
interface ProductQueryParams {
  page?: number;
  limit?: number;
  query?: string;
}
const { getProducts } = new productService();
export const useGetProduct = (query: any) => {
  return useInfiniteQuery({
    queryKey: ["getProducts", query],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({ ...query, page: pageParam * 10, limit: 10 }),
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
    retry:2
  });
};

import { callApi } from "@/utils/apiUtils";
import { category } from "@/utils/endpoint/categories";

class categoryService {
  public addCategory = async ({ body }: any) =>
    callApi<any>({
      uriEndPoint: category.addCategory.v1,
      body,
    });
    public getCategories= async(query:any)=> {
        return callApi({
          uriEndPoint: {...category.getCategories.v1}, query
        });
    }
}
export default categoryService;
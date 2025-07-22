import { callApi } from "@/utils/apiUtils";
import { category } from "@/utils/endpoint/category";

class categoryService {
    public createCreate = ({ body }: any) => {
        return callApi({
            uriEndPoint: { ...category.createCategory.v1 },
            body,
        });
    }
    public deleteCategory = ({ categoryId }: any) => {
        return callApi({
            uriEndPoint: { ...category.deleteCategory.v1 },pathParams: { categoryId }
        });
    }
    public getCategories = (query:any) => {
        return callApi({
            uriEndPoint: { ...category.getCategories.v1}, query
        });
    }
    public updateCategory = ({ categoryId, body }: any) => {
        return callApi({
            uriEndPoint: { ...category.updateCategory.v1 },pathParams: { categoryId },
            body
        });
    }
}
export default categoryService;
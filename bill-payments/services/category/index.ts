import { callApi } from "@/utils/apiUtils";
import { category } from "@/utils/endpoint/category";

class categoryService {
    public createCreate = ({ body }: any) => {
        return callApi({
            uriEndPoint: { ...category.createCategory.v1 },
            body,
        });
    }
}
export default categoryService;
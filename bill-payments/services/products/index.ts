import { callApi } from "@/utils/apiUtils";
import { products } from "@/utils/endpoint/products";

class productService {
  public createProduct = ({ body }: any) => {
    return callApi({
      uriEndPoint: { ...products.createProduct.v1 },
      body,
    });
  };
  public deleteProduct = (productId:string ) => {
    return callApi({
      uriEndPoint: { ...products.deleteProduct.v1 },
      pathParams: { productId },
    });
  };
  public getProducts = (query: any) => {
    return callApi({
      uriEndPoint: { ...products.getProducts.v1 },
      query,
    });
  };
  public updateProduct = ({ productId, body }: any) => {
    return callApi({
      uriEndPoint: { ...products.updateProduct.v1 },
      pathParams: { productId },
      body,
    });
  };
}
export default productService;
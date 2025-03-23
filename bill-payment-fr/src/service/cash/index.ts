import { ICash } from "@/interfaces";
import { callApi } from "@/utils/apiUtils";
import { cash } from "@/utils/endpoint/cash";

class cashService {
  public addCash = async ({ body }: ICash) =>
    callApi<any>({
      uriEndPoint: cash.addCash.v1,
      body,
    });

  public getCash= async(query:any)=> {
    return callApi({
      uriEndPoint: {...cash.getCash.v1}, query
    });
  }
  public deleteCash = async (pathParams:any)=>{
    return callApi({
      uriEndPoint: {...cash.deleteCash.v1},
      pathParams,
    });
  }
  public updateCash = async ({pathParams, body}:any) => {
    return callApi<any>({
      uriEndPoint: {...cash.updateCash.v1},
      pathParams,
      body,
    });}
}
export default cashService;

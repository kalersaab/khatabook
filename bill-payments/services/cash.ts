import { ICash } from "@/interface";
import { callApi } from "@/utils/apiUtils";
import { cash } from "@/utils/endpoint/cash";

class cashService {
  public addCash = ({ body }: any) =>
    callApi({
      uriEndPoint: cash.addCash.v1,
      body,
    });

  public getCash= (query:any)=> {
    return callApi({
      uriEndPoint: {...cash.getCash.v1}, query
    });
  }
  public deleteCash = (pathParams:any)=>{
    return callApi({
      uriEndPoint: {...cash.deleteCash.v1},
      pathParams,
    });
  }
  public updateCash = ({pathParams, body}:any) => {
    return callApi({
      uriEndPoint: {...cash.updateCash.v1},
      pathParams,
      body,
    });}
}
export default cashService;

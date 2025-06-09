import { ICash } from "@/interface";
import { callApi } from "@/utils/apiUtils";
import { cash } from "@/utils/endpoint/cash";

class cashService {
  public addCash = ({ body }: any) =>{
    return callApi({
      uriEndPoint: {...cash.addCash.v1},
      body,
    });
  }

  public getCash= async(query:any)=> {
    return await callApi({
      uriEndPoint: {...cash.getCash.v1}, query
    }).then((res:any) => {
     if(res.status === 200) {
        return res
      }
      else{
        return []
      }
    }).catch((err:any) => {
      console.error('Error fetching cash:', err);
      throw err;
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

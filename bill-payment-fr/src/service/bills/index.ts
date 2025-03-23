import { callApi } from "@/utils/apiUtils";
import { bills } from "@/utils/endpoint/bills";

class billService {
  public addBills = async ({ body }: any) =>{
    console.log('body', body)
   return callApi<any>({
      uriEndPoint: bills.addBills.v1,
      body,
    });}
    public getBills= async(query:any)=> {
        return callApi({
          uriEndPoint: {...bills.getBills.v1}, query
        });
  
    }
}
export default billService;
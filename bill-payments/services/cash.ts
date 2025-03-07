import { Cash } from "@/utils/endpoint";
import { callApi } from "../utils/apiUtils";

export const GetCash = () =>
    callApi({
      uriEndPoint: { ...Cash.getCash.v1 },
    });
export const DeleteCash = ({pathParams}:any) =>{
  console.log('pathParams', pathParams)
    return callApi({
      uriEndPoint: { ...Cash.deletecash.v1 },
     pathParams
    });
  };
export const CreateCash = (data:any) => callApi({ uriEndPoint: { ...Cash.createCash.v1 }, body: data });
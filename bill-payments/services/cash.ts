import { Cash } from "@/utils/endpoint";
import { callApi } from "../utils/apiUtils";

export const GetCash = () =>
    callApi({
      uriEndPoint: { ...Cash.getCash.v1 },
    });
export const DeleteCash = ({pathParams}:any) =>
    callApi({
      uriEndPoint: { ...Cash.deletecash.v1 },
      pathParams
    });
  
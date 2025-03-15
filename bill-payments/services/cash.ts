import { Cash } from "@/utils/endpoint";
import { callApi } from "../utils/apiUtils";

export const GetCash = () =>
  callApi({
    uriEndPoint: { ...Cash.getCash.v1 },
  });
export const DeleteCash = ({ pathParams }: any) =>
  callApi({
    uriEndPoint: { ...Cash.deletecash.v1 },
    pathParams,
  });
export const CreateCash = (body: any) =>
  callApi({ uriEndPoint: { ...Cash.createCash.v1 }, body });
export const UpdateCash = ({ pathParams, payload }: any) => {
  return callApi({
    uriEndPoint: { ...Cash.updateCash.v1 },
    pathParams,
    body: payload,
  });
};

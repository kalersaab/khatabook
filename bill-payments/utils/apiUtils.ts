import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

export const hostname = () => {
    let hostUrl = "https://3e9e-49-15-103-150.ngrok-free.app";
    return hostUrl;
};
const hostUrl = hostname();

export const makeUrl = ({ uri = "", pathParams, query, version }: any, host: any) =>
    `${host || hostUrl}${version}${uri
    .split("/")
    .map((param: any) =>
        param.charAt(0) === ":" ? encodeURIComponent(pathParams[param.slice(1)]) : param
    )
    .join("/")}${query ? `?${new URLSearchParams(query).toString()}` : ""}`;

export const getDefaultHeaders = async () => ({
    Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
});
/**
 * Returns true if the input apiResponse has errors.
 * @param {*} apiResponse
 */
export const hasErrors = (apiResponse: any) => {
    const { error } = apiResponse;
    if (error) {
        return true;
    }
    return false;
};
/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 1.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callAxios
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */
const callAxios = async ({
    uriEndPoint,
    pathParams,
    query,
    body,
    apiHostUrl,
}: any) => {
    console.log(makeUrl({ ...uriEndPoint, pathParams, query }, apiHostUrl));

    return Axios({
        method: uriEndPoint.method,
        url: makeUrl({ ...uriEndPoint, pathParams, query }, apiHostUrl),
        headers: {
            ...(await getDefaultHeaders()),
            ...uriEndPoint.headerProps,
        },
        data: body || undefined,
    });
};
/**
 * Extract the error messages from a failed API response.
 * @param {} apiResponse
 */
// const extractErrors = () => {};
/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 2.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callApi
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */

export const callApi = ({
    uriEndPoint = { uri: "", method: "", version: "", headerProps: {} },
    pathParams,
    query,
    body,
    apiHostUrl,
}: CallApiType): Promise<object> =>

    new Promise((resolve, reject) => {
        callAxios({
            uriEndPoint,
            pathParams,
            query,
            body,
            apiHostUrl,
        })
            .then((res) => {
                ;
                return resolve(res.data);
                // localStorage.setItem("timer", 1800);
            })

            .catch(async (err) => {
                console.log(err?.response?.status, "error");
                if (!err.response) {
                    reject(err);
                    return;
                }
                else if (err?.response?.status === 401) {

                    //    refresh(refreshToken)
                    //      .then(async (res: any) => {
                    //        await AsyncStorage.setItem("refreshToken", res.refreshToken);
                    //        await AsyncStorage.setItem("accessToken", res.accessToken);
                    //        callAxios({
                    //          uriEndPoint,
                    //          pathParams,
                    //          query,
                    //          body,
                    //          apiHostUrl,
                    //        })
                    //          .then((response) => {
                    //            return resolve(response.data);
                    //            // localStorage.setItem("timer", 1800);
                    //          })
                    //          .catch(() => reject(err.response));
                    //      })
                    //      .catch((err) => {
                    //        return reject(err.response);
                    //      });
                } else {
                    return reject(err.response);
                }
            });
    });

interface CallApiType {
    uriEndPoint: UriEndPoint;
    pathParams?: HeaderPropsOrPathParamsOrQueryOrBody;
    query?: HeaderPropsOrPathParamsOrQueryOrBody;
    body?: HeaderPropsOrPathParamsOrQueryOrBody;
    apiHostUrl?: string;
}
export interface UriEndPoint {
    uri: string;
    method: string;
    version: string;
    headerProps?: HeaderPropsOrPathParamsOrQueryOrBody;
}
interface HeaderPropsOrPathParamsOrQueryOrBody { }

export interface UriEndPointWithVersions {
    v1: UriEndPoint;
}
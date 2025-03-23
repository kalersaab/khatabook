 
/**
 * Utility methods to be used for invoking API methods
 */

import Axios, { AxiosRequestHeaders } from 'axios';
import { signOut } from 'next-auth/react';
import queryString from 'querystring';

import { UriEndPoint } from '@/interfaces';

const hostname = () => 'http://192.168.41.228:3001/api';

/**
 * Use this to get backend application domain
 * @returns
 */

const hostUrl = hostname();
interface PathParams {
  [key: string]: string;
}
interface BodyParams {
  [key: string]: string | string[];
}
interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

const makeUrl = ({
  uri,
  pathParams,
  query,
  version,
  host,
}: {
  pathParams?: PathParams;
  query?: QueryParams;
  uri: string;
  method: string;
  version: string;
  headerProps?: AxiosRequestHeaders;
  host?: string;
}): string =>
  `${host || hostUrl}${version}${uri
    ?.split('/')
    .map((param: string) =>
      param.charAt(0) === ':'
        ? encodeURI(pathParams?.[param.slice(1)] || '')
        : param,
    )
    .join('/')}${query ? `?${queryString.stringify(query)}` : ''}`;

const getDefaultHeaders = async (): Promise<{
  Authorization: string | any;
  'Content-Type': string;
}> => {
  const token = await localStorage.getItem('accessToken');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 1.0.0
 *
 * @todo all the incoming values for the APIParameters.pathParams and APIParameters.query
 * should be uri encoded.
 * @alias callAxios
 * @memberof apiUtils
 * @param {Object} APIParameters - Set of objects required to make the api call.
 * @param {Object} APIParameters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParameters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParameters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParameters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParameters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParameters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParameters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParameters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */

interface CallAxiosInput {
  uriEndPoint: UriEndPoint;
  pathParams?: PathParams;
  query?: QueryParams;
  body?: BodyParams;
  axiosProps?: object;
}
const callAxios = async ({
  uriEndPoint,
  pathParams,
  query,
  body,
  axiosProps = {},
}: CallAxiosInput) =>
  Axios({
    method: uriEndPoint.method,
    url: makeUrl({ ...uriEndPoint, pathParams, query }),
    headers: {
      ...(await getDefaultHeaders()),
      ...uriEndPoint.headerProps,
    },
    data: body || {},
    ...axiosProps,
  });

/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 1.0.0
 *
 * @todo all the incoming values for the APIParameters.pathParams and APIParameters.query
 * should be uri encoded.
 * @alias callMockios
 * @memberof apiUtils
 * @param {Object} APIParameters - Set of objects required to make the api call.
 * @param {Object} APIParameters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParameters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParameters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParameters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParameters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParameters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParameters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParameters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */
const callMockios = async ({
  uriEndPoint,
  pathParams,
  query,
  body,
}: CallAxiosInput) =>
  Axios({
    method: uriEndPoint.method,
    url: makeUrl({ ...uriEndPoint, pathParams, query }),
    headers: {
      ...(await getDefaultHeaders()),
      ...uriEndPoint.headerProps,
    },
    data: body || {},
  });

interface CallApiProps {
  uriEndPoint: UriEndPoint;
  pathParams?: PathParams;
  query?: QueryParams;
  body?: BodyParams;
  apiHostUrl?: string;
  mock?: boolean;
  axiosProps?: any;
}
/**
 * Extract the error messages from a failed API response.
 * @param {} apiResponse
 */

/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 2.0.0
 * @author Manjot Singh
 *
 * @todo all the incoming values for the APIParameters.pathParams and APIParameters.query
 * should be uri encoded.
 * @alias callApi
 * @memberof apiUtils
 * @param {Object} APIParameters - Set of objects required to make the api call.
 * @param {String} APIParameters.apiHostUrl - Use this to override the host url for calling external apis, example weather api https://api.openweathermap.org.
 * @param {Object} APIParameters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParameters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParameters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParameters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParameters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParameters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParameters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParameters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */

export function callApi<ResponseType>({
  uriEndPoint,
  pathParams,
  query,
  body,
  mock,
  axiosProps = {},
}: CallApiProps): Promise<ResponseType> {
  return new Promise((resolve, reject) => {
    let callGenericApi = callAxios;
    if (mock) callGenericApi = callMockios;
    callGenericApi({
      uriEndPoint,
      pathParams,
      query,
      body,
      axiosProps,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        if (
          err?.response?.status === 401 &&
          ![
            '/auth/account',
          ].includes(uriEndPoint.uri)
        ) {
          // redirect to login
          signOut();
        }
        if (err?.response?.status === 403) {
          window.location.href = '/'
        }
        reject(err?.response?.data);
      });
  });
}
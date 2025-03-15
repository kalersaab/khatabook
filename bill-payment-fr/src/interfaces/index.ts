import { AxiosRequestHeaders } from "axios";

export interface IList{
    id: number,
    name: string,
    href?: string
}
export interface ITable{
    title: string,
    dataIndex: string,
    width?: number,
    render?: any
}
export interface UriEndPoint {
    uri: string;
    path: string;
    method: string;
    headerProps?: AxiosRequestHeaders;
    version: string;
  }
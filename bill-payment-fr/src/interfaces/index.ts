import { AxiosRequestHeaders } from "axios";

export interface IList {
  id: number;
  name: string;
  href?: string;
}
export interface ITable {
  title: string;
  dataIndex: string;
  width?: number;
  render?: any;
}
export interface UriEndPoint {
  uri: string;
  path: string;
  method: string;
  headerProps?: AxiosRequestHeaders;
  version: string;
}
type body = { amount: string; notes: string; type: "credit" | "debit" };
export interface ICash {
  body: body;
}
export interface err {
  message: string;
}
export interface IFormikCash {
  _id?: string;
  amount: string;
  notes: string;
  type: "credit" | "debit";
}

export interface IUser {
  username: string;
  password: string;
}
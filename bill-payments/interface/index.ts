type body = { amount: string; notes: string; type: "credit" | "debit" };
export interface ICash {
  body: body;
}
export interface IFormikCash {
    _id?: string;
    amount: number;
    notes: string;
    type: "credit" | "debit";
  }
  import { AxiosRequestHeaders, Method } from 'axios';

export interface UriEndPoint {
  uri: string;
  method: Method;
  version: string;
  headerProps?: AxiosRequestHeaders;
  host?: string;
}
export interface customer {
  body: {
  name: string;
  mobile: string;
  };
}

export interface Category {
  _id: string;
  name: string;
}
export interface Product {
  _id: string;
  name: string;
  categoryId: string;
  price: string;
}
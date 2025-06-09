import { defaults } from "../defaults";
export const invoice: any = {
  createInvoice: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/invoices",
    },
  },
  getInvoice: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/invoices",
    },
  },
  getInvoiceById: {
  v1: {
    ...defaults.methods.GET,
    ...defaults.versions.v1,
    uri: "/invoices/:id",
  },

}
};
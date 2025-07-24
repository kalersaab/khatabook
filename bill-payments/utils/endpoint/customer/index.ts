import { defaults } from "../defaults";
export const customers: any = {
  createCustomer: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/customers",
    },
    
  },
    deleteCustomer: {
        v1: {
        ...defaults.methods.DELETE,
        ...defaults.versions.v1,
        uri: "/customers/:customerId",
        },
    },
    getCustomers: {
        v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: "/customers",
        },
    },
    updateCustomer: {
        v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: "/customers/:customerId",
        },
    },
    getCustomerById: {
        v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: "/customers/:customerId",
        },
    },
}
import { defaults } from "../defaults";
export const products: any = {
  createProduct: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/products",
    },
    
  },
    deleteProduct: {
        v1: {
        ...defaults.methods.DELETE,
        ...defaults.versions.v1,
        uri: "/products/:productId",
        },
    },
    getProducts: {
        v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: "/products",
        },
    },
    updateProduct: {
        v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: "/products/:productId",
        },
    }
}
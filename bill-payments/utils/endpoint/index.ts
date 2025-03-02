import { defaults } from "./defaults";

export const Cash = {
  getCash: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v2,
      uri: '/api/cashManagement/getcash',
    },
  },
  deletecash:{
    v1:{
      ...defaults.methods.DELETE,
      ...defaults.versions.v2,
      uri: '/api/cashManagement/deletecash/:id',
    }
  }
}
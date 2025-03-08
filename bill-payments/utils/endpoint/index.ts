import { defaults } from "./defaults";

export const Cash = {
  createCash:{
    v1:{
      ...defaults.methods.POST,
      ...defaults.versions.v2,
      uri: '/api/cashManagement/createcash',
    }
  },
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
import { defaults } from "./defaults";

export const Cash = {
  createCash:{
    v1:{
      ...defaults.methods.POST,
      ...defaults.versions.v2,
      uri: '/api/cashManagement/createcash',
    }
  },
  updateCash: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v2,
      uri: '/api/cashManagement/updatecash/:id',
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
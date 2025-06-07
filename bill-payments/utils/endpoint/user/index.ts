import { defaults } from "../defaults";

export const user = {
  addUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/users',
    },
  },

  meApi: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/me',
    },
  },
  loginUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/users/login',
    },
  },
  getUser: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/users',
    },
  },
  singleUser: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/users/:id',
    },
  },
};

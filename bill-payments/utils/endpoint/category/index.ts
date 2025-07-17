import { defaults } from "../defaults";
export const category: any = {
  createCategory: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/categories",
    },
  },
}
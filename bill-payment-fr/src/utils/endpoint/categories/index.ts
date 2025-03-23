import { defaults } from "../defaults";

export const category:any = {
    addCategory:{
        v1:{
            uri:'/categories',
            ...defaults.methods.POST,
            ...defaults.versions.v1,
        }
    },
    getCategory:{
        v1:{
            uri:'/categories',
            ...defaults.methods.GET,
            ...defaults.versions.v1,
        }
    }
}
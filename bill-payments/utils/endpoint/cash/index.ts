import { defaults } from "../defaults";

export const cash:any = {
    addCash:{
        v1:{
            uri:'/cashManagement/createcash',
            ...defaults.methods.POST,
            ...defaults.versions.v1,
        }
    },
    getCash:{
        v1:{
            uri:'/cashManagement/getCash',
            ...defaults.methods.GET,
            ...defaults.versions.v1,
        }
    },
    updateCash:{
        v1:{
            uri:'/cashManagement/updateCash/:id',
            ...defaults.methods.PUT,
            ...defaults.versions.v1,
        }
    },
    deleteCash:{
        v1:{
            uri:'/cashManagement/deleteCash/:id',
            ...defaults.methods.DELETE,
            ...defaults.versions.v1,
        }
    },
}
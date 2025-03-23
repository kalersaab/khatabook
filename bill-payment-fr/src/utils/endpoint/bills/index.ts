import { defaults } from "../defaults";

export const bills:any = {
    addBills:{
        v1:{
            uri:'/bills/createpayment',
            ...defaults.methods.POST,
            ...defaults.versions.v1,
        }
    },
    getBills:{
        v1:{
            uri:'/bills/getpayments',
            ...defaults.methods.GET,
            ...defaults.versions.v1,
        }
    }
}
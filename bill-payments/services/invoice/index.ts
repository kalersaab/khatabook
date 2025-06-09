import { callApi } from "@/utils/apiUtils";
import { invoice } from "@/utils/endpoint/invoice";

class invoiceservice {
    public createInvoice = ({ body }: any) => {
        return callApi({
            uriEndPoint: { ...invoice.createInvoice.v1 },
            body,
        });
    }
    public getInvoices = async (query: any) => {
        return await callApi({
            uriEndPoint: { ...invoice.getInvoices.v1 }, query
        }).then((res: any) => {
            if (res.status === 200) {
                return res;
            }
            else {
                return [];
            }
        }).catch((err: any) => {
            console.error('Error fetching invoices:', err);
            throw err;
        });
    }
}
export default invoiceservice;
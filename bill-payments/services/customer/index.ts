import { callApi } from "@/utils/apiUtils";
import { customers } from "@/utils/endpoint/customer";

class customerService {
    public createCustomer = ({ body }: any) => {
        return callApi({
            uriEndPoint: { ...customers.createCustomer.v1 },
            body,
        });
    }
    public deleteCustomer = ({ customerId }: any) => {
        return callApi({
            uriEndPoint: { ...customers.deleteCustomer.v1 }, pathParams: { customerId }
        });
    }
    public getCustomers = (query: any) => {
        return callApi({
            uriEndPoint: { ...customers.getCustomers.v1 }, query
        });
    }
    public updateCustomer = ({ customerId, body }: any) => {
        return callApi({
            uriEndPoint: { ...customers.updateCustomer.v1 }, pathParams: { customerId },
            body
        });
    }
    public getCustomerById = ({ customerId }: any) => {
        return callApi({
            uriEndPoint: { ...customers.getCustomerById.v1 }, pathParams: { customerId }
        });
    }
}
export default customerService;

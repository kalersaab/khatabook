import { callApi } from '@/utils/apiUtils';
import { user } from '@/utils/endpoint/user';
class UserService {
    public addUser = async({body}:any)=>{
        return callApi<any>({
            uriEndPoint:{
            ...user.addUser.v1, body},
        })
    }
    public loginUser = async ({body}:any)=>
         callApi<any>({
            uriEndPoint:
            {...user.loginUser.v1, body},
        })
}
export default UserService
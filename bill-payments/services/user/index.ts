import { callApi } from '@/utils/apiUtils';
import { user } from '@/utils/endpoint/user';
class UserService {
    public addUser = async({body}:any)=>
        callApi({
            uriEndPoint:user.addUser.v1,body
        })
    
    public loginUser = async ({body}:any)=>
         callApi({
            uriEndPoint:user.loginUser.v1,body
        })
}
export default UserService
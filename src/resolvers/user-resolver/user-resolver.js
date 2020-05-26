import { createUserService } from '../../services/user-services/create-user'
import { getActualUserService } from '../../services/user-services/get-user'
import { userAuthService } from '../../services/user-services/user-auth'

export const UserResolver = { 

  Query: {
    getUsers : () => getUserService(),
    getActualUser: (root, args, {actualUser}) => getActualUserService()

  },
  
  Mutation : {
    createUser : async (root, {input}) => await createUserService({input}),   
    userAuth : (root, {input}) => userAuthService({input})
  }  

}
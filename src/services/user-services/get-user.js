import { UserModel } from "../../models/user-model/user-model";

export const getActualUserService = (root, args, actualUser) => {
  console.log(actualUser);
  return {
    id: '123',
    name: 'ejemplo',
    lastName: 'ejemplo',
    user: 'ejemplo',
    password: 'ejemplo'
  }
}
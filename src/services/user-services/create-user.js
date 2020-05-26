import { UserModel } from "../../models/user-model/user-model";
import { isValidEmail } from "../../constants/validations";
import { ERROR_CODES } from "../../constants/error-codes";

const areRepeatUsers = async (user) => {
  const areRepeatUsers = await UserModel.find({user: user.user})
  
  return areRepeatUsers; 
}

const valuesValidation = (user) => {
  Object.keys(user).map(key => {
    if(!user[key]) {
      throw new Error (
        ERROR_CODES.EMPTY_VALUE(key)
      )
    } else if(key === 'user' && isValidEmail(!user[key])) {
      throw new Error (
        ERROR_CODES.INVALID_EMAIL
      )
    }
  })
}

export const createUserService = async ({input}) => {
  const User = {
    name: input.name,
    lastName: input.lastName,
    user: input.user,
    password: input.password
  }
  
  valuesValidation(User);

  const areRepeatUser = await areRepeatUsers(User);
  
  if(areRepeatUser.length !== 0) {
    throw new Error(
      ERROR_CODES.USER_EXISTS
    )
  }

  const newUser = new UserModel(User)

  
  newUser.id = newUser._id;
  

  return await newUser.save()
}
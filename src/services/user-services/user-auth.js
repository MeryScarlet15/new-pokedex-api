import { UserModel } from "../../models/user-model/user-model"
import jwt from 'jsonwebtoken'
import { ERROR_CODES } from "../../constants/error-codes"
import { isValidEmail } from "../../constants/validations"

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

const findUser = async (userName) => {
  const userExists = UserModel.find({user: userName});
  return userExists;
}

const findPassword = async (userPassword) => {
  const passwordExists = UserModel.find({password: userPassword});
  return passwordExists;
}

const generateToken = (user, secret, expire) => jwt.sign(user, secret, {expiresIn: expire})

export const userAuthService = async ({input}) => {
  const userLogin = {
    user: input.user,
    password: input.password
  }

  
  valuesValidation(userLogin);
  
  const userExists = await findUser(userLogin.user)
  
  if(userExists.length > 0) {
    const passwordExists = await findPassword(userLogin.password)
        
    if(passwordExists.length === 0) {
      throw new Error(
        ERROR_CODES.INVALID_LOGIN
      )
    } 
  } else {
    throw new Error(
      ERROR_CODES.INVALID_LOGIN
    )
  }

  return {
    token: generateToken(userLogin, process.env.SECRET, '1hr')
  }

}
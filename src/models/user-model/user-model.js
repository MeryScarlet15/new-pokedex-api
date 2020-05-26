import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  user: String,
  password: String
})

export const UserModel = mongoose.model('users', userSchema);
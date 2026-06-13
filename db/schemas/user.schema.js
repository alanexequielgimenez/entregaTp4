import mongoose from 'mongoose'

const { Schema, models, model } = mongoose

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 }
  },
  { timestamps: true }
)

const User = models.User || model('User', userSchema)

export default User

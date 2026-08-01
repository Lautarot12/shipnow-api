import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { AUTH_PROVIDERS, USER_ROLES } from '../constants/index.js'

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    provider: { type: String, enum: Object.values(AUTH_PROVIDERS)},
    role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.USER }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
        this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', userSchema)

export default User
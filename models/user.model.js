import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { USER_ROLES } from '../constants/index.js'

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    provider: { type: String, enum: ['local', 'github'], default: 'local'},
    role: { type: String, enum: [USER_ROLES.ADMIN, USER_ROLES.USER], default: USER_ROLES.USER }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
        this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', userSchema)

export default User
import dotenv from 'dotenv'
import CustomError from '../errors/CustomError.js'
import { ERROR_TYPES } from '../errors/error.dictionary.js'

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

function requiredEnv(variableName) {
    const value = process.env[variableName]
    if (!value) {
        throw new CustomError(ERROR_TYPES.MISSING_REQUIRED_VARIABLE)
    } 
    return value
}

const config = {
    port: requiredEnv('PORT'),
    mongoUri: requiredEnv('MONGODB_URI'),
    nodeEnv: requiredEnv('NODE_ENV'),
    secretKey: requiredEnv('SECRET_KEY'),
    jwtSecret: requiredEnv('JWT_SECRET'),
    githubClientId: requiredEnv('GITHUB_CLIENT_ID'),
    githubClientSecret: requiredEnv('GITHUB_CLIENT_SECRET'),
    logLevel: requiredEnv('LOG_LEVEL'),
    githubCallbackUrl: requiredEnv('GITHUB_CALLBACK_URL')
}

export default config
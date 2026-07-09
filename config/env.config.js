import dotenv from 'dotenv'

dotenv.config()

function requiredEnv(variableName) {
    const value = process.env[variableName]
    if (!value) {
        throw new Error(`Missing required variable: ${variableName}`)
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
    githubClientSecret: requiredEnv('GITHUB_CLIENT_SECRET')
}

export default config
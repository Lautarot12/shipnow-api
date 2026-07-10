import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import User from '../models/user.model.js'
import config from '../config/env.config.js'

export const initializeGithubStrategy =  () => {
    passport.use(new GitHubStrategy({ callbackURL: 'http://localhost:8080/api/v1/auth/github/callback', clientID: config.githubClientId, clientSecret: config.githubClientSecret }, 
    async (accessToken, refreshToken, profile, done)=>{
        try {
            const userEmail = profile.emails[0].value
            const user = await User.findOne({ email: userEmail })
            if (!user) {
                const newUser = await User.create({
                    first_name: profile.displayName,
                    last_name: 'GitHub',
                    email: userEmail,
                    password: Math.random().toString(),
                    provider: 'github'
                }) 
                    return done(null, newUser)
            } else {
                    return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }
)
)}
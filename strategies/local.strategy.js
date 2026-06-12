import { Strategy as LocalStrategy } from 'passport-local'

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done)=>{
    try {
        const user = await User.findOne({ email })
        if (!user) return done(null, false, { message: 'Usuario no encontrado' })
        const match = await bcrypt.compare(password, user.password)
        if (!match) return done (null, false, { message: 'Contrasena incorrecta' })
            return done(null, user)
    } catch (error) {
        return done(error)
    }
}))
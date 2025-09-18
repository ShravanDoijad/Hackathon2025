const passport= require('passport');
const { Strategy :GoogleStrategy } = require('passport-google-oauth20');
const Student = require("../models/studentModel")


passport.use(new GoogleStrategy({
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret:process.env.AUTH_CLIENT_SECRET,
    callbackURL:"http://localhost:3000/auth/google/callback"
}, async(accessToken, refreshToken, profile, done)=>{
    try {
        let student = await Student.findOne({googleId: profile.id})
        if(!student){
            student = await Student.create({
                fullname: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
            })
        }
        return done(null, student)
    } catch (error) {
        return done(error, null);
    }

}))

passport.serializeUser((student, done)=>{
    done(null, student.id);
})

passport.deserializeUser(async(id, done)=>{
    try {
        const student = await Student.findById(id);
        done(null, student);
    } catch (error) {
        done(error, null);
    }
})

module.exports = passport;
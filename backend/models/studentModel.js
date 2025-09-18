const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email:{ type:String, unique: true, required:true }, 
    phone: { type: Number, unique: true, }, 
    password:{
        type:String,
    },
    images:{
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

studentSchema.methods.comparePassword = async function( password) {
    return await bcrypt.compare(password, this.password)
}
studentSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

studentSchema.methods.generateAuthToken= async function(payload){
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30 days'})
}
const student = mongoose.model('Student', studentSchema)
module.exports = student;
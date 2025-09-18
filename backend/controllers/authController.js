const Student  = require("../models/studentModel")
const {OAuth2Client} = require("google-auth-library")

const client  = new OAuth2Client(process.env.AUTH_CLIENT_ID)

const studentRegister =  async(req, res)=>{
    try {
        const formData = req.body;
        const alreadyRegistered = await Student.findOne({email: formData.email});
        if (alreadyRegistered) {
            return res.status(400).json({message: "Student already registered with this email"});
        }
        const newStudent = new Student(formData);
        await newStudent.save();
        res.status(201).json({message:"Student registered successfully", student: newStudent});
    } catch (error) {
        console.error("Error in student registration:", error);
        res.status(500).json({message:"registration error", error});
    }

}

const studentlogin =  async(req, res)=>{
    try {
        const {email , password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }
        const student = await Student.findOne({email: email}).select("+pasword");
        if (!student) {
            return res.status(404).json({message: "Student not found"});
        }
        const isMatch = await student.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid password"});
        }
        res.status(200).json({message: "Login successful", student});

    } catch (error) {
        console.error("Error in student registration:", error);
        res.status(500).json({message:"user Login error", error});
    }

}

const googleAuth=  async(req, res)=>{
    try {
        const {token} = req.body;
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience: process.env.AUTH_CLIENT_ID
        })
        const ticket_payload = ticket.getPayload();
        let student = await Student.findOne({email: ticket_payload.email})

        if(!student){
            student = await Student.create({
                fullname: ticket_payload.name,
                email:ticket_payload.email,
                images: ticket_payload.picture,
                googleId:ticket_payload.sub
            })
        }
        const payload = {
            id: student._id,
            email: ticket_payload.email,
           
        }
        
            const authToken = await student.generateAuthToken(payload);
            res.cookie("authToken", authToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 30*24*60*60*1000 
            })
        res.status(200).json({success:true, message:"Google login successful", payload})
    } catch (error) {
        console.error("Error in student registration:", error);
        res.status(500).json({success:false,message:"Google Login error", error});
    }

}
const studentRegister3 =  async(req, res)=>{
    try {
        
    } catch (error) {
        console.error("Error in student registration:", error);
        res.status(500).json({message:""})
    }

}
const studentRegister4=  async(req, res)=>{
    try {
        
    } catch (error) {
        console.error("Error in student registration:", error);
        res.status(500).json({message:""})
    }

}

module.exports = {studentRegister, studentlogin, googleAuth, studentRegister3, studentRegister4}
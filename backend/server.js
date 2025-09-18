const express = require('express')
const mongoose= require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session')
const cors = require('cors')

dotenv.config();

const app = express()
app.use(express.json())
const port = 3000;
app.use(session(
    {
        secret:"keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }
))

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))
const passport = require("./passport/passport")
const authRoute = require("./routes/authRoute");
const connectDB = require('./db/db');
connectDB();

app.use(passport.initialize())
app.use(passport.session())

app.use("/api/auth", authRoute)
app.get("/auth/google", passport.authenticate("google",{scope: ["Profile", "email"]}))
app.get('/', (req, res)=>{res.send("Hello World")})

app.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "/login", session:false}), (req, res)=>{
    res.redirect("http://localhost:3000/")
})


app.listen(port, ()=>console.log(`Server running on http://localhost:${port}`))

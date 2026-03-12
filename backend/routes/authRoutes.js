const express =require("express");
const bcrypt =require("bcryptjs");
const jwt =require( "jsonwebtoken");
const User =require("../models/User.js");

const router= express.Router();

router.post("/register", async (req,res)=>{
    const {name,email,password} = req.body;
    const userExists= await User.findOne({email});
    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,email,password: hashedPassword
    });

    const token = jwt.sign(
        {id:user._id, isAdmin: user.isAdmin},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.status(201).json({token,user});
});

router.post("/login", async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user= await User.findOne({email});
        if(!user){return res.status(400).json({message:"User not registered"})};

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token= jwt.sign(
            {id:user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET, {expiresIn:"1d"}
        );

        res.json({token, user});
    }catch(err){
        res.status(500).json({message:"server error"});
    }

})

module.exports=router;
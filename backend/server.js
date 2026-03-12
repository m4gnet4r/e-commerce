const express = require("express");
const dotenv =require("dotenv");
const cors =require( "cors");
const mongoose =require( "mongoose");
const authRoutes =require( "./routes/authRoutes.js");
const productRoutes =require("./routes/productRoutes.js");
const cartRoutes =require( "./routes/cartRoutes.js");
const orderRoutes =require ("./routes/orderRoutes.js");

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders",orderRoutes);

app.get("/",async (req,res)=>{
    res.send("E-commerce platform is running !");
})


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connencted"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})


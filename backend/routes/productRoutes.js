const express =require( "express");
const Product =require( "../models/Product");
const protect =require( "../middleware/authMiddleware");
const adminOnly =require( "../middleware/adminMiddleware");

const router = express.Router();

router.get("/",async(req,res)=>{
    const {search,category} = req.query;
    let query ={};
    if(search) query.title={$regex: search, $options: "i"};
    if(category) query.category = category;

    const products= await Product.find(query);
    res.json(products);
});

router.post("/",protect,adminOnly, async(req,res)=>{
    const product= await Product.create(req.body);
    res.status(201).json(product);
});

router.put("/:id",protect,adminOnly,async(req,res)=>{
    const updated=await Product.findByIdAndUpdate(req.params.id,req.body,{new :true});
    res.json(updated);
})

router.delete("/:id",protect,adminOnly, async (req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: "Product removed"});
})

module.exports= router;
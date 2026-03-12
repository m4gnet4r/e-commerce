const express =require( "express");
const Cart =require("../models/Cart");
const Product =require( "../models/Product");
const protect =require( "../middleware/authMiddleware");

const router = express.Router();

router.get("/",protect, async(req,res)=>{
    const cart = await Cart.findOne({userId:req.user.id}).populate("items.productId");
    if(!cart){return res.json({items: []});}
    res.json(cart);
});

router.post("/add",protect,async(req,res)=>{

    const {productId,quantity}=req.body;
    const product= await Product.findById(productId);
    if(!product){return res.status(404).json({message:"No product found"});}

    let cart = await Cart.findOne({userId: req.user.id});
    if(!cart){
        cart= new Cart({
            userId: req.user.id,
            items:[{productId,quantity}]
        });
    }else{
        const itemIndex = cart.items.findIndex(item => item.productId.toString()=== productId);
        if(itemIndex >-1){
            cart.items[itemIndex].quantity+=quantity;
        }else{
            cart.items.push({productId, quantity});
        }
    }

    await cart.save();
    res.json(cart);
});

router.put("/update",protect,async(req,res)=>{
    const{productId, quantity}=req.body;

    const cart=await Cart.findOne({userId: req.user.id});
    if(!cart){
        return res.status(404).json({message: "Cart not found"});
    }
    if(quantity <0){
        cart.items = cart.items.filter(item=>item.productId.toString() !== productId);
    }else{
        cart.items.forEach(item=>{
            if(item.productId.toString()=== productId){
                item.quantity= quantity;
            }
        });
    }

    await cart.save();
    res.json(cart);
});

router.delete("/:productId",protect,async(req,res)=>{
    const cart =await Cart.findOne({userId: req.user.id});

    if(!cart){return res.status(404).json({message: "Cart not found"});}
    cart.items=cart.items.filter(item=>item.productId.toString()!== req.params.productId);

    await cart.save();
    res.json(cart);
});

router.delete("/",protect,async (req,res)=>{
    await Cart.findOneAndDelete({userId:req.user.id});
    res.json({message: "Cart cleared"});
});

module.exports= router;
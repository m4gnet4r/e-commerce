const express =require( "express");
const protect =require("../middleware/authMiddleware");
const adminOnly =require( "../middleware/adminMiddleware");
const Cart =require( "../models/Cart");
const Order =require( "../models/Order");
const Product =require( "../models/Product");

const router =express.Router();

router.post("/",protect, async(req,res)=>{
    const cart=await Cart.findOne({userId: req.user.id}).populate("items.productId");

    if(!cart){return res.status(400).json({message: "Cart is empty"})}

    let totalAmount=0;
    const orderItems = cart.items.map(item => {
        totalAmount+=item.productId.price * item.quantity;
        return {
            productId:item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            quantity: item.quantity
        };
    });

    const order= await Order.create({
        userId: req.user.id,
        items: orderItems , 
        totalAmount
    });

    await Cart.findOneAndDelete({userId: req.user.id});
    res.status(201).json(order);
});

router.get("/my" ,protect,async(req,res)=>{
    const orders = await Order.find({userId:req.user.id}).sort({createdAt: -1});
    res.json(orders);
});

router.get("/",protect,adminOnly,async(req,res)=>{
    const orders=await Order.find().populate("userId","name email").sort({createdAt:-1});
    res.json(orders);

});

router.put("/:id",protect,adminOnly,async(req,res)=>{
    const order= await Order.findById(req.params.id);
    if(!order){return res.status(404).json({message: "Order not found"});}

    order.status=req.body.status;
    await order.save();
    res.json(order);
});



module.exports= router;
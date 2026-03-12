import { useEffect,useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import API from "../services/api";

const Cart=()=>{
    const [cart,setCart]=useState([]);
    const [loading,setLoading]=useState(true);
    const navigate= useNavigate();
    
    const fetchCart= async()=>{
        setLoading(true);
        try{
            
            const res= await API.get("/cart");
            console.log(res.data);
            setCart(res.data);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }

    };
    useEffect(()=>{fetchCart();},[]);

    const updateQuantity =async(productId,quantity)=>{
        if(quantity<1){return;}
        await API.put("/cart/update",{productId,quantity});
        fetchCart();
    };

    const removeItem= async (productId)=>{
        await API.delete(`/cart/${productId}`);
        fetchCart();
    }

    const getTotal =()=>{
        return cart.items.reduce(
            (sum,item)=>sum+item.productId.price*item.quantity,0
        )
    }

    if(loading) return <p className="text-center mt-10">Loading cart...</p>

    if(!cart || cart.items.length===0){
        return (
            <div className="text-center mt-10">
                <p>Your cart is empty</p>
                <Link to="/" className="text-blue-500 underline">
                    Go shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Your cart</h1>

            <div className="space-y-4">
                {cart.items.map((item)=>{
                    return(
                        <div key={item.productId._id} className="flex items-center justify-between border p-4 rounded">
                            <div className="flex items-center gap-4">
                                <img src={item.productId.image} alt={item.productId.title} className="w-20 h-20 object-cover rounded"/>
                                <div>
                                    <h2 className="font-semibold">{item.productId.title}</h2>
                                    <p className="text-gray-600">₹{item.productId.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button onClick={()=>{updateQuantity(item.productId._id,item.quantity-1)}} className="px-2 border rounded">-</button>
                                <span>{item.quantity}</span>
                                <button onClick={()=>{updateQuantity(item.productId._id,item.quantity+1)}} className="px-2 border rounded">+</button>
                            </div>

                            <button onClick={()=>{removeItem(item.productId._id)}} className="text-red-500">Remove</button>
                        </div>
                    )
                })}
            </div>

            <div className="mt-6 flex justify-between itmes-center border-t pt-4">
                <h2 className="text-xl font-semibold">Total: ₹{getTotal()}</h2>
                <button onClick={()=>{navigate("/checkout")}} className="bg-black text-white px-6 py-2 rounded">Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
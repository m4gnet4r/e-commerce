import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Checkout =()=>{
    const [cart,setCart]=useState([]);
    const [loading,setLoading] = useState(true);
    const [placingOrder,setPlacingOrder] = useState(false);
    const navigate= useNavigate();
    const [error,setError]= useState("");

    const fetchCart=async()=>{
        setLoading(true);
        try{
            const res= await API.get("/cart");
            setCart(res.data);
        }catch(error){
            setError("Failed to load cart");
        }finally{setLoading(false);}
    };

    useEffect(()=>{fetchCart();},[]);

    const getTotal=()=>{
        return cart.items.reduce((sum,item)=> sum+ item.productId.price * item.quantity,0);
    };

    const placeOrder=async()=>{
        try{
            setPlacingOrder(true);
            await API.post("/orders");
            navigate("/orders");
        }catch(err){
            setError("Order failed. Try again");
        }finally{
            setPlacingOrder(false);
        }
    };

    if(loading) return <p className="text-center mt-10">Loading...</p>;

    if(!cart || cart.items.length===0){
        return (
            <div className="text-center mt-10">
                <p>Your cart is empty</p>
            </div>
        );
    }

    return(
        <div className=" max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="border rounded p-4 space-y-4">
                {cart.items.map((item)=>{
                    return(
                        <div key={item.productId._id} className="flex justify-between">
                            <span>{item.productId.title} × {item.quantity}</span>
                            <span>₹ {item.productId.price * item.quantity}</span>
                        </div>
                    )

                })}
            </div>

            <hr/>

            <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{getTotal()}</span>
            </div>

            <button onClick={placeOrder} disabled={placingOrder} className="mt-6 w-full bg-black text-white py-3 rounded disabled:opacity-50">
                {placingOrder? "Placing Order..." : "Place Order"}
            </button>
        </div>

    )
};

export default Checkout;
import {useEffect, useState} from "react";
import {ChevronDown , ChevronUp} from "lucide-react";
import API from "../services/api";

const Orders =()=>{
    const [orders,setOrders] = useState([]);
    const [loading ,setLoading] = useState(true);
    const [openOrderId, setOpenOrderId] =useState(null);

    const fetchOrders =async()=>{
        setLoading(true);
        try{
            const res = await API.get("/orders/my");
            setOrders(res.data);
        }catch(err){
            console.error("Failed to fetch Orders");
        }finally{
            setLoading(false);
        }

    }

    useEffect(()=>{fetchOrders();},[]);

    const toggleOrder=(id)=>{
        setOpenOrderId(prev=>(prev===id?null:id));
    };

    if(loading){
        return <p className="text-center mt-10">Loading orders...</p>
    }

    if(!loading && (orders.length===0 || !orders)){
        return(
            <p className="text-center mt-10">You have not placed orders yet.</p>
        );
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            <div className="space-y-4">
                {orders.map((order)=>{
                    const isOpen= (openOrderId=== order._id);

                    return(
                        <div key={order._id} className="border rounded-lg p-4 shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className= "font-semibold">
                                        Order ID={order._id}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-gray-200 rounded text-sm">
                                    {order.status}
                                </span>

                                <button onClick={()=>{toggleOrder(order._id)}}>
                                    {isOpen ? <ChevronUp/> : <ChevronDown/>}
                                </button>
                            </div>
                                {isOpen && (
                                    <div className="mt-4 space-y-2">
                                        {order.items.map((item, index)=>{
                                            return(
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span>
                                                        {item.title} × {item.quantity}
                                                    </span>
                                                    <span>
                                                        ₹{item.price * item.quantity}
                                                    </span>
                                                </div>
                                            )
                                        })}

                                        <div className="flex justify-between font-semibold border-t pt-2">
                                            <span >Total</span>
                                            <span>₹{order.totalAmount}</span>
                                        </div>
                                    </div>
                                )}
                        </div>
                    );
                })};
            </div>
        </div>
    )
}

export default Orders;
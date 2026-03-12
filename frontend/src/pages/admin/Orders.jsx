import {useEffect,useState} from "react";
import API from "../../services/api";
import {ChevronDown, ChevronUp} from "lucide-react";

const AdminOrders=()=>{

    const [orders,setOrders] =useState([]);
    const [loading,setLoading]=useState(true);
    const [openOrderId,setOpenOrderId] = useState(null);

    const fetchOrders = async()=>{
        try{
            const res = await API.get("/orders");
            setOrders(res.data);
        }catch(err){
            console.error("Failed to load orders");
        }finally{
            setLoading(false);
        }
    };

    const updateStatus = async (orderId,newStatus)=>{
        try{
            await API.put(`/orders/${orderId}`,{
                status: newStatus
            });
            fetchOrders();
        }catch(err){console.error("Failed to update status");}
        
    }

    useEffect(()=>{
        fetchOrders();
    },[]);

    const toggleOrder= (id)=>{
        setOpenOrderId(prev=>(prev===id ? null: id));
    };

    if(loading){return <p>Loading orders...</p>;}

    return(
        <div className="pt-25 text-black">
            <h1 className="text-2xl font-bold mb-6">All Orders</h1>

            <div className="space-y-4">
                {orders.map((order)=>{
                    const isOpen = openOrderId=== order._id;
                    return (
                        <div key={order._id} className="bg-white p-4 rounded shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Order ID: {order._id}</p>
                                    <p className="text-sm text-gray-600">User: {order.userId?.name} ({order.userId?.email})</p>
                                    <p className="text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <select value={order.status} onChange={(e)=>{updateStatus(order._id, e.target.value)}} className="border px-2 py-1 rounded text-sm">
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered" >Delivered</option>
                                    </select>
                                    <button onClick={()=>{toggleOrder(order._id)}} className="text-white">{isOpen ? <ChevronUp/>: <ChevronDown/>}</button>
                                </div>
                            </div>

                            {isOpen && (
                                <div className="mt-4 border-t pt-4 space-y-2">
                                    {order.items.map((item,index)=>(
                                        <div key={index} className="flex justify-between text-sm">
                                            <span>{item.title} × {item.quantity}</span>
                                            <span>₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}        
                                    <div className="flex justify-between font-semibold border-t pt-2">
                                        <span>Total</span>
                                        <span>₹{order.totalAmount}</span>
                                    </div>

                                </div>
                            )}
                        </div>

                    );
                })}
            </div>
        </div>

    );
};

export default AdminOrders;
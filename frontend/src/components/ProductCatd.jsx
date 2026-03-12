import {useContext} from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const ProductCard=({product})=>{
    const {user} =useContext(AuthContext);

    const addToCart = async ()=>{
        try{
            const res=await API.post("/cart/add",{productId: product._id, quantity:1});
            console.log(res);
            alert("Added to cart");
        }catch(error){
            alert("Please login first");
            console.log(error.response);
        }
    };

    return (
        <div className="border rounded-lg shadow hover: shoadow-kg transition p-4">
            <img src={product.image} alt={product.title} className="h-40 w-full object-cover rounded"/>
            <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center mt-3">
                <span className="font-bold">₹{product.price}</span>
                <button onClick={addToCart} className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800">Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductCard;
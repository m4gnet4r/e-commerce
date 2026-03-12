import {useEffect,useState} from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCatd";

const Home =()=>{
    const [products,setProducts]=useState([]);
    const [search,setSearch]=useState("");
    const [category,setCategory]=useState("");
    const [loading,setLoading] =useState(true);
    const [error,setError]= useState("");

    const fetchProducts = async()=>{
        try{
            setLoading(true);
            const res= await API.get(`/products?search=${search}&category=${category}`);
            setProducts(res.data);
        }catch(err){
            setError("Failed to load Products");
            console.log(err);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{fetchProducts();},[search,category]);
    return (
        <div className="min-h-screen bg-gray-800 text-white pt-40">
            
                <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
                    <input type="text" className="border border-gray-700 bg-[#1a1a1a] text-white p-3 rounded-lg w-full sm:w-72" placeholder="Search products..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
                    <select className="border border-gray-700 bg-[#1a1a1a] text-white p-3 rounded-lg w-full sm:w-72" value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home">Home</option>
                        <option value="Books">Books</option>
                        <option value="Sports">Sports</option>
                        <option value="Toys">Toys</option>
                    </select>
                </div>
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && products.length ===0 &&(<p className="text-center">No products</p>)}
                <div className="grid grid-cols-1 smLgrid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product)=>(<ProductCard key={product._id} product={product}/>))}
                </div>
            
            
        </div>
    );
};

export default Home;
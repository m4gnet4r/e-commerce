import {useEffect, useState} from "react";
import API from "../../services/api";
import ProductForm from "../../components/admin/ProductForm";
import Modal from "../../components/admin/Modal";

const AdminProducts=()=>{
    const [products,setProducts] = useState([]);
    const [loading,setLoading] =useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm,setShowForm] =useState(false);

    const fetchProducts = async()=>{
        try{
            const res=await API.get("/products");
            setProducts(res.data);
            console.log(res.data);
        }catch(err){
            console.error("Failed to load products");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
      fetchProducts();  
    },[]);
    
    const addProduct = async (data)=>{
        await API.post("/products",data);
        setShowForm(false);
        fetchProducts();
    }

    const deleteProduct = async (id)=>{
        if(!window.confirm("Are you sure? ")) return;

        await API.delete(`/products/${id}`);
        fetchProducts();
    };

    const updateProduct = async(data)=>{
        await API.put(`/products/${editingProduct._id}`,data);
        setEditingProduct(null);
        fetchProducts();
    }; 

    if(loading){return <p>Loading Products...</p>}

    return(
        <div>
            <div className="flex justify-between mb-6 text-black pt-25">
                <h1 className="text-2xl font-bold">Products</h1>
                <button 
                 onClick={()=>{
                    setEditingProduct(null);
                    setShowForm(true);
                 }}
                 className="bg-black text-white px-4 py-2 rounded">Add Product</button>

                {showForm && (
                    <Modal onClose={()=>{
                        setShowForm(false);
                        setEditingProduct(null);
                    }}>
                        <ProductForm initialData={editingProduct} onSubmit={editingProduct? updateProduct: addProduct} onCancel={()=>{setShowForm(false); setEditingProduct(null)}}/>
                    </Modal>
                )}
            </div>
            <div className="text-black">
            <table className="w-full bg-white  rounded shadow">
                <thead className="bg-gray-200 ">
                    <tr>
                        <th className="p-2 text-left">Title</th>
                        <th className="p-2 ">Price</th>
                        <th className="p-2 ">Category</th>
                        <th className="p-2 ">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product)=>{
                        return(
                            <tr key={product.id} className="border-t">
                                <td className="p-2">{product.title}</td>
                                <td className="p-2 text-center">₹{product.price}</td>
                                <td className="p-2 text-center">{product.category}</td>
                                <td className="p-2 text-center space-x-2">
                                    <button onClick={()=>{setEditingProduct(product); setShowForm(true);} } className="text-blue-600">Edit</button>
                                    <button onClick={()=>{deleteProduct(product._id)}} className="text-red-600">Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default AdminProducts;

import {useState , useEffect} from "react";

const ProductForm = ({onSubmit, initialData , onCancel})=>{
    const [form , setForm] = useState({
        title: "",
        price: "",
        category: ""
    });

    useEffect(()=>{
        if(initialData){
            setForm({
                title: initialData.title,
                price: initialData.price,
                category: initialData.category
            });
        }
    },[initialData]);

    const handleChange=(e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        onSubmit(form);
    }

    return(
        <form onSubmit={submitHandler} className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-lg font-semibold">
                {initialData?"Edit Product": "Add Product"}
            </h2>

            <input type="text" name="title" placeholder="Title" className="border p-2 w-full" value={form.title} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" className="border p-2 w-full" value={form.price} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" className="border p-2 w-full" value={form.category} onChange={handleChange} required />

            <div className="flex gap-2">
                <button type="submit" className="bg-black text-white px-4 py-2 rounded">Save</button>
                <button type="button" onClick={onCancel} className="bg-black text-white px-4 py-2 rounded">Cancel</button>
            </div>
        </form>
    );
};

export default ProductForm;
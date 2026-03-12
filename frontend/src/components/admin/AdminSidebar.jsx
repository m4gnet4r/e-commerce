import {NavLink} from "react-router-dom";

const AdminSidebar=()=>{
    return (
        <div className="w-64 bg-black trxt-white p-6">
            <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

            <nav className="space-y-4">
                <NavLink to="/admin/products" className={({isActive})=>isActive? "block text-blue-400":"block"}>Products</NavLink>
                <NavLink to="/admin/orders" className={({isActive})=>isActive? "block text-blue-400":"block"}>Orders</NavLink>
            </nav>
        </div>
    );
};

export default AdminSidebar;
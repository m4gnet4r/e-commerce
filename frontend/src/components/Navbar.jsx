import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const isAdmin= user?.user?.isAdmin;

    const handleLogout = () => {
        logout();
        navigate("/login");
        setMenuOpen(false);
    };

    const navButton = ({ isActive }) =>
        `px-3 py-1 rounded-md transition ${
            isActive
                ? "bg-gray-800 text-white"
                : "hover:bg-white hover:text-black"
        }`;

    return (
        <nav className="fixed top-0 left-0 w-full bg-black text-white z-50">
            <div className="flex justify-between items-center px-6 py-4">
                {/* LEFT SIDE */}
                <div className="flex items-center gap-6">
                    {/* Brand text */}
                    <h1 className="text-xl font-bold select-none">
                        AmazonLite
                    </h1>

                    {/* Desktop nav buttons */}
                    <div className="hidden md:flex gap-3">
                        
                        {!user && (
                            <NavLink className={navButton} to="/">
                                Home
                            </NavLink>
                        )}
                        {user && !isAdmin && (
                            <>
                                <NavLink className={navButton} to="/">
                                    Home
                                </NavLink>
                                <NavLink className={navButton} to="/cart">
                                    Cart
                                </NavLink>
                                <NavLink className={navButton} to="/orders">
                                    Orders
                                </NavLink>
                            </>
                        )}
                        {user && isAdmin && (
                            <>
                                <NavLink className={navButton} to="/admin/products">
                                    Products
                                </NavLink>
                                <NavLink className={navButton} to="/admin/orders">
                                    Orders
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-m text-gray-300">
                                Hi, {user.user.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1 rounded-md bg-black text-white hover:bg-gray-200 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink className={navButton} to="/login">
                                Login
                            </NavLink>
                            <NavLink className={navButton} to="/register">
                                Register
                            </NavLink>
                        </>
                    )}
                </div>

                {/* HAMBURGER */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-2xl"
                >
                    ☰
                </button>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden bg-black border-t border-gray-700 px-6 py-4 space-y-3">
                    

                    {user ? (
                        <>
                            {user && !isAdmin && (
                                <>
                                    <NavLink
                                        onClick={() => setMenuOpen(false)}
                                        className={navButton}
                                        to="/cart"
                                    >
                                        Cart
                                    </NavLink>
                                    <NavLink
                                        onClick={() => setMenuOpen(false)}
                                        className={navButton}
                                        to="/orders"
                                    >
                                        Orders
                                    </NavLink>
                                </>
                            )}
                            
                            {user && isAdmin && (
                                <>
                                    <NavLink
                                        onClick={() => setMenuOpen(false)}
                                        className={navButton}
                                        to="/admin/products"
                                    >
                                        Products
                                    </NavLink>
                                    <NavLink
                                        onClick={() => setMenuOpen(false)}
                                        className={navButton}
                                        to="/admin/orders"
                                    >
                                        Orders
                                    </NavLink>
                                </>
                            )}
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left text-red-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                onClick={() => setMenuOpen(false)}
                                className={navButton}
                                to="/login"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                onClick={() => setMenuOpen(false)}
                                className={navButton}
                                to="/register"
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

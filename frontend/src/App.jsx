import {BrowserRouter, Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminDahboard from "./pages/admin/Dashboard";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import './App.css'

function App() {
  return(
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute admin><AdminDahboard/></ProtectedRoute>} >
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  )
}

export default App

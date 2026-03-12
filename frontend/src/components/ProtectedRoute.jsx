import {useContext} from "react";
import {Navigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({children,admin})=>{
    const {user} = useContext(AuthContext);

    if(!user) return <Navigate to="/login" />;
    if(admin && !user.user.isAdmin) return <Navigate to="/"/>;
    return children;
}

export default ProtectedRoute;
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";



const AdminContainer = () => {
    const { user, isLoading } = useAuth();

    return isLoading ? <div>Loading...</div>
    : user ?
        user.role === "admin" ?
        <div>
            <Outlet/>
        </div> 
        : <Navigate to="/forbidden"
            replace
            state={{
                redirectUrl: window.location.pathname,
            }} 
        />
    : <Navigate to="/login"
        replace
        state={{
            redirectUrl: window.location.pathname,
        }} 
    />
}

export default AdminContainer
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const auth = useSelector((state: { auth: { username: string; email: string; _id: string; token: string } }) => state.auth);
    return auth.username && auth.email && auth._id && auth.token ? <Outlet /> : <Navigate to={"/login"} />
};

export default PrivateRoute;
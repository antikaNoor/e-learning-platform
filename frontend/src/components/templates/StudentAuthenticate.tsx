import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify";

type MyToken = {
    _id: string;
    username: string;
    email: string;
    role: string; // Replace with actual roles
    isVerified: boolean;
    isBanned: boolean;
    teacherID?: string; // This is optional, as it may not exist for all users
    iat: number;
    exp: number;
}

const StudentAuthenticate = () => {

    console.log("checking auth")

    const state = useSelector((state: any) => state.user);

    const checkString = state.token;

    const decodedToken = jwtDecode<MyToken>(checkString);

    if (decodedToken.role !== "student") {
        toast.error("You are not authorized to access this page");
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default StudentAuthenticate;

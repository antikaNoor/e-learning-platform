import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode"

// type MyToken = {
//     _id: string;
//     username: string;
//     email: string;
//     role: string; // Replace with actual roles
//     isVerified: boolean;
//     isBanned: boolean;
//     teacherID?: string; // This is optional, as it may not exist for all users
//     iat: number;
//     exp: number;
// }

const LoginAuthenticate = () => {

    console.log("checking auth")

    const state = useSelector((state: any) => state.user);

    const checkString = state.token;

    // console.log(
    //     "--->", jwtDecode(checkString));

    // const decodedToken = jwtDecode<MyToken>(checkString);
    // console.log("id", decodedToken._id);

    if (!checkString) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default LoginAuthenticate;

// import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
    LOGIN_URL,
    SIGNUP_URL,
    // VERIFY_EMAIL_URL,
    // RESEND_VERIFICATION_EMAIL_URL,
    FORGOT_PASSWORD_URL,
    RESET_PASSWORD_URL,
    VALIDATE_RESET_REQUEST_URL
} from "../../utils/constants";

type FormData = {
    username: string;
    email: string;
    role: string;
    password: string;
    confirm_password: string;
};

type FormDataLogin = {
    email: string;
    password: string;
}

type FormDataForgotPassword = {
    recipient: string;
}

type FormDataResetPassword = {
    newPassword: string;
    confirmPassword: string;
}


export const SignupApi = async (formData: FormData) => {
    try {
        const response = await axios.post(SIGNUP_URL, formData);
        const data = response.data;

        if (data.success === false) {
            toast.error(data.message);
        } else if (data.success === true) {
            toast.success(data.message);
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

export const LoginApi = async (formData: FormDataLogin) => {
    try {
        const response = await axios.post(LOGIN_URL, formData);
        const data = response.data;


        if (data.success === false) {
            toast.error(data.message);
        } else if (data.success === true) {
            toast.success(data.message);
            return data.data;
        }
    } catch (error) {
        console.error(error);
    }
};

export const ForgotPasswordApi = async (formData: FormDataForgotPassword) => {
    try {
        const response = await axios.post(FORGOT_PASSWORD_URL, formData);
        const data = response.data;

        if (data.success === false) {
            toast.error(data.message);
        } else if (data.success === true) {
            toast.success(data.message);
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

export const ResetPasswordApi = async (formData: FormDataResetPassword) => {
    try {
        const { token, userId } = useParams();

        const response = await axios.post(`${RESET_PASSWORD_URL}/${userId}/${token}`, formData);
        const data = response.data;

        if (data.success === false) {
            toast.error(data.message);
        } else if (data.success === true) {
            toast.success(data.message);
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

export const ValidateResetPasswordApi = async () => {
    try {
        const { token, userId } = useParams();

        const response = await axios.get(`${VALIDATE_RESET_REQUEST_URL}/${userId}/${token}`);
        const data = response.data;

        if (data.success === false) {
            toast.error(data.message);
        } else if (data.success === true) {
            toast.success(data.message);
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

// export const logout = () => {
//     const dispatch = useDispatch();
//     // Dispatch the logout action to clear user data
//     dispatch(removeLogin());
//     // Redirect to the login page

// };
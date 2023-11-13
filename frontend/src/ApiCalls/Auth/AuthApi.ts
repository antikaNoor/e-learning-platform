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
    // RESET_PASSWORD_URL
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
            return data;
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

        const response = await axios.post(`${RESET_PASSWORD_URL}/${token}/${userId}`, formData);
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
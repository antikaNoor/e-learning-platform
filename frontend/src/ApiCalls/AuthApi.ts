import axios from 'axios';
import { axiosInstance, axiosInstanceToken } from '../utils/axiosInstance';
import { toast } from 'react-toastify';

import {
    LOGIN_URL,
    SIGNUP_URL,
    VERIFY_EMAIL_URL,
    RESEND_VERIFICATION_EMAIL_URL,
    FORGOT_PASSWORD_URL,
    RESET_PASSWORD_URL,
    VALIDATE_RESET_REQUEST_URL,
    TEACHER_INFO,
} from "../utils/constants";

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

type FormDataTeacherInfo = {
    educationalBackground: {
        university: string;
        major: string;
        cgpa: number;
    }[];
    teachingExperience: {
        institution: string;
        duration: string;
        description: string;
    }[];
};

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
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorMessage = error.response.data?.message || 'An error occurred during signup';
                toast.error(errorMessage);
            } else if (error.request) {
                toast.error('No response received from the server during signup');
            } else {
                toast.error('Error setting up the signup request');
            }
        } else {
            toast.error(error.message || 'An unknown error occurred during signup');
        }
    }
};

export const VerifyEmailApi = async (userId: string, token: string) => {
    try {
        const response = await axios.get(`${VERIFY_EMAIL_URL}/${userId}/${token}`);
        const data = response.data;

        if (data.success === false) {
            toast.error(data.message);
        }

        if (data.success === true) {
            toast.success(data.message);
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorMessage = error.response.data?.message || 'An error occurred during email verification';
                toast.error(errorMessage);
            } else if (error.request) {
                toast.error('No response received from the server during email verification');
            } else {
                toast.error('Error setting up the email verification request');
            }
        } else {
            toast.error(error.message || 'An unknown error occurred during email verification');
        }
    }
}

export const ResendVerificationEmailApi = async () => {
    try {
        const response = await axios.get(RESEND_VERIFICATION_EMAIL_URL);
        const data = response.data;

        if (data.success === false) {
            toast.error(data.message);
        }

        if (data.success === true) {
            toast.success(data.message);
        }

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorMessage = error.response.data?.message || 'An error occurred during email verification';
                toast.error(errorMessage);
            } else if (error.request) {
                toast.error('No response received from the server during email verification');
            } else {
                toast.error('Error setting up the email verification request');
            }
        } else {
            toast.error(error.message || 'An unknown error occurred during email verification');
        }
    }
}


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
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorMessage = error.response.data?.message || 'An error occurred during login';
                toast.error(errorMessage);
            } else if (error.request) {
                toast.error('No response received from the server during login');
            } else {
                toast.error('Error setting up the login request');
            }
        } else {
            toast.error(error.message || 'An unknown error occurred during login');
        }
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
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorMessage = error.response.data?.message || 'An error occurred during forgot password';
                toast.error(errorMessage);
            } else if (error.request) {
                toast.error('No response received from the server during forgot password');
            } else {
                toast.error('Error setting up the forgot password request');
            }
        } else {
            toast.error(error.message || 'An unknown error occurred during forgot password');
        }
    }
};

export const ResetPasswordApi = async (formData: FormDataResetPassword, userId: string, token: string) => {
    try {
        const response = await axios.post(`${RESET_PASSWORD_URL}/${userId}/${token}`, formData);
        const data = response.data;

        if (data.success === false) {
            toast.error(data.message);
        } else if (data.success === true) {
            toast.success(data.message);
            return data;
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorMessage = error.response.data?.message || 'An error occurred during reset password';
                toast.error(errorMessage);
            } else if (error.request) {
                toast.error('No response received from the server during reset password');
            } else {
                toast.error('Error setting up the reset password request');
            }
        } else {
            toast.error(error.message || 'An unknown error occurred during reset password');
        }
    }
};

export const ValidateResetPasswordApi = async (userId: string, token: string) => {
    try {
        const response = await axios.get(`${VALIDATE_RESET_REQUEST_URL}/${userId}/${token}`);
        const data = response.data;

        if (data.success === false) {
            toast.error(data.message);
        } else if (data.success === true) {
            toast.success(data.message);
            return data;
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorMessage = error.response.data?.message || 'An error occurred during reset password validation';
                toast.error(errorMessage);
            } else if (error.request) {
                toast.error('No response received from the server during reset password validation');
            } else {
                toast.error('Error setting up the reset password validation request');
            }
        } else {
            toast.error(error.message || 'An unknown error occurred during reset password validation');
        }
    }
};

export const teacherInfoApi = async (formData: FormDataTeacherInfo, token: string) => {
    await axiosInstanceToken
        .post(TEACHER_INFO, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            toast.success(response.data.message);
            return response.data.data
        })
        .catch((error) => {
            // Handle other errors (network error, timeout, etc.) here.
            toast.error(error.response.data.message);
            console.error("Other Error:", error);
        })
};
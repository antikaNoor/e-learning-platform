// useAuthHook.ts
import { useCallback } from 'react';
import { SignupApi, VerifyEmailApi, ResendVerificationEmailApi, LoginApi, ForgotPasswordApi, ResetPasswordApi, ValidateResetPasswordApi, teacherInfoApi } from '../ApiCalls/AuthApi';
import { toast } from 'react-toastify';

// Define the shape of the user object
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
}

// Define the authentication hook
const useAuth = () => {
  const signup = useCallback(
    async (formData: FormData) => {
      try {
        await SignupApi(formData);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        toast.error(error.message || 'An unknown error occurred during signup');
      }
    },
    []
  );

  const verifyEmail = useCallback(
    async (userId: string, token: string) => {
      try {
        await VerifyEmailApi(userId, token);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        toast.error(error.message || 'An unknown error occurred during email verification');
      }
    },
    []
  )

  const ResendVerificationEmail = useCallback(
    async () => {
      try {
        await ResendVerificationEmailApi();
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        toast.error(error.message || 'An unknown error occurred during email verification');
      }
    },
    []
  )

  const login = useCallback(
    async (formData: FormDataLogin) => {
      try {
        await LoginApi(formData);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        toast.error(error.message || 'An unknown error occurred during login');
      }
    },
    []
  );

  const forgotPassword = useCallback(
    async (formData: FormDataForgotPassword) => {
      try {
        await ForgotPasswordApi(formData);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        toast.error(error.message || 'An unknown error occurred during password reset request');
      }
    },
    []
  );

  const resetPassword = useCallback(
    async (formData: FormDataResetPassword, userId: string, token: string) => {
      try {
        await ResetPasswordApi(formData, userId, token);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        toast.error(error.message || 'An unknown error occurred during password reset');
      }
    },
    []
  );

  const validateResetPassword = useCallback(
    async (userId: string, token: string) => {
      try {
        await ValidateResetPasswordApi(userId, token);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        toast.error(error.message || 'An unknown error occurred during password reset validation');
      }
    },
    []
  );

  const teacherInfo = useCallback(
    async (formData: FormDataTeacherInfo, token: string) => {
      try {
        await teacherInfoApi(formData, token);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        toast.error(error.message || 'An unknown error occurred during signup');
      }
    },
    []
  );


  return { signup, verifyEmail, ResendVerificationEmail, login, forgotPassword, resetPassword, validateResetPassword, teacherInfo };
};

export default useAuth;

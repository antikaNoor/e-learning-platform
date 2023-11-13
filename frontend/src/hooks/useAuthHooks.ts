// useAuthHook.ts
import { useCallback } from 'react';
import { SignupApi, LoginApi, ForgotPasswordApi, ResetPasswordApi, ValidateResetPasswordApi } from '../ApiCalls/Auth/AuthApi';
import { toast } from 'react-toastify';
import axios from 'axios';

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

// Define the authentication hook
const useAuth = () => {
  //   const [user, setUser] = useState<User | null>(null);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     // Check if the user is already authenticated (e.g., via stored token)
  //     // Implement your logic here, e.g., check local storage, cookies, etc.

  //     // For demo purposes, let's assume the user is not authenticated initially
  //     setLoading(false);
  //   }, []);

  const signup = useCallback(
    async (formData: FormData) => {
      try {
        await SignupApi(formData);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          // Handle Axios errors
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.message || 'An error occurred during signup';
            toast.error(errorMessage);
          } else if (error.request) {
            // The request was made but no response was received
            toast.error('No response received from the server during signup');
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error('Error setting up the signup request');
          }
        } else {
          // Handle other non-Axios errors
          toast.error(error.message || 'An unknown error occurred during signup');
        }
      }

    },
    []
  );

  const login = useCallback(
    async (formData: FormDataLogin) => {
      try {
        await LoginApi(formData);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          // Handle Axios errors
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.message || 'An error occurred during signup';
            toast.error(errorMessage);
          } else if (error.request) {
            // The request was made but no response was received
            toast.error('No response received from the server during signup');
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error('Error setting up the signup request');
          }
        } else {
          // Handle other non-Axios errors
          toast.error(error.message || 'An unknown error occurred during signup');
        }
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
        if (axios.isAxiosError(error)) {
          // Handle Axios errors
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.message || 'An error occurred during signup';
            toast.error(errorMessage);
          } else if (error.request) {
            // The request was made but no response was received
            toast.error('No response received from the server during signup');
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error('Error setting up the signup request');
          }
        } else {
          // Handle other non-Axios errors
          toast.error(error.message || 'An unknown error occurred during signup');
        }
      }
    },
    []
  );

  const resetPassword = useCallback(
    async (formData: FormDataResetPassword) => {
      try {
        await ResetPasswordApi(formData);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          // Handle Axios errors
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.message || 'An error occurred during signup';
            toast.error(errorMessage);
          } else if (error.request) {
            // The request was made but no response was received
            toast.error('No response received from the server during signup');
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error('Error setting up the signup request');
          }
        } else {
          // Handle other non-Axios errors
          toast.error(error.message || 'An unknown error occurred during signup');
        }
      }
    },
    []
  );

  const validateResetPassword = useCallback(
    async () => {
      try {
        await ValidateResetPasswordApi();
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          // Handle Axios errors
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.message || 'An error occurred during signup';
            toast.error(errorMessage);
          } else if (error.request) {
            // The request was made but no response was received
            toast.error('No response received from the server during signup');
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error('Error setting up the signup request');
          }
        } else {
          // Handle other non-Axios errors
          toast.error(error.message || 'An unknown error occurred during signup');
        }
      }
    },
    []
  );

  //   const logout = useCallback(() => {
  //     // Implement logout logic, e.g., clear local storage, cookies, etc.
  //     setUser(null);
  //   }, []);

  return { signup, login, forgotPassword, resetPassword, validateResetPassword };
};

export default useAuth;

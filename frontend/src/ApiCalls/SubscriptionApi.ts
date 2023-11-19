import { toast } from 'react-toastify';
import axios from 'axios';
import { axiosInstance, axiosInstanceToken } from '../utils/axiosInstance';
import { ADD_TO_CART, GET_YOUR_CART } from '../utils/constants';

export const AddToCartApi = async (data: any, token: string) => {
    // Fetch data from API
    console.log("token from api", token, data)
    return axios
        .post(
            ADD_TO_CART,
            { courseID: data },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => {
            console.log("response from api", response.data)
            console.log("token", token)
            toast.success(response.data.message)
            return response.data
        })
        .catch((error) => {
            // Handle other errors (network error, timeout, etc.) here.
            toast.error(error.response.data.message)
            console.error("Other Error:", error);
            throw error;
        })
}

export const GetYourCartApi = async (token: string) => {
    return axios
        .get(
            GET_YOUR_CART,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => {
            console.log("response from api", response.data)
            console.log("token", token)
            return response.data
        })
        .catch((error) => {
            console.error("Other Error:", error);
            throw error;
        })
}
import { toast } from 'react-toastify';
import axios from 'axios';
// import { axiosInstance, axiosInstanceToken } from '../utils/axiosInstance';
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_WISHLIST, SUBSCRIBE } from '../utils/constants';
import { axiosInstance } from '../utils/axiosInstance';

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

export const AddToWishlistApi = async (data: any, token: string) => {
    // Fetch data from API
    console.log("token from api", token, data)
    return axios
        .post(
            ADD_TO_WISHLIST,
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

export const SubscribeApi = async (data: any, token: string) => {
    // Fetch data from API
    console.log("token from api", token, data)
    return axios
        .post(
            SUBSCRIBE,
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

export const RemoveFromCartApi = async (courseID: string, cartID: string, token: string) => {
    // Fetch data from API
    console.log("token from api", cartID, courseID, token)
    return axiosInstance
        .delete(
            `/cart/remove-from-cart/${cartID}/${courseID}`,
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

export const RemoveFromWishlistApi = async (courseID: string, cartID: string, token: string) => {
    // Fetch data from API
    console.log("token from api", cartID, courseID, token)
    return axiosInstance
        .delete(
            `/wishlist/remove-from-wishlist/${cartID}/${courseID}`,
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
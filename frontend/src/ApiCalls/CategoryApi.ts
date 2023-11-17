import axiosInstance from '../utils/axiosInstance';
import { GET_ALL_CATEGORIES } from '../utils/constants';

export const GetAllCategoriesApi = async () => {
    // Fetch data from API
    return axiosInstance
        .get(GET_ALL_CATEGORIES)
        .then((response) => {
            console.log("response", response.data.data);
            return response.data.data
        })
        .catch((error) => {
            console.error("Other Error:", error);
            throw error;
        })
}
import { toast } from 'react-toastify';
import { axiosInstance, axiosInstanceToken } from '../utils/axiosInstance';

export const AddReviewApi = async (courseID: string, data: any, token: string) => {
    // Fetch data from API
    return axiosInstance
        .post(`/review/add-review/${courseID}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response.data)
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
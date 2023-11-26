import { toast } from 'react-toastify';
import { axiosInstance, axiosInstanceToken } from '../utils/axiosInstance';

export const AddQuestionApi = async (courseID: string, question: string, token: string) => {
    return axiosInstance
        .post(`/forum/create-question/${courseID}`, { question }, {
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
            toast.error(error.response.data.message)
            console.error("Other Error:", error);
            throw error;
        })
}

export const AddAnswerApi = async (forumID: string, answer: string, token: string) => {
    return axiosInstance
        .post(`/forum/post-answer/${forumID}`, { answer }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response.data);
            toast.success(response.data.message);
            return response.data;
        })
        .catch((error) => {
            toast.error(error.response.data.message);
            console.error("Other Error:", error);
            throw error;
        });
}
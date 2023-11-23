import {
    AddReviewApi,
    DeleteReviewApi
} from "../ApiCalls/ReviewApi";
import { useCallback } from 'react';

const useReview = () => {
    const addReview = useCallback(
        async (courseID: string, data: any, token: string) => {
            try {
                await AddReviewApi(courseID, data, token);
                // Optionally, update the user state or perform other actions
            } catch (error: any) {
                console.log(error)
            }
        },
        []
    );

    const deleteReview = useCallback(
        async (reviewID: string, token: string) => {
            console.log("token from hook", token);
            try {
                await DeleteReviewApi(reviewID, token);
                console.log("response from hook");
                // After removing from the cart, you might want to update the cart again
                // You can call fetchCart here or any other logic to update the cart
            } catch (error: any) {
                console.log(error);
            }
        },
        []
    );

    return {
        addReview,
        deleteReview
    }
}

export default useReview
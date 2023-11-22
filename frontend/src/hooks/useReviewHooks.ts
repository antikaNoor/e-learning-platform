import {
    AddReviewApi
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

    return {
        addReview
    }
}

export default useReview
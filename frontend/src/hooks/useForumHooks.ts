import {
    AddQuestionApi, AddAnswerApi
} from "../ApiCalls/ForumApi";
import { useCallback } from 'react';

const useForum = () => {
    const addQuestion = useCallback(
        async (courseID: string, question: string, token: string) => {
            try {
                await AddQuestionApi(courseID, question, token);
            } catch (error: any) {
                console.log(error)
            }
        },
        []
    );

    const addAnswer = useCallback(
        async (forumID: string, answer: string, token: string) => {
            try {
                await AddAnswerApi(forumID, answer, token);
            } catch (error: any) {
                console.log(error)
            }
        },
        []
    );

    return {
        addQuestion,
        addAnswer
    }
}

export default useForum
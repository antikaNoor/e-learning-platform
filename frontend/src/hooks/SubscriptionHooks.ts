import { AddToCartApi, GetYourCartApi } from "../ApiCalls/SubscriptionApi";
import { useCallback } from 'react';

const useSubscription = () => {
    const addToCart = useCallback(
        async (data: any, token: string) => {
            console.log("token from hook", token, data)
            try {
                await AddToCartApi(data, token);
                console.log("response from hook")
            } catch (error: any) {
                console.log(error)
            }
        },
        []
    );

    const getYourCart = useCallback(
        async (token: string) => {
            try {
                const response = await GetYourCartApi(token);
                console.log("response from hook", response)
                return response
            } catch (error: any) {
                console.log(error)
            }
        },
        []
    )

    return {
        addToCart,
        getYourCart
    }
}

export default useSubscription


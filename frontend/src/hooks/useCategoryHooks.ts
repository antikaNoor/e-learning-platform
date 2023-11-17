import { GetAllCategoriesApi } from "../ApiCalls/CategoryApi";

const useCategory = () => {
    const getAllCategory = async () => {
        try {
            const data = await GetAllCategoriesApi();
            return data;
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    return {
        getAllCategory
    };
};

export default useCategory
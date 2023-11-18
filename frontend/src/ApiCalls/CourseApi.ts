// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { ADD_CATEOGRY} from '../utils/constants';
import axiosInstance from '../utils/axiosInstance';
import { ADD_COURSE, GET_ALL_COURSES } from '../utils/constants';
// import { ALL_COURSES_URL } from "../utils/constants";

// type Category = {
//     categoryName: string;
// }

// type Course = {
//   page: number;
//   selectedSortOption: string;
//   selectedOrderOption: string;
//   searchQuery: string;
//   // setTotalPages: React.Dispatch<React.SetStateAction<number>>;
//   // setFetchedData: React.Dispatch<React.SetStateAction<any>>;
//   // setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
// }

export const GetTopicApi = async () => {
    // Fetch data from API
    return axiosInstance
        .get("/topic/get-all-topics")
        .then((response) => {
            // console.log(fetchedReview)
            return response.data
        })
        .catch((error) => {
            // Handle other errors (network error, timeout, etc.) here.
            console.error("Other Error:", error);
            throw error;
        })
}

export const GetCoursesApi = async () => {
    // Fetch data from API
    return axiosInstance
        .get(GET_ALL_COURSES)
        .then((response) => {
            console.log(response.data.data.courses)
            return response.data.data.courses;
        })
        .catch((error) => {
            console.error("Other Error:", error);
            throw error;
        })
}

// add course api
export const AddCourseApi = async (data: any, token: string) => {
    // Fetch data from API
    return axiosInstance
        .post(ADD_COURSE, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response.data)
            console.log(response.headers['Content-Type'])
            return response.data
        })
        .catch((error) => {
            // Handle other errors (network error, timeout, etc.) here.
            console.error("Other Error:", error);
            throw error;
        })
}

// export const GetCoursesApi = async ({ page, selectedSortOption, selectedOrderOption, searchQuery }: Course) => {
//   // Fetch data from API
//   try {
//     const response = await axios.get(
//       `${ALL_COURSES_URL}?page=${page}&limit=6&sortParam=${selectedSortOption}&sortOrder=${selectedOrderOption}&search=${searchQuery}`
//     );

//     const data = response.data;

//     if (data.success === false) {
//       toast.error(data.message);
//     } else if (data.success === true) {
//       return data;
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         const errorMessage = error.response.data?.message || 'An error occurred during the API request';
//         toast.error(errorMessage);
//       } else if (error.request) {
//         toast.error('No response received from the server during the API request');
//       } else {
//         toast.error('Error setting up the API request');
//       }
//     } else {
//       toast.error('An unknown error occurred during the API request');
//     }
//     throw error; // Re-throw the error so that the caller can handle it
//   }
// }

// // Add other API functions as needed



// // export const GetCoursesApi = async (page: number, selectedSortOption: string, selectedOrderOption: string, searchQuery: string) => {
// //     try {
// //         const response = await axios.get(
// //             `${ALL_COURSES_URL}?page=${page}&limit=6&sortParam=${selectedSortOption}&sortOrder=${selectedOrderOption}&search=${searchQuery}`
// //         );

// //         const data = response.data;

// //         if (data.success === false) {
// //             toast.error(data.message);
// //         } else if (data.success === true) {
// //             return data;
// //         }
// //     } catch (error) {
// //         if (axios.isAxiosError(error)) {
// //             if (error.response) {
// //                 const errorMessage = error.response.data?.message || 'An error occurred during the API request';
// //                 toast.error(errorMessage);
// //             } else if (error.request) {
// //                 toast.error('No response received from the server during the API request');
// //             } else {
// //                 toast.error('Error setting up the API request');
// //             }
// //         } else {
// //             toast.error('An unknown error occurred during the API request');
// //         }
// //         throw error; // Re-throw the error so that the caller can handle it
// //     }
// // };

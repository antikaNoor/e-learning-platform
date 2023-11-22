const BASE_URL = import.meta.env.VITE_SERVER_URL;

// auth
const LOGIN_URL = `${BASE_URL}/auth/login`;
const SIGNUP_URL = `${BASE_URL}/auth/signup`;
const VERIFY_EMAIL_URL = `${BASE_URL}/auth/verify-email`;
const RESEND_VERIFICATION_EMAIL_URL = `${BASE_URL}/auth/resend-verification-email`;
const FORGOT_PASSWORD_URL = `${BASE_URL}/auth/forgot-password`;
const RESET_PASSWORD_URL = `${BASE_URL}/auth/reset-password/:userId/:token`;
const VALIDATE_RESET_REQUEST_URL = `${BASE_URL}/auth/validate-reset-request/:userId/:token`;

//teacher
const TEACHER_INFO = `/notification/teacher-request`;

// Category
const GET_ALL_CATEGORIES = `/category/get-all-categories`;

// course
const ADD_CATEOGRY = `/course/add-category`;
const ADD_COURSE = `/course/create-course`;
const GET_ALL_COURSES = `${BASE_URL}/course/get-courses`;
const GET_TEACHERS_COURSES = `/course/get-teachers-courses`;
const ADD_VIDEO = `/lesson/add-video`;
const ADD_LESSON = `/lesson/create-lesson/:courseID`;
const GET_TEACHERS_LESSONS = `/lesson/get-teachers-lesson`;
const GET_ENROLLED_COURSES = `${BASE_URL}/course/get-enrolled-courses`;
const GET_COMPLETED_COURSES = `${BASE_URL}/course/get-completed-courses`;

// cart 
const ADD_TO_CART = `${BASE_URL}/cart/add-to-cart`;
const GET_YOUR_CART = `${BASE_URL}/cart/get-your-cart`;
const REMOVE_FROM_CART = `${BASE_URL}/cart/remove-from-cart/:cartID/:courseID`;

//wishlist
const ADD_TO_WISHLIST = `${BASE_URL}/wishlist/add-to-wishlist`;

//subscribe
const SUBSCRIBE = `${BASE_URL}/notification/request-for-subscription`;
const APPROVE_SUBSCRIBE = `${BASE_URL}/notification/subscription-approval/:notificationID`;

export {
    BASE_URL,
    LOGIN_URL,
    SIGNUP_URL,
    VERIFY_EMAIL_URL,
    RESEND_VERIFICATION_EMAIL_URL,
    FORGOT_PASSWORD_URL,
    RESET_PASSWORD_URL,
    VALIDATE_RESET_REQUEST_URL,

    TEACHER_INFO,

    GET_ALL_CATEGORIES,

    ADD_CATEOGRY,
    ADD_COURSE,
    GET_ALL_COURSES,
    GET_TEACHERS_COURSES,
    ADD_LESSON,
    GET_TEACHERS_LESSONS,
    ADD_VIDEO,
    GET_ENROLLED_COURSES,
    GET_COMPLETED_COURSES,

    ADD_TO_CART,
    GET_YOUR_CART,
    REMOVE_FROM_CART,

    ADD_TO_WISHLIST,

    SUBSCRIBE,
    APPROVE_SUBSCRIBE
}
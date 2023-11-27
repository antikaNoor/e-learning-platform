// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { ADD_CATEOGRY} from '../utils/constants';
import { toast } from "react-toastify";
import { axiosInstance, axiosInstanceToken } from "../utils/axiosInstance";
import {
  ADD_COURSE,
  GET_TEACHERS_COURSES,
  GET_ENROLLED_COURSES,
  GET_COMPLETED_COURSES,
  GET_TEACHERS_LESSONS,
  PUBLISH_COURSE,
  // GET_COURSE_ASSIGNMENT,
} from "../utils/constants";
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
      return response.data;
    })
    .catch((error) => {
      // Handle other errors (network error, timeout, etc.) here.
      console.error("Other Error:", error);
      throw error;
    });
};

export const GetCoursesApi = async (
  //   page?: number,
  searchQuery: string,
  sortParam: string
) => {
  // Fetch data from API
  return axiosInstance
    .get(`/course/get-courses?search=${searchQuery}&sortParam=${sortParam}`)
    .then((response) => {
      console.log("courses from api", response.data.data.courses);
      return response.data.data.courses;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      throw error;
    });
};

export const publishCorseApi = async (data: any, token: string) => {
  // Fetch data from API
  return axiosInstance
    .post(PUBLISH_COURSE, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      console.error("Other Error:", error, data);
      toast.error(error.response.data.message);
      throw error;
    });
};

export const GetEnrolledCoursesApi = async (token: string) => {
  // Fetch data from API
  return axiosInstance
    .get(GET_ENROLLED_COURSES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      throw error;
    });
};

export const GetCompletedCoursesApi = async (token: string) => {
  // Fetch data from API
  return axiosInstance
    .get(GET_COMPLETED_COURSES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      throw error;
    });
};

export const GetTeachersCoursesApi = async (token: string) => {
  // Fetch data from API
  return axiosInstance
    .get(GET_TEACHERS_COURSES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      console.log("token", token);
      return response.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      throw error;
    });
};

export const GetTeachersLessonsApi = async (token: string) => {
  // Fetch data from API
  return axiosInstance
    .get(GET_TEACHERS_LESSONS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      console.log("token", token);
      return response.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      throw error;
    });
};

export const GetAssignmentForCourseApi = async (
  token: string,
  courseID: string
) => {
  // Fetch data from API
  return axiosInstance
    .get(`/assignment/get-assignment/${courseID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("ass data from api", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      throw error;
    });
};

// add course api
export const AddCourseApi = async (data: any, token: string) => {
  // Fetch data from API
  return axiosInstance
    .post(ADD_COURSE, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      // Handle other errors (network error, timeout, etc.) here.
      toast.error(error.response.data.message);
      console.error("Other Error:", error);
      throw error;
    });
};

// add lesson api
export const AddLessonApi = async (
  courseID: string,
  data: any,
  token: string
) => {
  // Fetch data from API
  return axiosInstance
    .post(`/lesson/create-lesson/${courseID}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      // Handle other errors (network error, timeout, etc.) here.
      toast.error(error.response.data.message);
      console.error("Other Error:", error);
      throw error;
    });
};

// add assignment api
export const AddAssignmentApi = async (
  courseID: string,
  data: any,
  token: string
) => {
  // Fetch data from API
  return axiosInstance
    .post(`/assignment/create-assignment/${courseID}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      // Handle other errors (network error, timeout, etc.) here.
      toast.error(error.response.data.message);
      console.error("Other Error:", error);
      throw error;
    });
};

export const AddVideoApi = async (
  lessonID: string,
  data: any,
  token: string
) => {
  // Fetch data from API
  return axiosInstance
    .post(`/lesson/add-video/${lessonID}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      // Handle other errors (network error, timeout, etc.) here.
      toast.error(error.response.data.message);
      console.error("Other Error:", error);
      throw error;
    });
};

export const AddNoteApi = async (
  lessonID: string,
  data: any,
  token: string
) => {
  // Fetch data from API
  return axiosInstance
    .post(`/lesson/add-note/${lessonID}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      // Handle other errors (network error, timeout, etc.) here.
      toast.error(error.response.data.message);
      console.error("Other Error:", error);
      throw error;
    });
};

// add lesson api
export const AddQuizApi = async (
  courseID: string,
  data: any,
  token: string
) => {
  // Fetch data from API
  return axiosInstance
    .post(`/quiz/create-quiz/${courseID}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
};

export const GetQuizApi = async (courseID: string, token: string) => {
  // Fetch data from API
  return axiosInstance
    .get(`/quiz/get-quiz/${courseID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("response", response.data.data);
      toast.success(response.data.message);
      return response.data.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      toast.error(error.response.data.message);
      throw error;
    });
};

export const CompleteLessonApi = async (lessonID: string, token: string) => {
  return axiosInstance
    .get(`/lesson/complete-lesson/${lessonID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("response", response.data);
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      toast.error(error.response.data.message);
      throw error;
    });
}

export const GetAssignmentApi = async (courseID: string, token: string) => {
  // Fetch data from API
  return axiosInstance
    .get(`/assignment/get-assignment/${courseID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("response", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      throw error;
    });
};

export const GetAssignmentEvaluationApi = async (token: string) => {
  // Fetch data from API
  return axiosInstance
    .get(`/assignment/get-assignment-answer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("response", response.data.data);
      // toast.success(response.data.message);
      return response.data.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      // toast.error(error.response.data.message);
      throw error;
    });
};

export const EvaluateAssignmentApi = async (courseID: string, studentID: string, data: any, token: string) => {
  // Fetch data from API
  return axiosInstance
    .post(`/assignment/evaluate-assignment/${courseID}/${studentID}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("response", response.data.data);
      toast.success(response.data.message);
      return response.data.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      toast.error(error.response.data.message);
      throw error;
    });
};

export const StartQuizCountdownApi = async (
  quizID: string,
  token: string
) => {
  // Fetch data from API
  return axiosInstance
    .get(`/quiz/quiz-countdown/${quizID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data.data.time);
      return response.data.data.time;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      throw error;
    });
}

export const SubmitQuizApi = async (
  quizID: string,
  data: any,
  token: string
) => {
  // Fetch data from API
  return axiosInstance
    .post(`/quiz/submit-quiz/${quizID}`, { quizAnswer: data }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
};

export const AddDocToAssignmentApi = async (
  assignmentID: string,
  data: any,
  token: string
) => {
  // Fetch data from API
  return axiosInstance
    .post(`/assignment/upload-docs/${assignmentID}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("response from api", response.data);
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      // Handle other errors (network error, timeout, etc.) here.
      toast.error(error.response.data.message);
      console.error("Other Error:", error);
      throw error;
    });
};

export const SubmitAssignmentApi = async (
  courseID: string,
  data: any,
  token: string
) => {
  // Fetch data from API
  return axiosInstance
    .post(`/assignment/submit-assignment/${courseID}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("response from api", response.data);
      toast.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      // Handle other errors (network error, timeout, etc.) here.
      toast.error(error.response.data.message);
      console.error("Other Error:", error);
      throw error;
    });
};

export const TrackProgressApi = async (courseID: string, token: string) => {

  return axiosInstance
    .get(`/lesson/get-progress/${courseID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("response", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Other Error:", error);
      throw error;
    });
}
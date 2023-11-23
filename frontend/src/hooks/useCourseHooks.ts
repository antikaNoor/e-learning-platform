import {
  GetCoursesApi,
  AddCourseApi,
  AddVideoApi,
  AddLessonApi,
  GetTopicApi,
  GetTeachersCoursesApi,
  GetTeachersLessonsApi,
  AddNoteApi,
  GetEnrolledCoursesApi,
  GetCompletedCoursesApi,
  AddQuizApi,
} from "../ApiCalls/CourseApi";
import { useCallback } from "react";
import { useState, useEffect, ChangeEvent } from "react";

type Course = {
  _id?: string;
  title?: string;
  description?: string;
  teacherID?: string;
  language?: string;
  learingOutcome?: string;
  requirement?: string[];
  isApproved?: boolean;
  isPublished?: boolean;
  isDeleted?: boolean;
  topicID?: string;
  rating?: number;
  reviews?: string[];
  createdAt?: string;
  updatedAt?: string;
  lessonID?: string[];
  thumbnail?: string;
};

const useCourse = () => {
  //search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);

  // Search query handler
  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getTopic = async () => {
    try {
      const data = await GetTopicApi(); // Await the promise
      return data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      // Handle the error or re-throw it if necessary
    }
  };

  const addCourse = useCallback(async (data: any, token: string) => {
    try {
      await AddCourseApi(data, token);
      // Optionally, update the user state or perform other actions
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  const addVideo = useCallback(
    async (lessonID: string, data: any, token: string) => {
      try {
        await AddVideoApi(lessonID, data, token);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        console.log(error);
      }
    },
    []
  );

  const addNote = useCallback(
    async (lessonID: string, data: any, token: string) => {
      try {
        await AddNoteApi(lessonID, data, token);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        console.log(error);
      }
    },
    []
  );

  const addLesson = useCallback(
    async (courseID: string, data: any, token: string) => {
      try {
        await AddLessonApi(courseID, data, token);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        console.log(error);
      }
    },
    []
  );

  const addQuiz = useCallback(
    async (courseID: string, data: any, token: string) => {
      try {
        await AddQuizApi(courseID, data, token);
        // Optionally, update the user state or perform other actions
      } catch (error: any) {
        console.log(error);
      }
    },
    []
  );

  const getAllCourses = async () => {
    try {
      const data = await GetCoursesApi(searchQuery);
      return data;
      // console.log("data from hook", data)
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    const timeOutFunc = setTimeout(() => {
      console.log("changed");
      getAllCourses().then((data: Course[] | void) => {
        if (Array.isArray(data)) {
          setCourses(data);
        }
      });
    }, 2000);

    return () => clearTimeout(timeOutFunc);
  }, [searchQuery]);

  console.log("courses from hook", courses);

  const getEnrolledCourses = async (token: string) => {
    try {
      const data = await GetEnrolledCoursesApi(token);
      console.log("data from hook", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const getCompletedCourses = async (token: string) => {
    try {
      const data = await GetCompletedCoursesApi(token);
      console.log("data from hook", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const getTeachersCourse = useCallback(async (token: string) => {
    try {
      const response = await GetTeachersCoursesApi(token);
      return response;
      // Optionally, update the user state or perform other actions
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  const getTeachersLesson = useCallback(async (token: string) => {
    try {
      const response = await GetTeachersLessonsApi(token);
      console.log("response from hook", response.data);
      return response.data;
      // Optionally, update the user state or perform other actions
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  return {
    getAllCourses,
    getTopic,
    addCourse,
    getTeachersCourse,
    getTeachersLesson,
    addLesson,
    addVideo,
    addNote,
    getEnrolledCourses,
    getCompletedCourses,
    handleSearchQuery,
    searchQuery,
    courses,
    addQuiz
  };
};

export default useCourse;

// // useCourseHook.tsx
// import { useState, useEffect } from 'react';
// import { debounce } from 'lodash';
// import { GetCoursesApi } from '../ApiCalls/CourseApi';

// type UseCourseHookProps {
//   defaultPage: number;
//   defaultLimit: number;
// }

// const useCourseHook = ({ defaultPage, defaultLimit }: UseCourseHookProps) => {
//   const [courses, setCourses] = useState([]);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [page, setPage] = useState(defaultPage);
//   const [limit, setLimit] = useState(defaultLimit);
//   const [sortParam, setSortParam] = useState('');
//   const [sortOrder, setSortOrder] = useState('');
//   const [search, setSearch] = useState('');

//   const fetchCourses = async () => {
//     try {
//       const data = await GetCoursesApi(page, selectedSortOption, selectedOrderOption, searchQuery);
//       setCourses(data.courses);
//       setTotalRecords(data.totalRecords);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   // Debounce the fetch function to wait for 3 seconds after the last keystroke
//   const debouncedFetch = debounce(fetchCourses, 3000);

//   useEffect(() => {
//     fetchCourses();
//   }, [page, limit, sortParam, sortOrder, search]);

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   const handleSortChange = (param: string, order: string) => {
//     setSortParam(param);
//     setSortOrder(order);
//   };

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//     debouncedFetch();
//   };

//   return {
//     courses,
//     totalRecords,
//     page,
//     limit,
//     sortParam,
//     sortOrder,
//     search,
//     handlePageChange,
//     handleSortChange,
//     handleSearchChange,
//   };
// };

// export default useCourseHook;

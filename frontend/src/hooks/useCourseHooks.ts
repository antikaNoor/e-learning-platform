import { debounce } from 'lodash';
import { useState, useEffect } from 'react';
import { GetCoursesApi } from '../ApiCalls/CourseApi';
// import { toast } from 'react-toastify';

const useCourse = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [selectedOrderOption, setSelectedOrderOption] = useState('');

    const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortOption(e.target.value);
    };

    const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOrderOption(e.target.value);
    };

    const GetCourse = async () => {
        try {
            const result = await GetCoursesApi(currentPage, selectedSortOption, selectedOrderOption, searchQuery);
            setCourses(result.data.courses);
            setCurrentPage(result.data.currentPage);
            setTotalPages(result.data.totalPages);
        } catch (error) {
            console.error('Error fetching courses:', error);
            // toast.error('Error fetching courses');
        }
    };

    useEffect(() => {
        const debouncedFetch = debounce(GetCourse, 2000);
        debouncedFetch();

        return () => {
            // Cleanup logic if needed
        };
    }, [currentPage, searchQuery, selectedSortOption, selectedOrderOption]);

    return {
        GetCourse,
        courses,
        currentPage,
        totalPages,
        searchQuery,
        handleSearchQuery,
        selectedSortOption,
        selectedOrderOption,
        handleSortChange,
        handleOrderChange,
    };
};

export default useCourse;
// @ts-ignore
import { useEffect } from 'react';
import Rating from 'react-rating-stars-component';
import useCourse from '../../hooks/useCourseHooks';

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
    lessonID?: string[];
};

const CourseList = () => {
    const { GetCourse, courses } = useCourse();

    useEffect(() => {
        GetCourse(1); // Pass the desired page number as an argument
    }, [GetCourse]);

    return (
        <div className="container mx-auto my-8 px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {courses?.map((course: Course) => (
                    <div key={course?._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                        <img
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            alt={course?.title}
                            className="w-full h-48 object-cover transition-transform transform hover:scale-105 duration-300"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{course?.title}</h3>
                            <p className="text-gray-600">{course?.description}</p>
                            <p><strong>Language:</strong> {course?.language}</p>
                            {/* <p><strong>Learning Outcome:</strong> {course?.learingOutcome}</p> */}
                            <p><strong>Requirements:</strong> {course?.requirement?.join(', ')}</p>
                            {/* Uncomment and customize the lines below based on your course structure */}
                            {/* <p><strong>Approved:</strong> {course?.isApproved ? 'Yes' : 'No'}</p> */}
                            {/* <p><strong>Published:</strong> {course?.isPublished ? 'Yes' or 'No'}</p> */}
                            {/* <p><strong>Deleted:</strong> {course?.isDeleted ? 'Yes' : 'No'}</p> */}
                            <div className="mt-4">
                                <Rating
                                    count={5}
                                    value={course?.rating || 0}
                                    size={32}
                                    edit={false}
                                    activeColor="#FFD700"
                                    color="#A0A0A0"
                                />
                                <span className="ml-2 text-gray-700">
                                    {course?.reviews && `(${course.reviews.length} reviews)`}
                                </span>
                            </div>
                            {/* <p className="text-gray-700"><strong>Created At:</strong> {course?.createdAt}</p> */}
                            {/* Additional fields can be displayed as needed */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;

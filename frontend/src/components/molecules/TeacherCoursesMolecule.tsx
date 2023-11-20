import React from 'react'
import useCourse from '../../hooks/useCourseHooks'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Rating from 'react-rating-stars-component';
import helper from '../../utils/helper';
import { AiFillPlusCircle } from "react-icons/ai";
import { FaCheck } from 'react-icons/fa6';

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

const TeacherCoursesMolecule = () => {
    const { getTeachersCourse } = useCourse()

    const state = useSelector((state: any) => state.user);

    const checkString = state.token;

    const [courses, setCourses] = useState<Course[]>([]);

    const { truncateText } = helper()

    useEffect(() => {
        getTeachersCourse(checkString).then((response: any) => {
            // Check if the response was successful
            if (response.success) {
                // Extract and set the course data
                setCourses(response.data);
            } else {
                // Handle error if needed
                console.error("Error fetching courses:", response.message);
            }
        }).catch((error: any) => {
            // Handle any other errors
            console.error("Error:", error);
        });
    }, []);

    console.log(courses)

    return (
        <div>
            <div className="container mx-auto my-8 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses?.map((course: Course) => (
                        <div key={course?._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            {course.thumbnail && (
                                <img
                                    src={course.thumbnail}
                                    alt={course?.title}
                                    className="w-full h-54 object-cover transition-transform transform hover:scale-105 duration-300"
                                />
                            )}
                            <div className="p-4">
                                <div className='flex justify-between items-center'>
                                    <h3 className="text-xl font-bold mb-2">{course?.title}</h3>

                                </div>

                                <p className="text-gray-600 mb-1">{truncateText(course?.description ?? "", 100)}</p>
                                <p><strong>Language:</strong> {course?.language}</p>
                                <p><strong>Prerequisites</strong></p>
                                <ul className='list-disc pl-6'>
                                    {course?.requirement?.map((requirement: string, index: number) => (
                                        <li key={index} className='flex items-center text-gray-700'>
                                            <FaCheck className='mr-2 text-green-500' /> {/* Tick icon */}
                                            {requirement}
                                        </li>
                                    ))}
                                    {!course?.requirement && <li className='text-gray-700'>None</li>}
                                </ul>
                                <span className="text-gray-700">
                                    {course?.lessonID && `Lessons: ${course.lessonID.length}`}
                                </span>
                                <div className="mt-1">
                                    <Rating
                                        count={5}
                                        value={course?.rating || 0}
                                        size={32}
                                        edit={false}
                                        activeColor="#FFD700"
                                        color="#A0A0A0"
                                        className="rounded-full"
                                    />
                                    <span className="text-gray-700">
                                        {course?.reviews && `(${course.reviews.length} reviews)`}
                                    </span>
                                </div>
                            </div>

                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
}

export default TeacherCoursesMolecule
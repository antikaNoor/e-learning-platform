import React, { useEffect, useState } from 'react';
import useCourse from '../../../hooks/useCourseHooks';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

type Video = {
    videoTitle: string;
    videoLink: string;
    _id: string;
}

type Note = {
    noteTitle: string;
    noteLink: string;
    _id: string;
}

type Lesson = {
    _id: string;
    title: string;
    description: string;
    isDeleted: boolean;
    courseID: string;
    videos: Video[];
    notes: Note[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

type ProgressData = {
    _id: string;
    studentID: string;
    courseID: string;
    completedLessons: Lesson[];
    percentage: number;
    createdAt: string;
    updatedAt: string;
}

const TrackProgressMolecule = () => {
    const { trackProgress } = useCourse();

    const state = useSelector((state: any) => state.user);
    const checkString = state.token;

    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const courseID = pathArray[pathArray.length - 1];

    const [progress, setProgress] = useState<ProgressData>({
        _id: '',
        studentID: '',
        courseID: '',
        completedLessons: [],
        percentage: 0,
        createdAt: '',
        updatedAt: '',
    })

    useEffect(() => {
        trackProgress(courseID, checkString)
            .then((data) => {
                setProgress(data);
            })
    }, [])

    console.log("progress", progress)

    return (
        <div className='flex flex-col justify-center items-center mt-10'>
            <div>Lessons Completed({progress.completedLessons.length})</div>

            {/* Progress Bar */}
            <div className="w-[500px] bg-gray-200 rounded-full mt-4 p-1">
                <div
                    className="bg-blue-500 text-white rounded-full"
                    style={{ width: `${progress.percentage}%` }}
                >
                    {progress.percentage}%
                </div>
            </div>
            <div className='flex flex-col justify-center items-center mt-10'>
                <h1 className='font-semibold text-lg'>Completed Lessons</h1>
                {progress.completedLessons.map((lesson) => (
                    <div key={lesson._id} className='font-semibold'>
                        {lesson.title}
                    </div>
                ))}
            </div>
            {/* <div>Percentage: {progress.percentage}%</div> */}


        </div>
    )
}

export default TrackProgressMolecule;

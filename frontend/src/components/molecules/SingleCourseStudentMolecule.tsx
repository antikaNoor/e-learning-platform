import { useEffect, useState } from 'react';
import Rating from 'react-rating-stars-component';
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import useCourse from '../../hooks/useCourseHooks';
import helper from '../../utils/helper';
import { jwtDecode } from "jwt-decode"
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';
import { IoPlayCircleOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";
import ReactPlayer from 'react-player'
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import AccordionForLessons from '../atoms/AccordionForLessons';
import helpers from '../../utils/helper';

type Videos = {
    videoTitle?: string,
    videoLink?: string,
    _id?: string
}

type Notes = {
    noteTitle?: string,
    noteLink?: string | null,
    _id?: string
}

type Lessons = {
    _id?: string,
    title?: string,
    description?: string,
    isDeleted?: boolean,
    courseID?: string,
    videos?: Videos[],
    notes?: Notes[]
    createdAt?: string,
    updatedAt?: string,
}

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
    lessons?: Lessons[];
    thumbnail?: string;
};

const SingleCourseStudentMolecule = () => {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const courseID = pathArray[pathArray.length - 1];

    const navigate = useNavigate()
    const { getEnrolledCourses } = useCourse();
    const { getFileType } = helper()

    const state = useSelector((state: any) => state.user);

    const checkString = state.token;

    const [courses, setCourses] = useState<Course[]>([]);
    const [singleCourse, setSingleCourse] = useState<Course | undefined>();
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

    const { truncateText } = helper()

    useEffect(() => {
        getEnrolledCourses(checkString).then(async (data: Course[] | void) => {
            if (Array.isArray(data)) {
                await setCourses(data);
                const selectedCourse = data.find((course) => course._id === courseID);
                setSingleCourse(selectedCourse);
            }
        });
    }, [checkString, courseID]);

    const handleNextLesson = () => {
        if (currentLessonIndex < (singleCourse?.lessons?.length || 0) - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        }
    };

    const handlePreviousLesson = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
        }
    };

    console.log("id form component", singleCourse)
    return (
        <div className="container mx-auto my-8 px-10">
            <h1 className="text-2xl font-bold mb-4">Course Contents</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {singleCourse?.lessons?.map((lesson: Lessons, index: number) => (
                    <div key={lesson._id} style={{ display: index === currentLessonIndex ? 'block' : 'none' }}>
                        <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
                        <p className='text-gray-700'>{lesson.description}</p>
                        {lesson?.videos?.map((video: Videos) => (
                            <div key={video._id} className="my-4">
                                <ReactPlayer
                                    url={video.videoLink}
                                    playing={false}
                                    controls={true}
                                    volume={1}
                                />
                                <p className='text-gray-700'>{video.videoTitle}</p>
                            </div>
                        ))}
                        {lesson?.notes?.map((note: Notes) => (
                            <div key={note._id} className="my-4">
                                {note.noteLink && (
                                    <DocViewer
                                        key={note._id}
                                        documents={[{ uri: note.noteLink, fileType: getFileType(note.noteLink) }]}
                                        config={{
                                            ...{
                                                header: {
                                                    disableHeader: true,
                                                },
                                            },
                                        }}
                                        pluginRenderers={DocViewerRenderers}
                                    />
                                )}
                                <p className='text-gray-700'>{note.noteTitle}</p>
                            </div>
                        ))}
                        {index === currentLessonIndex && (
                            <div className='flex justify-between gap-2 mt-10'>
                                <button onClick={handlePreviousLesson} disabled={currentLessonIndex === 0}>
                                    <IoMdArrowDropleftCircle size={30} className={`text-green-600 ${currentLessonIndex === 0 ? 'text-gray-400' : ''}`} />
                                </button>
                                <button onClick={handleNextLesson} disabled={currentLessonIndex === singleCourse?.lessons?.length - 1}>
                                    <IoMdArrowDroprightCircle size={30} className={`text-green-600 ${currentLessonIndex === singleCourse?.lessons.length - 1 ? 'text-gray-400' : ''}`} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SingleCourseStudentMolecule;

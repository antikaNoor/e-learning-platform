import { useEffect, useState } from 'react';
import Rating from 'react-rating-stars-component';
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import useCourse from '../../hooks/useCourseHooks';
import helper from '../../utils/helper';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import Modal from 'react-modal';
import Button from '../atoms/Button';
import { CgCloseR } from "react-icons/cg";
import useReview from '../../hooks/useReviewHooks';
import { useForm, Controller } from 'react-hook-form';

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

type FormData = {
    rating?: number | undefined;
    text?: string;
};

const StudentCompletedCoursesMolecule = () => {
    const navigate = useNavigate()
    const { getCompletedCourses } = useCourse();
    const { addReview } = useReview()

    const state = useSelector((state: any) => state.user);

    const checkString = state.token;

    const [courses, setCourses] = useState<Course[]>([]);
    const [singleCourse, setSingleCourse] = useState<Course>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { truncateText } = helper()

    useEffect(() => {
        getCompletedCourses(checkString).then(async (data: Course[] | void) => {
            if (Array.isArray(data)) {
                await setCourses(data);
            }
        });
    }, [checkString]);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            rating: 0,
            text: '',
        },
    });
    const onSubmit = async (data: FormData) => {
        const formData = new FormData();

        formData.append('rating', String(Number(data?.rating)));
        formData.append('text', data?.text ?? '');
        console.log({ ...data })

        await addReview(singleCourse?._id ?? '', formData, checkString);

    };

    console.log("Courses form component", singleCourse)

    return (
        <div className="container mx-auto my-8 px-10">
            {courses.length === 0 ? (
                <div className='ml-[-200px] flex flex-col gap-2 justify-center items-center'>
                    <img src='/no-task.png' className='opacity-50'></img>
                    <p className="text-xl font-bold text-center text-gray-600">No courses found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course: Course) => (
                        <div key={course._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            {courses?.map((course: Course) => (
                                <div key={course._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                                    {course.thumbnail && (
                                        <img
                                            src={course.thumbnail}
                                            alt={course?.title}
                                            className="w-full h-54 object-cover transition-transform transform hover:scale-105 duration-300"
                                        />
                                    )}
                                    <div className="flex flex-col gap-1 p-4">
                                        <div className='flex justify-between items-center'>
                                            <h3 className="text-xl font-bold mb-2">{course?.title}</h3>
                                        </div>

                                        <p className="text-gray-600 mb-1">{truncateText(course?.description ?? "", 100)}</p>
                                        <p><strong>Language:</strong> {course?.language}</p>
                                        <span className="text-gray-700">
                                            {course?.lessonID && `Lessons (${course.lessonID.length})`}
                                        </span>
                                        <p><strong>Prerequisites</strong></p>
                                        <ul className='list-disc pl-6'>
                                            {course?.requirement?.map((requirement: string, index: number) => (
                                                <li key={index} className='flex items-center text-gray-700'>
                                                    <FaCheck className='mr-1 text-green-500' /> {/* Tick icon */}
                                                    {requirement}
                                                </li>
                                            ))}
                                            {!course?.requirement && <li className='text-gray-700'>None</li>}
                                        </ul>

                                        <div className="flex justify-between items-center mt-1">
                                            <div className='flex items-center gap-1'>
                                                <Rating
                                                    count={5}
                                                    value={course?.rating || 0}
                                                    size={24}
                                                    edit={false}
                                                    activeColor="#FFD700"
                                                    color="#A0A0A0"
                                                    isHalf={true}
                                                    className="rounded-full"
                                                />
                                                <span className="text-gray-700">
                                                    {course?.reviews && `(${course.reviews.length})`}
                                                </span>
                                            </div>
                                            <div className='flex gap-1 cursor-pointer'
                                                onClick={async () => {
                                                    await setSingleCourse(course)
                                                    openModal()
                                                    console.log("single course", singleCourse)
                                                }}
                                            >
                                                <MdRateReview size={30} className="text-green-600" />
                                                <p className='text-gray-700'>Write review</p>
                                            </div>
                                            <Modal
                                                isOpen={isModalOpen}
                                                onRequestClose={closeModal}
                                                ariaHideApp={false}
                                                contentLabel="Example Modal"
                                                style={{
                                                    overlay: {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    },
                                                    content: {
                                                        width: '50%',
                                                        height: '50%',
                                                        margin: 'auto',
                                                        borderRadius: '10px',
                                                        overflow: 'auto',
                                                    },
                                                }}>
                                                <div>
                                                    <h2 className="text-2xl font-bold mb-4">Write Review</h2>
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="mb-4">
                                                            <label className="block text-gray-700 font-bold mb-2">Rating</label>
                                                            <Controller
                                                                name="rating"
                                                                control={control}
                                                                rules={{
                                                                    required: 'Rating is required',
                                                                }}
                                                                render={({ field }) => (
                                                                    <Rating
                                                                        count={5}
                                                                        value={Number(field.value)}
                                                                        size={24}
                                                                        edit={true}
                                                                        activeColor="#FFD700"
                                                                        color="#A0A0A0"
                                                                        isHalf={true}
                                                                        className="rounded-full"
                                                                        onChange={(value: number) => {
                                                                            field.onChange(value);

                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.rating && <h5 className="text-red-500">{String(errors.rating.message)}</h5>}
                                                        </div>

                                                        <div>
                                                            <label>Description</label>
                                                            <Controller
                                                                name="text"
                                                                control={control}
                                                                rules={{

                                                                    maxLength: {
                                                                        value: 500,
                                                                        message: 'Maximum length must be 500',
                                                                    },
                                                                }}
                                                                render={({ field }) => (
                                                                    <textarea
                                                                        placeholder="Write a comment"
                                                                        {...field}
                                                                        className={`w-full px-4 py-2 border rounded ${errors.text ? 'border-red-500' : ''}`}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.text && <h5 className="text-red-500">{String(errors.text.message)}</h5>}
                                                        </div>

                                                        <div className="mb-4">
                                                            <Button
                                                                type="submit"
                                                                value="Submit"
                                                                additionalStyles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                            >
                                                                Submit
                                                            </Button>
                                                        </div>

                                                    </form>
                                                </div>
                                                <CgCloseR className='text-2xl absolute top-3 right-3 text-gray-700 cursor-pointer' onClick={closeModal} />
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}

export default StudentCompletedCoursesMolecule
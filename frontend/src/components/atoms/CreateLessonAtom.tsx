import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';
import useCourse from '../../hooks/useCourseHooks';
import Dropdown from '../atoms/Dropdown';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type FormData = {
    _id?: string;
    title?: string;
    description?: string;
};

type Props = {
    onLessonCreated: (newLessonID: string) => void;
};

// type FormVideoData={
//     _id?: string;
//     videoTitle?: string;
//     videoLink?: FileList;
// }

// type FormNodeData={
//     _id?: string;
//     nodeTitle?: string;
//     nodeLink?: FileList;
// }

const CreateLessonAtom = ({ onLessonCreated }: Props) => {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const courseID = pathArray[pathArray.length - 1];
    // console.log("courseID", courseID);


    const { addLesson, getTeachersLesson } = useCourse();

    const state = useSelector((state: any) => state.user);
    const checkString = state.token;

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
        },
    });
    const onSubmit = async (data: FormData) => {
        const formData = new FormData();

        formData.append('title', data.title ?? '');
        formData.append('description', data.description ?? '');

        console.log({ ...data })

        await addLesson(courseID, formData, checkString);

        const createdLessonResponse = await getTeachersLesson(checkString);
        console.log("createdLessonResponse", createdLessonResponse)

        // Check if the array has at least one element before accessing the last one
        if (createdLessonResponse.length > 0) {
            const newLessonID = createdLessonResponse[createdLessonResponse.length - 1];
            console.log("lesson id from lesson atom:", newLessonID);

            // Call the callback function with the newLessonID
            onLessonCreated(newLessonID);
        } else {
            console.log("The array is empty.");
        }
        // get the last item of the array

        // Add the ID after the link in navigate
        // navigate(`create-lesson/${newCourseId}`);

    };

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            const message = "Are you sure you want to leave? Your changes may not be saved.";

            // Standard for most browsers
            event.returnValue = message;

            // For some older browsers
            return message;
        };

        // Attach the event listener when the component mounts
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className="w-md mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title</label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: 'Title is required',
                            minLength: {
                                value: 4,
                                message: 'Minimum length must be 4',
                            },
                            maxLength: {
                                value: 100,
                                message: 'Maximum length must be 100',
                            },
                        }}
                        render={({ field }) => (
                            <input
                                placeholder="Enter lesson title"
                                {...field}
                                className={`w-full px-4 py-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
                            />
                        )}
                    />
                    {errors.title && <h5 className="text-red-500">{String(errors.title.message)}</h5>}
                </div>

                <div>
                    <label>Description</label>
                    <Controller
                        name="description"
                        control={control}
                        rules={{
                            required: 'Description is required',
                            maxLength: {
                                value: 500,
                                message: 'Maximum length must be 500',
                            },
                        }}
                        render={({ field }) => (
                            <textarea
                                placeholder="Enter lesson description"
                                {...field}
                                className={`w-full px-4 py-2 border rounded ${errors.description ? 'border-red-500' : ''}`}
                            />
                        )}
                    />
                    {errors.description && <h5 className="text-red-500">{String(errors.description.message)}</h5>}
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
    )
}

export default CreateLessonAtom
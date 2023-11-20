import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';
import useCourse from '../../hooks/useCourseHooks';
import Dropdown from '../atoms/Dropdown';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { IoCloudUpload } from "react-icons/io5";
import { toast } from 'react-toastify';

type FormData = {
    _id?: string;
    videoTitle?: string;
    videoLink?: FileList;
}

type LessonID = {
    lessonID?: string;
}
const AddVideoToLessonAtom = ({ lessonID }: LessonID) => {

    const { addVideo } = useCourse();

    const state = useSelector((state: any) => state.user);
    const checkString = state.token;

    console.log("lessonid from video atom", lessonID);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            videoTitle: '',
            videoLink: [] as unknown as FileList,
        },
    });

    const [videoLink, setVideoLink] = useState<any>([]);

    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        setVideoLink(acceptedFiles);
    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();

        formData.append('videoTitle', data.videoTitle ?? '');

        formData.append('videoLink', videoLink[0]);

        console.log({ ...data, videoLink: videoLink })

        if (lessonID) {
            await addVideo(lessonID, formData, checkString);
        }
        else {
            toast.error("Please submit the lesson first")
        }

        // const createdCourseResponse = await getTeachersCourse(checkString);
        // get the last item of the array
        // const newCourseId = createdCourseResponse.data[createdCourseResponse.data.length - 1]._id;

        // Add the ID after the link in navigate
        // navigate(`create-lesson/${newCourseId}`);

    };

    return (
        <div className='flex flex-col gap-2 items-center border w-[400px] rounded p-3 mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title</label>
                    <Controller
                        name="videoTitle"
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
                                placeholder="Enter video title"
                                {...field}
                                className={`w-full px-4 py-2 border rounded ${errors.videoTitle ? 'border-red-500' : ''}`}
                            />
                        )}
                    />
                    {errors.videoTitle && <h5 className="text-red-500">{String(errors.videoTitle.message)}</h5>}
                </div>

                <div className='flex items-center gap-2 text-xl'>Add Video
                    <IoCloudUpload />
                </div>

                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>

                <div className="mb-4">
                    <Button
                        type="submit"
                        value="Submit"
                        additionalStyles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddVideoToLessonAtom
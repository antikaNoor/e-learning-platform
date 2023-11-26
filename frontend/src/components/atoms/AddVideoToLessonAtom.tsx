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
import { FaMinus } from 'react-icons/fa6';
import Modal from 'react-modal';
import { CgCloseR } from "react-icons/cg";
import ReacordVideoAtom from './ReacordVideoAtom';

type FormData = {
    _id?: string;
    videoTitle?: string;
    videoLink?: FileList;
}

type LessonID = {
    lessonID?: string;
    onRemove: () => void;
}

const AddVideoToLessonAtom = ({ lessonID, onRemove }: LessonID) => {

    const { addVideo } = useCourse();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const state = useSelector((state: any) => state.user);
    const checkString = state.token;

    console.log("lessonid from video atom", lessonID);

    const [recordedFile, setRecordedFile] = useState<{ videoTitle: string; videoLink: File } | null>(null);

    const handleRecordingComplete = (recordedData: { videoTitle: string; videoLink: File }) => {
        setRecordedFile(recordedData);
    };

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

    };

    return (
        <div className='flex flex-col gap-2 items-center border w-[400px] rounded p-3 mx-auto'>
            <FaMinus onClick={onRemove} />
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
                <div
                    onClick={async () => {
                        openModal()
                    }}
                    className='text-lg text-blue-500 font-semibold cursor-pointer'>Or record a video</div>
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
                            position: 'absolute',
                            top: '0',
                            bottom: '0',
                            width: '80%',
                            height: '95%',
                            margin: 'auto',
                            borderRadius: '10px',
                            overflow: 'auto',

                        },
                    }}>
                    <ReacordVideoAtom lessonID={lessonID} onRecordingComplete={handleRecordingComplete} />
                    <CgCloseR className='text-2xl absolute top-3 right-3 text-gray-700 cursor-pointer' onClick={closeModal} />
                </Modal>

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
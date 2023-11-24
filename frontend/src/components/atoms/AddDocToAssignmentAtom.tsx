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

type FormData = {
    docLink?: FileList;
}

type AssignmentID = {
    assignmentID?: string;
}
const AddDocToAssignmentAtom = ({ assignmentID }: AssignmentID) => {

    const { addDocToAssignment } = useCourse();

    const state = useSelector((state: any) => state.user);
    const checkString = state.token;

    console.log("assignmentID from doc atom", assignmentID);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            docLink: [] as unknown as FileList,
        },
    });

    const [docLink, setDocLink] = useState<any>([]);

    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        setDocLink(acceptedFiles);
    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const onSubmit = async () => {
        const formData = new FormData();

        formData.append('documents', docLink[0]);

        console.log({ docLink: docLink })

        if (assignmentID) {
            await addDocToAssignment(assignmentID, formData, checkString);
        }
        else {
            toast.error("Please submit the title and description first")
        }

        // const createdCourseResponse = await getTeachersCourse(checkString);
        // get the last item of the array
        // const newCourseId = createdCourseResponse.data[createdCourseResponse.data.length - 1]._id;

        // Add the ID after the link in navigate
        // navigate(`create-lesson/${newCourseId}`);

    };

    return (
        <div className='flex flex-col gap-2 items-center border w-[400px] rounded p-3 mx-auto'>
            {/* <FaMinus onClick={onRemove} /> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex items-center gap-2 text-xl'>Upload Assignment
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

export default AddDocToAssignmentAtom
import React from 'react'
import CreateLessonAtom from '../atoms/CreateLessonAtom'
import AddVideoToLessonAtom from '../atoms/AddVideoToLessonAtom'
import AddNotesToLessonsAtom from '../atoms/AddNotesToLessonsAtom'
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { useState } from 'react';

type Props = {}

const CreateLessonMolecule = (props: Props) => {

    const [newLessonID, setNewLessonID] = useState<string | undefined>(undefined);

    const handleLessonCreated = (lessonID: string) => {
        setNewLessonID(lessonID);
    };

    return (
        <div>
            <CreateLessonAtom onLessonCreated={handleLessonCreated} />
            {/* <div className='flex gap-2 items-center justify-center'>
                <FiMinusCircle size={24} className='text-red-600' /> */}
            <div className='flex flex-col justify-center items-center gap-2'></div>
            <AddVideoToLessonAtom lessonID={newLessonID} />
            {/* <FiPlusCircle size={24} className='text-green-600' />
            </div> */}
            <AddNotesToLessonsAtom lessonID={newLessonID} />
        </div>
    )
}

export default CreateLessonMolecule
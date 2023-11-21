import React from 'react'
import CreateLessonAtom from '../atoms/CreateLessonAtom'
import AddVideoToLessonAtom from '../atoms/AddVideoToLessonAtom'
import AddNotesToLessonsAtom from '../atoms/AddNotesToLessonsAtom'
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';


const CreateLessonMolecule = () => {

    const [lessonDivs, setLessonDivs] = useState<number[]>([1]);

    const addDivLesson = () => {
        setLessonDivs([...lessonDivs, lessonDivs.length + 1]);
    };

    const removeDivLesson = (index: number) => {
        const updatedDivs = lessonDivs.filter((_, i) => i !== index);
        setLessonDivs(updatedDivs);
    };
    return (
        <div>
            {/* this is the child now */}
            <FaPlus onClick={addDivLesson} />
            {lessonDivs.map((_, index) => (
                <CreateLessonAtom key={index} onLessonRemove={() => removeDivLesson(index)} />
            ))}
        </div>
    )
}

export default CreateLessonMolecule
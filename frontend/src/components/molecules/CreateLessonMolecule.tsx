import React from "react";
import CreateLessonAtom from "../atoms/CreateLessonAtom";
import AddVideoToLessonAtom from "../atoms/AddVideoToLessonAtom";
import AddNotesToLessonsAtom from "../atoms/AddNotesToLessonsAtom";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

const CreateLessonMolecule = () => {
  const [lessonDivs, setLessonDivs] = useState<number[]>([1]);
  const [lessonIds, setLessonIds] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const courseID = pathArray[pathArray.length - 1];
  const otherElements = pathArray.slice(0, -1);
  const joinedPath = otherElements.join("/");

  console.log("location", joinedPath);

  const addDivLesson = () => {
    setLessonDivs([...lessonDivs, lessonDivs.length + 1]);
  };

  const removeDivLesson = (index: number) => {
    const updatedDivs = lessonDivs.filter((_, i) => i !== index);
    setLessonDivs(updatedDivs);
    // Remove the corresponding lessonId when removing a lesson
    setLessonIds((prevIds) => prevIds.filter((_, i) => i !== index));
  };

  const handleLessonIdChange = (lessonId: string | undefined, index: number) => {
    // Update the lessonId in the state
    setLessonIds((prevIds) => {
      const newIds = [...prevIds];
      newIds[index] = lessonId || ''; // Ensure it's not undefined
      return newIds;
    });
  };

//   console.log("lesson id from lesson molecule:", lessonIds);
  
  return (
    <div>
      {/* this is the child now */}
      <FaPlus onClick={addDivLesson} />
      {lessonDivs.map((_, index) => (
        <CreateLessonAtom
        key={index}
        onLessonRemove={() => removeDivLesson(index)}
        onLessonIdChange={(lessonId) => handleLessonIdChange(lessonId, index)}
      />

      ))}
      {lessonIds.length > 0 ? (
          <Button
          value="Add Quiz"
          type="submit"
          onClick={() => navigate(`${joinedPath}/create-quiz/${courseID}`)}
        />
      ):null}
    </div>
  );
};

export default CreateLessonMolecule;

import CreateLessonAtom from "../../atoms/CreateLessonAtom";
import AddVideoToLessonAtom from "../../atoms/AddVideoToLessonAtom";
import AddNotesToLessonsAtom from "../../atoms/AddNotesToLessonsAtom";
// import { FiPlusCircle } from "react-icons/fi";
// import { FiMinusCircle } from "react-icons/fi";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import NavBarOrganism from "../../organisms/CommonOrganisms/NavBarOrganism";

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
      newIds[index] = lessonId || '';
      return newIds;
    });
  };

  return (
    <div>
      <NavBarOrganism />
      <div className="flex flex-col mt-10 justify-center items-center">
        {/* this is the child now */}
        <div className="flex gap-3">
          <h1 className="text-3xl font-bold">Create Lesson</h1>
          <FaPlus onClick={addDivLesson} className="bg-green-500 text-white rounded-full p-3 w-9 h-9 cursor-pointer" />
        </div>
        <div>
          {lessonDivs.map((_, index) => (
            <div className="mb-10">
              <CreateLessonAtom
                key={index}
                onLessonRemove={() => removeDivLesson(index)}
                onLessonIdChange={(lessonId) => handleLessonIdChange(lessonId, index)}
              />
            </div>

          ))}
          {lessonIds.length > 0 ? (
            <Button
              value="Add Quiz"
              type="submit"
              onClick={() => navigate(`${joinedPath}/create-quiz/${courseID}`)}
            />
          ) : null}
        </div>

      </div>
    </div>
  );
};

export default CreateLessonMolecule;

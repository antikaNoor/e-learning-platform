import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { CgAddR } from "react-icons/cg";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useLocation } from "react-router-dom";
import NavBarOrganism from "../../organisms/CommonOrganisms/NavBarOrganism";
import useCourse from "../../../hooks/useCourseHooks";
import Button from "../../atoms/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

type FormValues = {
  questions: {
    question: string;
    options: string[];
    correctOption: number;
  }[];
  duration: number;
};

const CreateQuizMolecule = (props: Props) => {
  const navigate = useNavigate()
  const { addQuiz } = useCourse();

  const [lessonIds, setLessonIds] = useState<string[]>([]);

  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const courseID = pathArray[pathArray.length - 1];

  const otherElements = pathArray.slice(0, -1);
  const joinedPath = otherElements.join("/");

  console.log("location", joinedPath);

  const state = useSelector((state: any) => state.user);
  const checkString = state.token;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      questions: [
        { question: "", options: ["", "", "", ""], correctOption: 0 },
      ],
      duration: 0,
    },
    mode: "onBlur",
  });

  const {
    fields: quizFields,
    append: appendQuiz,
    remove: removeQuiz,
  } = useFieldArray({
    name: "questions",
    control,
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    await addQuiz(courseID, data, checkString);
    if (isValid) {
      // Only navigate if the form is valid
      await navigate(`${joinedPath}/create-assignment/${courseID}`);
    }

  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message =
        "Are you sure you want to leave? Your changes may not be saved.";

      // Standard for most browsers
      event.returnValue = message;

      // For some older browsers
      return message;
    };

    // Attach the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <NavBarOrganism />
      <h1 className="text-3xl font-bold mt-5 ml-[130px]">Create Quiz</h1>
      <div className="mx-auto ml-[130px] mt-[30px] p-5 flex flex-col items-center justify-center">

        <form onSubmit={handleSubmit(onSubmit)}>
          {quizFields.map((field, index) => (
            <div key={field.id} className="flex flex-col space-y-4 w-[400px]">
              <input
                {...register(`questions.${index}.question` as const)}
                placeholder={`Question ${index + 1}`}
                className="bg-gray-200 border-gray-300 p-2 rounded w-[800px] h-[100px]"
              />

              {/* Options */}
              {field.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  {...register(
                    `questions.${index}.options.${optionIndex}` as const,
                    {
                      required: "Option is required",
                    }
                  )}
                  placeholder={`Option ${optionIndex + 1}`}
                  className="border border-gray-300 p-2 rounded"
                />
              ))}
              <label>Enter the Correct Option (1 to 4)</label>
              <input
                {...register(`questions.${index}.correctOption` as const, {
                  required: "Correct option is required",
                  min: { value: 1, message: "Value must be at least 1" },
                  max: { value: 4, message: "Value must be at most 4" },
                })}
                type="number"
                placeholder="Correct option"
                className={`border border-gray-300 p-2 rounded ${errors?.questions?.[index]?.correctOption
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {errors?.questions?.[index]?.correctOption && (
                <p className="text-red-500">
                  {errors?.questions[index]?.correctOption?.message}
                </p>
              )}

              <button
                type="button"
                onClick={() => removeQuiz(index)}
                className="text-red-500 cursor-pointer"
              >
                Remove Question
              </button>
            </div>
          ))}
          <div className="flex items-center gap-3 cursor-pointer"
            onClick={() =>
              appendQuiz({
                question: "",
                options: ["", "", "", ""],
                correctOption: 0,
              })
            }>
            <CgAddR
              className="text-green-500 w-5 h-5"
            />
            <p>Add another question</p>
          </div>
          {/* Duration input */}
          <label>Quiz Duration (in minutes)</label>
          <input
            {...register("duration", {
              required: "Duration is required",
              min: { value: 1, message: "Duration must be at least 1 minute" },
            })}
            type="number"
            placeholder="Quiz Duration"
            className={`border border-gray-300 p-2 rounded ${errors?.duration ? "border-red-500" : ""
              }`}
          />
          {errors?.duration && (
            <p className="text-red-500">{errors?.duration.message}</p>
          )}


          <Button
            value="Submit"
            type="submit"
            additionalStyles="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={async () => {
              // if (isValid) {
              //   // Only navigate if the form is valid
              //   await navigate(`${joinedPath}/create-assignment/${courseID}`);
              // }
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateQuizMolecule;

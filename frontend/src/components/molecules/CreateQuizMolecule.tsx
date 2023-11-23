import React from "react";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { CgAddR, CgCloseR } from "react-icons/cg";
import useAuth from "../../hooks/useAuthHooks";
import Button from "../atoms/Button";
import { useSelector } from "react-redux/es/hooks/useSelector";
import NavBarOrganism from "../organisms/NavBarOrganism";
import { useEffect } from "react";
import useCourse from "../../hooks/useCourseHooks";
import { useLocation } from "react-router-dom";

type Props = {};

type FormValues = {
  questions: {
    question: string;
    options: string[];
    correctOption: number;
  }[];
};

const CreateQuizMolecule = (props: Props) => {
  const { addQuiz } = useCourse();

  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const courseID = pathArray[pathArray.length - 1];

  const state = useSelector((state: any) => state.user);
  const checkString = state.token;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      questions: [
        { question: "", options: ["", "", "", ""], correctOption: 0 },
      ],
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
    <div className="flex flex-col h-screen">
      <NavBarOrganism />
      <div className="mx-auto ml-[80px] mt-[80px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {quizFields.map((field, index) => (
            <div key={field.id} className="flex flex-col space-y-4">
              <input
                {...register(`questions.${index}.question` as const)}
                placeholder={`Question ${index + 1}`}
                className="border border-gray-300 p-2 rounded w-96"
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
                className={`border border-gray-300 p-2 rounded ${
                  errors?.questions?.[index]?.correctOption
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
                Remove
              </button>
            </div>
          ))}
          <CgAddR
            onClick={() =>
              appendQuiz({
                question: "",
                options: ["", "", "", ""],
                correctOption: 0,
              })
            }
            className="text-green-500 cursor-pointer"
          />
          <Button
            value="Submit"
            type="submit"
            additionalStyles="bg-blue-500 text-white p-2 rounded mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateQuizMolecule;

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useCourse from "../../../hooks/useCourseHooks";
import { useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

type Quiz = {
  _id: string;
  question: string;
  options: string[];
  answer: string;
};

const GetQuizMolecule = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const courseID = pathArray[pathArray.length - 1];

  const state = useSelector((state: any) => state.user);
  const checkString = state.token;

  const { getQuiz, submitQuiz, StartQuizCountdown } = useCourse();
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [quizID, setQuizID] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    getQuiz(courseID, checkString)
      .then((data) => {
        if (data.questions && Array.isArray(data.questions)) {
          setQuiz(data.questions);
          setQuizID(data._id);
        } else {
          console.error("Invalid quiz data format");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [answerArray, setAnswerArray] = useState<number[]>([]);
  const [hasCounterStarted, setHasCounterStarted] = useState(false);

  const handleOptionChange = (
    questionId: string,
    optionNumber: number,
    selectedOption: string
  ) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionNumber.toString(),
    }));
  };

  const handleCountdown = async () => {
    setHasCounterStarted(true);
    await StartQuizCountdown(quizID, checkString);
  };

  const handleSubmit = async () => {
    console.log("User Answers:", userAnswers);
    // set the answers as number array
    setAnswerArray(
      Object.values(userAnswers).map((answer) => parseInt(answer))
    );
    await submitQuiz(quizID, answerArray, checkString);
  };

  console.log("ass id from ass atom:", duration);

  return (
    <div className="absolute top-[100px] right-[500px] w-[600px] flex flex-col items-start justify-start p-5">
      {!hasCounterStarted ? (
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCountdown}
        >
          Start countdown
        </button>
      ): null}
      {hasCounterStarted ? (
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl font-semibold">Quiz Questions</h2>
          {quiz?.map((question) => (
            <div key={question._id}>
              <p className="text-lg font-semibold">{question.question}</p>
              <form key={question._id} className="flex flex-col gap-2">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={`option${index}`}
                      name={`question${question._id}`}
                      value={option}
                      className="h-4 w-4"
                      onChange={() =>
                        handleOptionChange(question._id, index + 1, option)
                      }
                      checked={
                        userAnswers[question._id] === (index + 1).toString()
                      }
                    />
                    <label htmlFor={`option${index}`}>{option}</label>
                  </div>
                ))}
              </form>
            </div>
          ))}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit Answers</button>
        </div>
      ) : null}
    </div>
  );
};

export default GetQuizMolecule;

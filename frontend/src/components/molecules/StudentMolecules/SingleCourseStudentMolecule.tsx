import { useLocation } from "react-router-dom";
import AccordionForEnrolledStudentsLesson from "../../atoms/AccordionForEnrolledStudentsLesson";

type Lesson = {
  _id: string;
  title: string;
  videos: { _id: string; videoTitle: string; videoLink: string }[];
  notes: { _id: string; noteTitle: string; noteLink: string }[];
};

type SingleCourseStudentMoleculeProps = {
  lessonID?: string;
};

const SingleCourseStudentMolecule = ({
  lessonID,
}: SingleCourseStudentMoleculeProps) => {
  const location = useLocation();
  const singleCourse = location.state?.singleCourse;

  console.log(lessonID);

  return (
    <div className="w-full">
      <p className="text-md font-semibold mb-4">
        Lessons ({singleCourse?.lessonID?.length || 0})
      </p>
      <div className="flex flex-col gap-3 shadow-lg p-9 rounded-lg">
        {singleCourse?.lessons?.map((lesson: Lesson) => (
          <div>
              <AccordionForEnrolledStudentsLesson
                key={lesson._id}
                heading={lesson.title}
                options={[
                  ...lesson.videos.map((video) => ({
                    title: video.videoTitle,
                    isVideo: true,
                    ID: video._id,
                    videoLink: video.videoLink,
                    videoTitle: video.videoTitle,
                  })),
                  ...lesson.notes.map((note) => ({
                    title: note.noteTitle,
                    isNote: true,
                    ID: note._id,
                    noteLink: note.noteLink,
                    noteTitle: note.noteTitle,
                  })),
                ]}
                lessonID={lesson._id}
              />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCourseStudentMolecule;

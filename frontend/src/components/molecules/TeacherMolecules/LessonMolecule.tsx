import { useLocation } from 'react-router-dom';
import AccordionForLessons from '../../atoms/AccordionForLessons';

type Lesson = {
  _id: string;
  title: string;
  videos: { videoTitle: string; videoLink: string }[];
  notes: { noteTitle: string; noteLink: string }[];
};

type Props = {};

const LessonMolecule = (props: Props) => {
  const location = useLocation();
  const singleCourse = location.state?.singleCourse;


  return (
    <div className='flex flex-col px-10 py-4'>
      <p className="text-md font-semibold mb-4">Lessons ({singleCourse?.lessonID?.length || 0})</p>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {singleCourse?.lessons?.map((lesson: Lesson) => (
          <AccordionForLessons
            key={lesson._id}
            heading={lesson.title}
            options={[
              ...lesson.videos.map((video) => ({ title: video.videoTitle, isVideo: true })),
              ...lesson.notes.map((note) => ({ title: note.noteTitle, isNote: true })),
            ]}
          />

        ))}
      </div>
    </div>
  );
};

export default LessonMolecule;

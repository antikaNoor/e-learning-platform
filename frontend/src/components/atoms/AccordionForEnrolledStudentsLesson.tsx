import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrDocumentDownload } from "react-icons/gr";
import Modal from 'react-modal';
import { CgCloseR } from 'react-icons/cg';
import ReactPlayer from 'react-player';
import { RiDownloadCloudFill } from "react-icons/ri";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import useCourse from '../../hooks/useCourseHooks';
import { useSelector } from 'react-redux';

// ... (previous imports)

type AccordionOptionProps = {
  value: string;
  isVideo: boolean | undefined;
  isNote: boolean | undefined;
  onVideoClick: (videoLink?: string) => void;
  onNoteClick: (noteLink?: string) => void;
  ID?: string;
  videoLink?: string;
  noteLink?: string;
};

export const AccordionOption = ({
  value,
  isVideo,
  isNote,
  onVideoClick,
  onNoteClick,
  ID,
  videoLink,
  noteLink,
}: AccordionOptionProps) => {
  const handleClick = () => {
    if (isVideo) {
      onVideoClick(videoLink);
    } else if (isNote) {
      onNoteClick(noteLink);
    }
  };

  return (
    <div
      className="shadow-sm mt-3 p-2 flex items-center justify-between"
      onClick={handleClick}>
      <div className="flex gap-2 items-center">
        {isVideo && <MdOutlineOndemandVideo className="mr-2" />}
        {isNote && <GrDocumentDownload className="mr-2" />}
        <span>{value}</span>
      </div>
      <div>
        {isVideo && <FaCirclePlay size={24} className="ml-[-300px] text-blue-500" />}
        {isNote && (
          <RiDownloadCloudFill size={24} className="ml-[-300px] text-green-500" />
        )}
      </div>
    </div>
  );
};

type AccordionProps = {
  heading?: string;
  options: {
    title: string;
    isVideo?: boolean;
    isNote?: boolean;
    ID?: string;
    videoLink?: string;
    noteLink?: string;
  }[];
};

const AccordionForEnrolledStudentsLesson = ({
  heading,
  options,
  lessonID,
}: AccordionProps & { lessonID?: string }) => {

  const { completeLesson } = useCourse()
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoLink, setModalVideoLink] = useState<string | undefined>(
    undefined
  );
  const [modalNoteLink, setModalNoteLink] = useState<string | undefined>(
    undefined
  );

  const state = useSelector((state: any) => state.user);
  const checkString = state.token;


  // Function to open the modal
  const openModal = (videoLink?: string) => {
    setIsModalOpen(true);
    setModalVideoLink(videoLink);
  };

  const openNoteModal = (noteLink?: string) => {
    setIsModalOpen(true);
    setModalNoteLink(noteLink);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalVideoLink(undefined);
    setModalNoteLink(undefined);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCompleteLesson = (lessonid: string | undefined) => {
    console.log("Lesson completed", lessonid);
    if (lessonid) {
      completeLesson(lessonid, checkString)
    }
  }

  console.log("lesson id from accordion", lessonID);

  return (
    <div className="w-full transition-all">
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleCollapse}
        style={{ marginBottom: isCollapsed ? "0" : "0.75rem" }}
      >
        {isCollapsed ? <FaCaretUp size={20} /> : <FaCaretDown size={20} />}
        <div className='flex items-center justify-between'>
          <h3 className="text-lg font-semibold ml-2">{heading}</h3>
          {/* <button>View all</button> */}
        </div>
      </div>
      <div
        className={`overflow-hidden transition-max-height ease-in-out duration-200 ${isCollapsed ? "max-h-0" : "max-h-96"
          }`}
      >
        {options.map((option, index) => (
          <div key={index}>
            <AccordionOption
              value={option.title}
              isVideo={option.isVideo}
              isNote={option.isNote}
              onVideoClick={(videoLink) => {
                openModal(videoLink);
              }}
              onNoteClick={(noteLink) => {
                openNoteModal(noteLink);
              }}
              videoLink={option.videoLink}
              noteLink={option.noteLink}
            />
            {/* Conditionally render button for the last item */}
            {index === options.length - 1 && (
              <button onClick={() => handleCompleteLesson(lessonID)}
                className='flex gap-1 bg-green-500 text-white p-1 rounded-full my-1'>
                <FaRegCircleCheck size={24} />
                <span className='mr-2'>Check complete</span>
              </button>
            )}
          </div>
        ))}


      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={true}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          },
          content: {
            width: "800px",
            height: "500px",
            margin: "auto",
            borderRadius: "10px",
            overflow: "hidden",
            background: "white",
            border: "none",
            padding: 0,
            color: "black",
          },
        }}
      >
        <div className="text-center">
          {modalVideoLink && (
            <ReactPlayer
              url={modalVideoLink}
              playing={false}
              controls={true}
              volume={1}
              width="800px"
              height="500px"
            />
          )}
          {modalNoteLink && (
            <p className='mt-[200px]'>
              <a href={modalNoteLink} target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download Note</button>
              </a>
            </p>
          )}
        </div>
        <CgCloseR
          className="text-2xl absolute top-[40px] right-3 text-gray-700 cursor-pointer"
          onClick={closeModal}
        />
      </Modal>
    </div>
  );
};

export default AccordionForEnrolledStudentsLesson;

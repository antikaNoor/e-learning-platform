import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrDocumentDownload } from "react-icons/gr";
import Modal from 'react-modal';
import { CgCloseR } from 'react-icons/cg';
import ReactPlayer from 'react-player';
import { RiDownloadCloudFill } from "react-icons/ri";
import { FaCirclePlay } from "react-icons/fa6";

type AccordionOptionProps = {
    value: string;
    isVideo: boolean | undefined;
    isNote: boolean | undefined;
    onClick: (videoLink?: string) => void;
    ID?: string;
    videoLink?: string; // Add videoLink property
}

export const AccordionOption = ({ value, isVideo, isNote, onClick, ID, videoLink }: AccordionOptionProps) => {
    return (
        <div className="shadow-sm mt-3 p-2 flex items-center justify-between" onClick={() => onClick(videoLink)}>
            <div className='flex gap-2 items-center justify-between'>
                {isVideo && <MdOutlineOndemandVideo className="mr-2" />}
                {isNote && <GrDocumentDownload className="mr-2" />}
                <span>{value}</span>
                <div>
                    {isVideo && <FaCirclePlay size={24} className="ml-2 text-blue-500" />}
                    {isNote && <RiDownloadCloudFill size={24} className="ml-2 text-green-500" />}
                </div>
            </div>
        </div>
    );
};

type AccordionProps = {
    heading?: string;
    options: { title: string; isVideo?: boolean; isNote?: boolean; ID?: string; videoLink?: string }[];
};

const AccordionForEnrolledStudentsLesson = ({ heading, options, lessonID }: AccordionProps & { lessonID?: string }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVideoLink, setModalVideoLink] = useState<string | undefined>(undefined);
    const [modalVideoTitle, setModalVideoTitle] = useState<string | undefined>(undefined);

    // Function to open the modal
    const openModal = (videoLink?: string) => {
        setIsModalOpen(true);
        setModalVideoLink(videoLink);
        // Set modalVideoTitle as needed
        setModalVideoTitle("Video Title");
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setModalVideoLink(undefined);
        setModalVideoTitle(undefined);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="w-full transition-all">
            <div
                className="flex items-center cursor-pointer"
                onClick={toggleCollapse}
                style={{ marginBottom: isCollapsed ? '0' : '0.75rem' }}
            >
                {isCollapsed ? <FaCaretUp size={20} /> : <FaCaretDown size={20} />}
                <h3 className="text-lg font-semibold ml-2">{heading}</h3>
            </div>
            <div
                className={`overflow-hidden transition-max-height ease-in-out duration-200 ${isCollapsed ? 'max-h-0' : 'max-h-96'
                    }`}
            >
                {options.map((option, index) => (
                    <div key={index}>
                        <AccordionOption
                            value={option.title}
                            isVideo={option.isVideo}
                            isNote={option.isNote}
                            onClick={(videoLink) => {
                                openModal(videoLink);
                            }}
                            videoLink={option.videoLink}
                        />
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 50,
                    },
                    content: {
                        width: '800px',
                        height: '600px',
                        margin: 'auto',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                    },
                }}
            >
                <div className='text-center'>
                    <ReactPlayer
                        url={modalVideoLink}
                        playing={false}
                        controls={true}
                        volume={1}
                        width="800px"
                        height="500px"
                    />

                    <p className='text-gray-700'>{modalVideoTitle}</p>
                </div>
                <CgCloseR className='text-2xl absolute top-[40px] right-3 text-gray-700 cursor-pointer' onClick={closeModal} />
            </Modal>


        </div>
    );
};

export default AccordionForEnrolledStudentsLesson;

import { useState } from 'react'
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeLogin } from "../../../redux/slices/UserSlice";
import { BiPowerOff } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FiBookOpen } from "react-icons/fi";
import { LuPlusSquare } from "react-icons/lu";
import CreateCourseMolecule from '../../molecules/TeacherMolecules/CreateCourseMolecule';
import TeacherDashboardMolecule from '../../molecules/TeacherMolecules/TeacherDashboardMolecule';
import TeacherCoursesMolecule from '../../molecules/TeacherMolecules/TeacherCoursesMolecule';
import AdminDashboardMolecule from '../../molecules/AdminMolecules/AdminDashboardMolecule';
import AdminAnalyticsMolecule from '../../molecules/AdminMolecules/AdminAnalyticsMolecule';
import AdminTeacherRequestsMolecule from '../../molecules/AdminMolecules/AdminTeacherRequestsMolecule';
import AdminCourseApprovalRequestsMolecule from '../../molecules/AdminMolecules/AdminCourseApprovalMolecule';
import { LuCopyPlus } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { VscGraph } from "react-icons/vsc";
import { MdOutlinePlayLesson } from "react-icons/md";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { BsBookmarkCheck } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";
import AdminSubscriptionRequestsMolecule from '../../molecules/AdminMolecules/AdminSubscriptionRequestsMolecule';
import { MdOutlineQuiz } from "react-icons/md";
import { MdOutlineAssignment } from "react-icons/md";
import SingleCourseStudentMolecule from '../../molecules/StudentMolecules/SingleCourseStudentMolecule';
import GetQuizMolecule from '../../molecules/StudentMolecules/GetQuizMolecule';
import GetAssignmentMolecule from '../../molecules/StudentMolecules/GetAssignmentMolecule';
import Modal from 'react-modal';
import TrackProgressMolecule from '../../molecules/StudentMolecules/TrackProgressMolecule';

type MyToken = {
    _id: string;
    username: string;
    email: string;
    role: string;
    isVerified: boolean;
    isBanned: boolean;
    teacherID?: string;
    iat: number;
    exp: number;
}

type Props = {
    tabNumber?: Number
}

const SideBarLessonOrganism = (props: Props) => {
    const navigate = useNavigate();

    const state = useSelector((state: any) => state.user);

    const checkString = state.token;

    const decodedToken = jwtDecode<MyToken>(checkString);

    const dispatch = useDispatch();
    // log out
    const logout = () => {
        dispatch(removeLogin());
    }

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber: number) => {
        setActiveTab(Number(tabNumber) || 0);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    if (decodedToken.role === "admin") {
        return (
            <div className='flex pt-10 px-10 gap-20'>
                <div className='flex flex-col gap-3 w-[18rem] p-7 rounded-lg h-[60vh] shadow-md'>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(1)}>
                        <LuLayoutDashboard className='font-bold text-xl' />
                        Dashboard
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(2)}>
                        <IoAnalyticsOutline className='font-bold text-xl' />
                        Analytics
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(3)}>
                        <PiStudent className='font-bold text-xl' />
                        Student Requests
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(4)}>
                        <LiaChalkboardTeacherSolid className='font-bold text-xl' />
                        Teacher Requests
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(5)}>
                        <BsBookmarkCheck className='font-bold text-xl' />
                        Course Requests
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <BiPowerOff className='font-bold text-xl' />
                        <div onClick={logout}>Log out</div>
                    </div>
                </div>

                <div className='flex flex-col w-full'>
                    {activeTab === 1 && <div>
                        <AdminDashboardMolecule />
                    </div>}
                    {activeTab === 2 && <div>
                        <AdminAnalyticsMolecule />
                    </div>}
                    {activeTab === 3 && <div>
                        <AdminSubscriptionRequestsMolecule />
                    </div>}
                    {activeTab === 4 && <div>
                        <AdminTeacherRequestsMolecule />
                    </div>}
                    {activeTab === 5 && <div>
                        <AdminCourseApprovalRequestsMolecule />
                    </div>}
                </div>
            </div>
        )
    }

    if (decodedToken.role === "teacher") {
        return (
            <div className='flex pt-10 px-10 gap-20'>
                <div className='flex flex-col gap-3 w-[13rem] p-7 rounded-lg h-[60vh] shadow-md'>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(1)}>
                        <LuLayoutDashboard className='font-bold text-xl' />
                        Dashboard
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(2)}>
                        <FiBookOpen className='font-bold text-xl' />
                        My Courses
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(3)}>
                        <LuPlusSquare className='font-bold text-xl' />
                        Create Course
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(4)}>
                        <LuCopyPlus className='font-bold text-xl' />
                        Create Lesson
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <BiPowerOff className='font-bold text-xl' />
                        <div onClick={logout}>Log out</div>
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center w-full'>
                    {activeTab === 1 && <div>
                        <TeacherDashboardMolecule />
                    </div>}
                    {activeTab === 2 && <div>
                        <TeacherCoursesMolecule />
                    </div>}
                    {activeTab === 3 && <div>
                        <CreateCourseMolecule />
                    </div>}
                    {activeTab === 4 && <>{navigate(`/login/teacher/teacher-profile/create-lesson/6559df0a57fce2e6fc969da0`)}</>}
                </div>
            </div>
        )
    }

    if (decodedToken.role === "student") {
        return (
            <div className='flex pt-10 px-10 gap-20'>
                <div className='flex flex-col gap-3 w-[19rem] p-7 rounded-lg h-[60vh] shadow-md'>

                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(1)}>
                        <MdOutlinePlayLesson className='font-bold text-xl' />
                        Lessons
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => openModal()}>
                        <VscGraph className='font-bold text-xl' />
                        Track Progress
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
                        }}>
                        <div>
                            <TrackProgressMolecule />
                        </div>
                        <CgCloseR
                            className="text-2xl absolute top-[20px] right-3 text-gray-700 cursor-pointer"
                            onClick={closeModal}
                        />
                    </Modal>

                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(2)}>
                        <MdOutlineQuiz className='font-bold text-xl' />
                        Attend Quiz
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'
                        onClick={() => handleTabClick(3)}>
                        <MdOutlineAssignment className='font-bold text-xl' />
                        Assignment
                    </div>

                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <BiPowerOff className='font-bold text-xl' />
                        <div onClick={logout}>Log out</div>
                    </div>

                </div>

                <div className='flex flex-col justify-center items-center w-full'>
                    {activeTab === 1 && <div>
                        <SingleCourseStudentMolecule />
                    </div>}
                    {activeTab === 2 && <div>
                        <GetQuizMolecule />
                    </div>}
                    {activeTab === 3 && <div>
                        <GetAssignmentMolecule />
                    </div>}
                </div>
            </div>
        )
    }
}

export default SideBarLessonOrganism
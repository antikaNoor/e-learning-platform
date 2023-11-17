import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"
import { useDispatch } from 'react-redux';
import { removeLogin } from "../../redux/slices/UserSlice";
import { HiOutlineHome } from "react-icons/hi2";
import { BiPowerOff } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoAnalyticsOutline } from "react-icons/io5";
import { RiTodoLine } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";
import { LuPlusSquare } from "react-icons/lu";
import { MdOutlineUnsubscribe } from "react-icons/md";

type MyToken = {
    _id: string;
    username: string;
    email: string;
    role: string; // Replace with actual roles
    isVerified: boolean;
    isBanned: boolean;
    teacherID?: string; // This is optional, as it may not exist for all users
    iat: number;
    exp: number;
}

const SidebarMolecule = () => {
    const state = useSelector((state: any) => state.user);

    const checkString = state.token;

    const decodedToken = jwtDecode<MyToken>(checkString);

    const dispatch = useDispatch();
    // log out
    const logout = () => {
        dispatch(removeLogin());
    }

    if (decodedToken.role === "admin") {
        return (
            <div className='max-w-screen-sm'>
                <div className='flex flex-col gap-3 w-[13rem] py-4 rounded-lg h-[70vh] items-center shadow-md'>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <HiOutlineHome className='font-bold text-xl' />
                        Home
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <LuLayoutDashboard className='font-bold text-xl' />
                        Dashboard
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <IoAnalyticsOutline className='font-bold text-xl' />
                        Analytics
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <RiTodoLine className='font-bold text-xl' />
                        Requests
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <BiPowerOff className='font-bold text-xl' />
                        <div onClick={logout}>Log out</div>
                    </div>
                    <hr className='w-40'></hr>
                </div>
            </div>
        );
    }
    if (decodedToken.role === "teacher") {
        return (
            <div className='max-w-screen-sm'>
                <div className='flex flex-col gap-3 w-[13rem] py-4 rounded-lg h-[70vh] items-center shadow-md'>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <HiOutlineHome className='font-bold text-xl' />
                        Home
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <LuLayoutDashboard className='font-bold text-xl' />
                        Dashboard
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <FiBookOpen className='font-bold text-xl' />
                        My Courses
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <LuPlusSquare className='font-bold text-xl' />
                        Create Course
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <BiPowerOff className='font-bold text-xl' />
                        <div onClick={logout}>Log out</div>
                    </div>
                    <hr className='w-40'></hr>
                </div>
            </div>
        );
    }

    if (decodedToken.role === "student") {
        return (
            <div className='max-w-screen-sm'>
                <div className='flex flex-col gap-3 w-[13rem] py-4 rounded-lg h-[70vh] items-center shadow-md'>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <HiOutlineHome className='font-bold text-xl' />
                        Home
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <LuLayoutDashboard className='font-bold text-xl' />
                        Dashboard
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <FiBookOpen className='font-bold text-xl' />
                        My Courses
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <MdOutlineUnsubscribe className='font-bold text-xl' />
                        Subscriptions
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <BiPowerOff className='font-bold text-xl' />
                        <div onClick={logout}>Log out</div>
                    </div>
                    <hr className='w-40'></hr>
                </div>
            </div>
        );
    }
};

export default SidebarMolecule;

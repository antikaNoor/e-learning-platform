import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"
import { useDispatch } from 'react-redux';
import { removeLogin } from "../../redux/slices/UserSlice";
import { BiPowerOff } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoAnalyticsOutline } from "react-icons/io5";
import { RiTodoLine } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";
import { LuPlusSquare } from "react-icons/lu";
import { BsEnvelopeCheck } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineHeart } from "react-icons/hi";

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
                </div>
            </div>
        );
    }
    if (decodedToken.role === "teacher") {
        return (
            <div className='max-w-screen-sm'>
                <div className='flex flex-col gap-3 w-[13rem] py-4 rounded-lg h-[70vh] items-center shadow-md'>
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
                        <LuPlusSquare className='font-bold text-xl' />
                        Create Lesson
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <BiPowerOff className='font-bold text-xl' />
                        <div onClick={logout}>Log out</div>
                    </div>
                </div>
            </div>
        );
    }

    if (decodedToken.role === "student") {
        return (
            <div className='max-w-screen-sm'>
                <div className='flex flex-col gap-4 w-[19rem] py-4 rounded-lg h-[65vh] items-center justify-center shadow-md'>
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
                        <MdOutlineShoppingCart className='font-bold text-xl' />
                        My Cart
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <HiOutlineHeart className='font-bold text-xl' />
                        My Wish-list
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <BsEnvelopeCheck className='font-bold text-xl' />
                        Subscriptions
                    </div>
                    <hr className='w-40'></hr>
                    <div className='flex gap-2 flex-wrap cursor-pointer hover:scale-105'>
                        <BiPowerOff className='font-bold text-xl' />
                        <div onClick={logout}>Log out</div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SidebarMolecule;

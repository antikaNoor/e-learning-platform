import Button from '../atoms/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { IoMdNotifications } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";

const LoginSignUpNavMolecule = () => {

    const navigate = useNavigate();
    const state = useSelector((state: any) => state.user);

    const checkString = state.token;

    if (!checkString) {
        return (
            <div className='flex gap-3'>
                <Button type='button' value="Login" additionalStyles="bg-gray-500 hover:bg-gray-700 text-white w-20"
                    onClick={() => navigate('/login')} />
                <div className="border-l border-solid border-gray-400 h-10"></div>
                <Button type='button' value="Register" additionalStyles="bg-gray-500 hover:bg-gray-700 text-white w-20"
                    onClick={() => navigate('/signup')} />
            </div>
        )
    }
    return (
        <div className='flex gap-5'>
            <AiFillHome className='font-bold text-xl cursor-pointer' />
            <IoMdNotifications className='font-bold text-xl cursor-pointer' />
        </div>
    )

}

export default LoginSignUpNavMolecule
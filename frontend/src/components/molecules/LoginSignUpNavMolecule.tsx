import Button from '../atoms/Button'
import { useNavigate } from 'react-router-dom'

type BoxProps = {
    className?: string;
};

const LoginSignUpNavMolecule = ({ className }: BoxProps) => {

    const navigate = useNavigate();
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

export default LoginSignUpNavMolecule
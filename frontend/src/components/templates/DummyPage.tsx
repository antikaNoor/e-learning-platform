import { useDispatch } from 'react-redux';
import { removeLogin } from "../../redux/slices/UserSlice";
import Button from '../atoms/Button';

const DummyPage = () => {

    const dispatch = useDispatch();
    // log out
    const logOut = () => {
        dispatch(removeLogin());
    }


    return (
        <div>
            <div>DummyPage</div>
            <Button type='button' value="Log out" additionalStyles="w-full mt-4" onClick={logOut}>Log Out</Button>
        </div>
    )
}

export default DummyPage
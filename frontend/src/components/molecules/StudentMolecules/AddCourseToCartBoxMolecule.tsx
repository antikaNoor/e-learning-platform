import { FaCartPlus, FaHeart } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import useSubscription from "../../../hooks/useSubscriptionHooks";
// import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

const AddCourseToCartBoxMolecule = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const singleCourse = location.state?.singleCourse;
    console.log("singleCourse", singleCourse._id);

    const state = useSelector((state: any) => state.user);

    const checkString = state.token;

    const { addToCart, addToWishlist, subscribe } = useSubscription();

    const { thumbnail, lessonID, language } = singleCourse || {};
    console.log(language)

    const handleAddToCart = async () => {
        if (!checkString) {
            navigate("/login");
            return;
        }

        console.log("singleCourse?._id", singleCourse?._id);
        await addToCart(singleCourse?._id, checkString);
    };

    const handleAddToWishlist = async () => {
        if (!checkString) {
            navigate("/login");
            return;
        }

        console.log("singleCourse?._id", singleCourse?._id);
        await addToWishlist(singleCourse?._id, checkString);
    };

    const handleSubscribe = async () => {
        if (!checkString) {
            navigate("/login");
            return;
        }

        console.log("singleCourse?._id", singleCourse?._id);
        await subscribe(singleCourse?._id, checkString);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded">
            {thumbnail && (
                <img
                    src={thumbnail}
                    alt={singleCourse?.title}
                    className="w-full h-48 object-cover mb-4"
                />
            )}
            <div>
                <p>Lessons: {lessonID?.length || 0}</p>
                <p>Language: {language || 'Not specified'}</p>
            </div>
            <div className="mt-4">
                <h4 className="text-lg font-semibold">Material Included</h4>
                <p className="flex items-center">
                    <TiTick className="text-green-500 mr-2" />
                    Videos</p>
                <p className="flex items-center">
                    <TiTick className="text-green-500 mr-2" />
                    Notes</p>
            </div>
            <div className="mt-4 flex flex-col gap-3 items-center">
                <button className="flex justify-center items-center rounded w-full md:w-[350px] h-12 md:h-[40px] bg-blue-500 text-white"
                    onClick={handleAddToCart}>
                    <FaCartPlus className="mr-2" />
                    Add to Cart
                </button>
                <button className="flex justify-center items-center rounded w-full md:w-[350px] h-12 md:h-[40px] bg-gray-300"
                    onClick={handleAddToWishlist}>
                    <FaHeart className="mr-2" />
                    Add to Wishlist
                </button>
                <button className="flex justify-center items-center rounded w-full md:w-[350px] h-12 md:h-[40px] bg-green-500 text-white"
                    onClick={handleSubscribe}>
                    <IoBagCheck className="mr-2" />
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default AddCourseToCartBoxMolecule;

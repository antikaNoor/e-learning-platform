import { FaCartPlus, FaHeart } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useLocation } from "react-router-dom";

const AddCourseToCartBoxMolecule = () => {
    const location = useLocation();
    const singleCourse = location.state?.singleCourse;
    console.log(singleCourse)

    const { thumbnail, lessonID, language } = singleCourse || {};
    console.log(language)

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
                <button className="flex justify-center items-center rounded w-full md:w-[350px] h-12 md:h-[40px] bg-blue-500 text-white">
                    <FaCartPlus className="mr-2" />
                    Add to Cart
                </button>
                <button className="flex justify-center items-center rounded w-full md:w-[350px] h-12 md:h-[40px] bg-gray-300">
                    <FaHeart className="mr-2" />
                    Add to Wishlist
                </button>
                <button className="flex justify-center items-center rounded w-full md:w-[350px] h-12 md:h-[40px] bg-green-500 text-white">
                    <IoBagCheck className="mr-2" />
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default AddCourseToCartBoxMolecule;

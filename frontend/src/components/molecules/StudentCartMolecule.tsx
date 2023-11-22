import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';
import { useSelector } from 'react-redux';
import Rating from 'react-rating-stars-component';
import { BsFillEnvelopeCheckFill } from "react-icons/bs";
import { IoRemoveCircle } from "react-icons/io5";
import useSubscription from '../../hooks/SubscriptionHooks';

type Course = {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    requirement: string[];
    lessonID: string[];
    rating: number;
    reviews: string[];
    language: string;
}

type CartData = {
    _id: string;
    studentID: string;
    courseID: Course[];
}

const StudentCartMolecule = () => {
    const [cartData, setCartData] = useState<CartData | null>(null);
    const state = useSelector((state: any) => state.user);
    const checkString = state.token;

    const { removeFromCart } = useSubscription();

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axiosInstance.get(
                    '/cart/get-your-cart',
                    {
                        headers: {
                            'Authorization': `Bearer ${checkString}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setCartData(response.data.data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [checkString]);

    const handleRemoveFromCart = async (courseID: string) => {
        try {
            if (cartData?._id) {
                await removeFromCart(cartData._id, courseID, checkString);

                const updatedCartData = { ...cartData };
                updatedCartData.courseID = updatedCartData.courseID.filter(course => course._id !== courseID);
                setCartData(updatedCartData);
            } else {
                console.error('Cart ID is undefined.');
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };


    return (
        <div className="mx-auto mt-8">
            {cartData ? (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cartData.courseID.map((course) => (
                            <div key={course._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                                {course.thumbnail && (
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-54 object-cover transition-transform transform hover:scale-105 duration-300"
                                    />
                                )}
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h3
                                            className="text-xl font-bold mb-2 cursor-pointer"
                                            onClick={() => {
                                                console.log("kuddus");
                                                // Handle click event if needed
                                            }}
                                        >
                                            {course.title}
                                        </h3>

                                    </div>

                                    <p className="text-gray-600 mb-1">{course.description}</p>
                                    <p>
                                        <strong>Language:</strong> {course.language || 'N/A'}
                                    </p>
                                    <p>
                                        <strong>Requirements:</strong> {course.requirement?.join(', ') || 'N/A'}
                                    </p>
                                    <span className="text-gray-700">
                                        {course.lessonID && `Lessons: ${course.lessonID.length}`}
                                    </span>
                                    <div className="mt-1">
                                        <Rating
                                            count={5}
                                            value={course.rating || 0}
                                            size={32}
                                            edit={false}
                                            activeColor="#FFD700"
                                            color="#A0A0A0"
                                            className="rounded-full"
                                        />
                                        <span className="text-gray-700">
                                            {course.reviews && `(${course.reviews.length} reviews)`}
                                        </span>
                                        <div className="mt-3 flex justify-between sm:p-2 sm:rounded sm:cursor-pointer sm:border ">
                                            <div className="flex gap-3 items-center pr-3">
                                                <BsFillEnvelopeCheckFill className="text-3xl text-green-700 w-5 h-5" />
                                                <span className="text-green-700">Subscribe</span>
                                            </div>
                                            <div className="flex gap-3 items-center pr-3"
                                                onClick={() => {
                                                    console.log("courseID", course._id);
                                                    console.log("cartID", cartData._id);
                                                    handleRemoveFromCart(course._id);
                                                }}>
                                                <IoRemoveCircle className="text-3xl text-red-700 w-5 h-5" />
                                                <span className="text-red-700">Remove</span>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='flex flex-col items-center ml-[-200px]'>
                    <img
                        className='w-[100px] h-[100px] mx-auto opacity-50'
                        src='/public/empty-cart.png'></img>
                    <p className='text-xl font-bold text-gray-600'>No courses in cart</p>
                </div>
            )}
        </div>
    );
};

export default StudentCartMolecule;

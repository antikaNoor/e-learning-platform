import { useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import Rating from 'react-rating-stars-component';
import { format } from 'date-fns';
import { RiUserStarLine } from "react-icons/ri";
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';
import { useSelector } from 'react-redux';

type Review = {
  _id: string;
  courseID: string;
  userID: {
    _id: string;
    username: string;
    email: string;
  };
  rating: number;
  text: string;
  likes: any[];
  dislikes: any[];
  createdAt: string;
};

type SingleCourse = {
  _id?: string;
  reviews?: Review[];
  // Add other properties from SingleCourse as needed
};

const ReviewMolecule = () => {
  const location = useLocation();
  const singleCourse = location.state?.singleCourse as SingleCourse;

  const state = useSelector((state: any) => state.user);
  const checkString = state.token;

  const [myReviews, setMyReviews] = useState<Review | null>(null);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axiosInstance.get(
          `/review/get-your-review/${singleCourse._id}`,
          {
            headers: {
              'Authorization': `Bearer ${checkString}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setMyReviews(response.data);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchReviewData();
  }, [checkString]);

  console.log('my review:', myReviews);

  if (!checkString) {
    return (
      <div className='flex flex-col px-10 py-4'>
        <p className="text-md font-semibold mb-4">Reviews ({singleCourse?.reviews?.length || 0})</p>
        <div>
          {singleCourse?.reviews?.map((review: Review, index: number) => (
            <div key={index} className='shadow-lg rounded-lg p-5'>
              <div className='flex items-center gap-3'>
                <RiUserStarLine size={24} />
                <div>
                  <p>{review.userID?.username}</p>
                  <p className='text-gray-500 text-sm'>{formatDate(review.createdAt)}</p>
                </div>
              </div>
              <div className='flex items-center ml-7'>
                <Rating
                  count={5}
                  value={review.rating}
                  edit={false}
                  size={24}
                  emptyIcon={<FaRegStar />}
                  fullIcon={<FaStar />}
                  color1={'#f2f2f2'}
                  color2={'#FFD700'}
                />

                <p>({review.rating}/5)</p>
              </div>
              {/* <div className='flex items-center gap-3 ml-7'> */}
              {/* <BsChatLeftText size={20} /> */}
              <p className='ml-8 text-gray-800'>{review.text}</p>
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    // <div className='flex flex-col px-10 py-4'>
    //   <p className="text-md font-semibold mb-4">Reviews ({singleCourse?.reviews?.length || 0})</p>
    //   <div>
    //     <div className='shadow-lg rounded-lg p-5'>
    //       <div className='flex items-center gap-3'>
    //         <RiUserStarLine size={24} />
    //         <div>
    //           <p>{myReviews?.userID?.username}</p>
    //           <p className='text-gray-500 text-sm'>{formatDate(myReviews?.createdAt || '')}</p>
    //         </div>
    //       </div>
    //       <div className='flex items-center ml-7'>
    //         <Rating
    //           count={5}
    //           value={myReviews?.rating}
    //           edit={false}
    //           size={24}
    //           emptyIcon={<FaRegStar />}
    //           fullIcon={<FaStar />}
    //           color1={'#f2f2f2'}
    //           color2={'#FFD700'}
    //         />

    //         <p>({myReviews?.rating}/5)</p>

    //       </div>
    //       {/* <div className='flex items-center gap-3 ml-7'> */}
    //       {/* <BsChatLeftText size={20} /> */}
    //       <p className='ml-8 text-gray-800'>{myReviews?.text}</p>
    //       {/* </div> */}
    //     </div>
    //     {singleCourse?.reviews?.map((review: Review, index: number) => (
    //       <div key={index} className='shadow-lg rounded-lg p-5'>
    //         <div className='flex items-center gap-3'>
    //           <RiUserStarLine size={24} />
    //           <div>
    //             <p>{review.userID?.username}</p>
    //             <p className='text-gray-500 text-sm'>{formatDate(review.createdAt)}</p>
    //           </div>
    //         </div>
    //         <div className='flex items-center ml-7'>
    //           <Rating
    //             count={5}
    //             value={review.rating}
    //             edit={false}
    //             size={24}
    //             emptyIcon={<FaRegStar />}
    //             fullIcon={<FaStar />}
    //             color1={'#f2f2f2'}
    //             color2={'#FFD700'}
    //           />

    //           <p>({review.rating}/5)</p>
    //         </div>
    //         {/* <div className='flex items-center gap-3 ml-7'> */}
    //         {/* <BsChatLeftText size={20} /> */}
    //         <p className='ml-8 text-gray-800'>{review.text}</p>
    //         {/* </div> */}
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div>baeifbws</div>
  )
};


export default ReviewMolecule;

import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import Rating from 'react-rating-stars-component';

const SingleCourseHeadingMolecule = () => {
    const location = useLocation();
    const singleCourse = location.state?.singleCourse;
    const imgURL = "https://images.unsplash.com/photo-1619252584172-a83a949b6efd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    console.log(singleCourse)
    return (
        <div className='bg-cover bg-center bg-no-repeat w-full p-4 h-[400px]' style={{ backgroundImage: `url(${imgURL})` }}>
            <div className='flex flex-col gap-3 justify-center ml-10 mt-[100px]'>
                <p>{singleCourse?.topicID}</p>
                <h1 className='text-3xl font-bold'>{singleCourse?.title}</h1>
                <div className="flex items-center space-x-4">
                    <LiaChalkboardTeacherSolid className='w-6 h-6' />
                    <div>
                        <p>{singleCourse?.teacherID?.username}</p>
                        <p>Last update {singleCourse && format(new Date(singleCourse.createdAt), 'MMMM dd, yyyy')}</p>
                    </div>
                </div>
                <div className='flex items-center space-x-3'>
                    <p>{singleCourse?.rating}/5</p>
                    <Rating
                        count={5}
                        value={singleCourse?.rating || 0}
                        size={24}
                        edit={false}
                        activeColor="#FFD700"
                        color="#A0A0A0"
                        className="rounded-full"
                    />
                    <p className="text-gray-700">
                        {singleCourse?.reviews && `(${singleCourse.reviews.length})`}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default SingleCourseHeadingMolecule;

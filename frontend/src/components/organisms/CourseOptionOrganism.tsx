import { useState } from 'react'
import OverviewMolecule from '../molecules/OverviewMolecule';
import ReviewMolecule from '../molecules/ReviewMolecule';
import LessonMolecule from '../molecules/LessonMolecule';
import ForumMolecule from '../molecules/ForumMolecule';

type Props = {
    tabNumber?: Number
}

const CourseOptionOrganism = (props: Props) => {

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber: number) => {
        setActiveTab(Number(tabNumber) || 0);
    };

    return (
        <div className="lg:mr-[500px]">
            <div className="flex mb-4">
                <div
                    className={`cursor-pointer py-2 px-4 border-b-2 ${activeTab === 1 ? 'border-blue-500' : 'border-transparent'
                        }`}
                    onClick={() => handleTabClick(1)}
                >
                    Overview
                </div>
                <div
                    className={`cursor-pointer py-2 px-4 border-b-2 ${activeTab === 2 ? 'border-blue-500' : 'border-transparent'
                        }`}
                    onClick={() => handleTabClick(2)}
                >
                    Lessons
                </div>
                <div
                    className={`cursor-pointer py-2 px-4 border-b-2 ${activeTab === 3 ? 'border-blue-500' : 'border-transparent'
                        }`}
                    onClick={() => handleTabClick(3)}
                >
                    Reviews
                </div>
                <div
                    className={`cursor-pointer py-2 px-4 border-b-2 ${activeTab === 4 ? 'border-blue-500' : 'border-transparent'
                        }`}
                    onClick={() => handleTabClick(4)}
                >
                    Forum
                </div>
            </div>

            <div>
                {activeTab === 1 && <div>
                    <OverviewMolecule />
                </div>}
                {activeTab === 2 && <div>
                    <LessonMolecule />
                </div>}
                {activeTab === 3 && <div>
                    <ReviewMolecule />
                </div>}
                {activeTab === 4 && <div>
                    <ForumMolecule />
                </div>}
            </div>
        </div>
    )
}

export default CourseOptionOrganism

// import { Link } from "react-router-dom"
// import { useLocation, useNavigate } from "react-router-dom";

// type Props = {}

// const CourseOptionsMolecule = (props: Props) => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const singleCourse = location.state?.singleCourse;
//     console.log("from option molecule", singleCourse)
//     return (
//         <div>
//             <div
//                 onClick={() => {
//                     navigate(`/single-course-overview/${singleCourse?._id}`, {
//                         state: {
//                             singleCourse
//                         }
//                     })
//                 }}
//             >Overview</div>
//             <div
//                 onClick={() => {
//                     navigate(`/single-course-lessons/${singleCourse?._id}`, {
//                         state: {
//                             singleCourse
//                         }
//                     })
//                 }}
//             >Lessons</div>
//             <div
//                 onClick={() => {
//                     navigate(`/single-course-reviews/${singleCourse?._id}`, {
//                         state: {
//                             singleCourse
//                         }
//                     })
//                 }}
//             >Reviews</div>
//             <div
//                 onClick={() => {
//                     navigate(`/single-course-forum/${singleCourse?._id}`, {
//                         state: {
//                             singleCourse
//                         }
//                     })
//                 }}
//             >Forum</div>
//         </div>
//     )
// }

// export default CourseOptionsMolecule
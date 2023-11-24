// import NavBarOrganism from '../organisms/NavBarOrganism'
// import SideBarOrganism from '../organisms/SideBarOrganism'

// type Props = {}

// const StudentProfilePage = (props: Props) => {
//     return (
//         <div>
//             <NavBarOrganism />
//             <SideBarOrganism />
//         </div>
//     )
// }

// export default StudentProfilePage

import React, { useEffect, useState } from 'react';
import NavBarOrganism from '../../organisms/CommonOrganisms/NavBarOrganism';
import GetCoursesOrganism from '../../organisms/CommonOrganisms/GetCoursesOrganism';
import LoaderComponent from '../../atoms/Loader';
import SideBarOrganism from '../../organisms/CommonOrganisms/SideBarOrganism';
import SideBarLessonOrganism from '../../organisms/CommonOrganisms/SideBarLessonOrganism';

type Props = {};

const SingleCourseStudentPage = (props: Props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a 2-second delay
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div>
            <NavBarOrganism />
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <LoaderComponent />
                </div>
            ) : (
                <SideBarLessonOrganism />
            )}
        </div>
    );
};

export default SingleCourseStudentPage;

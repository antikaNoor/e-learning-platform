import { useEffect, useState } from 'react';
import NavBarOrganism from '../../organisms/CommonOrganisms/NavBarOrganism';
import SingleCourseOrganism from '../../organisms/CommonOrganisms/SingleCourseOrganism';
import Loader from '../../atoms/Loader';
import CourseOptionOrganism from '../../organisms/CommonOrganisms/CourseOptionOrganism';

type Props = {};

const SingleCoursePage = (props: Props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div>
            <NavBarOrganism />
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <Loader />
                </div>
            ) : (
                <div className="relative">
                    <SingleCourseOrganism />
                    <CourseOptionOrganism />
                </div>
            )}
        </div>
    );
};

export default SingleCoursePage;

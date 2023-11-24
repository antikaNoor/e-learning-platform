import React, { useEffect, useState } from 'react';
import NavBarOrganism from '../../organisms/CommonOrganisms/NavBarOrganism';
import GetCoursesOrganism from '../../organisms/CommonOrganisms/GetCoursesOrganism';
import LoaderComponent from '../../atoms/Loader';
import SideBarOrganism from '../../organisms/CommonOrganisms/SideBarOrganism';

type Props = {};

const StudentProfilePage = (props: Props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
                <SideBarOrganism />
            )}
        </div>
    );
};

export default StudentProfilePage;

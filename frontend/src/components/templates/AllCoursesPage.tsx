import React, { useEffect, useState } from 'react';
import NavBarOrganism from '../organisms/NavBarOrganism';
import GetCoursesOrganism from '../organisms/GetCoursesOrganism';
import LoaderComponent from '../atoms/Loader'; 

type Props = {};

const AllCoursesPage = (props: Props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a 2-second delay
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <NavBarOrganism />
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <LoaderComponent />
                </div>
            ) : (
                <GetCoursesOrganism />
            )}
        </div>
    );
};

export default AllCoursesPage;

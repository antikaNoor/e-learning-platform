import NavBarOrganism from '../organisms/NavBarOrganism'
import SideBarOrganism from '../organisms/SideBarOrganism'
import LoaderComponent from '../atoms/Loader'
import { useEffect, useState } from 'react'

type Props = {}

const TeacherProfilePage = (props: Props) => {

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
    )
}

export default TeacherProfilePage
import NavBarOrganism from '../organisms/NavBarOrganism'
import GetCoursesOrganism from '../organisms/GetCoursesOrganism'

type Props = {}

const AllCoursesPage = (props: Props) => {
    return (
        <div>
            <NavBarOrganism />
            <h3 className="text-3xl text-center font-bold mt-8">All Courses</h3>
            <GetCoursesOrganism />
        </div>
    )
}

export default AllCoursesPage
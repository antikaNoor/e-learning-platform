import NavBarOrganism from '../organisms/NavBarOrganism'
import GetCoursesOrganism from '../organisms/GetCoursesOrganism'
import SearchOrganism from '../organisms/SearchOrganism'

type Props = {
    onSearch: () => void;
}

const AllCoursesPage = (props: Props) => {
    return (
        <div>
            <NavBarOrganism />
            <SearchOrganism onSearch={props.onSearch} />
            <GetCoursesOrganism />
        </div>
    )
}

export default AllCoursesPage
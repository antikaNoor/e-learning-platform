import StudentProfileOrganism from '../organisms/StudentProfileOrganism'
import NavBarOrganism from '../organisms/NavBarOrganism'

type Props = {}

const StudentProfilePage = (props: Props) => {
    return (
        <div>
            <NavBarOrganism />
            <StudentProfileOrganism />
        </div>
    )
}

export default StudentProfilePage
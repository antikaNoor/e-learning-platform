import NavBarOrganism from '../organisms/NavBarOrganism'
import SideBarOrganism from '../organisms/SideBarOrganism'

type Props = {}

const TeacherProfilePage = (props: Props) => {
    return (
        <div>
            <NavBarOrganism />
            <SideBarOrganism />
        </div>
    )
}

export default TeacherProfilePage
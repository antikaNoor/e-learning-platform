import NavBarOrganism from '../organisms/NavBarOrganism'
import SideBarOrganism from '../organisms/SideBarOrganism'

type Props = {}

const AdminProfilePage = (props: Props) => {
    return (
        <div>
            <NavBarOrganism />
            <SideBarOrganism />
        </div>
    )
}

export default AdminProfilePage
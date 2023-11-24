import NavBarOrganism from '../../organisms/CommonOrganisms/NavBarOrganism'
import SideBarOrganism from '../../organisms/CommonOrganisms/SideBarOrganism'

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
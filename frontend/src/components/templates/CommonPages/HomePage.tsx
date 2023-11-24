import AllCategoryOrganism from "../../organisms/CommonOrganisms/AllCategoryOrganism"
import NavBarOrganism from "../../organisms/CommonOrganisms/NavBarOrganism"

type Props = {}

const HomePage = (props: Props) => {
    return (
        <div>
            <NavBarOrganism />
            <AllCategoryOrganism />
        </div>
    )
}

export default HomePage
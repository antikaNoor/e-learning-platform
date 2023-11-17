import AllCategoryOrganism from "../organisms/AllCategoryOrganism"
import NavBarOrganism from "../organisms/NavBarOrganism"

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
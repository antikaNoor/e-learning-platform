import SearchBar from '../atoms/SearchBar'
import Dropdown from '../atoms/Dropdown'

type Props = {}

const SearchAndDropdownMolecule = (props: Props) => {
    return (
        <div className="mt-6 p-5 flex flex-col gap-3 md:flex items-center justify-between focus:border-none">
            <SearchBar />
            <Dropdown />
        </div>
    )
}

export default SearchAndDropdownMolecule
import SearchAndDropdownMolecule from '../molecules/SearchAndDropdownMolecule'

type Props = {
    onSearch: () => void // Replace 'void' with the return type of the onSearch function if applicable
}

const SearchOrganism = (props: Props) => {
    return (
        <div>
            <SearchAndDropdownMolecule onSearch={props.onSearch} />
        </div>
    )
}

export default SearchOrganism
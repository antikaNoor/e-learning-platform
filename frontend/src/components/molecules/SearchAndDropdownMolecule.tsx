import SearchBar from '../atoms/SearchBar'
import Dropdown from '../atoms/Dropdown'
import useCourse from '../../hooks/useCourseHooks'

type Props = {
    setCourses: any
}

const SearchAndDropdownMolecule = ({ setCourses }: Props) => {
    const { searchQuery, handleSearchQuery, courses } = useCourse()

    // const [courses, setCourses] = 
    console.log("courses from molecule", courses)
    setCourses(courses)
    return (
        <div className="mt-6 p-5 flex flex-col gap-3 md:flex items-center justify-between focus:border-none">
            <SearchBar type="text" placeholder="Search courses" value={searchQuery} onChange={handleSearchQuery} />
            <Dropdown />
        </div>
    )
}

export default SearchAndDropdownMolecule
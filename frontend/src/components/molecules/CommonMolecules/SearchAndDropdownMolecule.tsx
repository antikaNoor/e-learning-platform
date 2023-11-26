import SearchBar from "../../atoms/SearchBar";
import Dropdown from "../../atoms/Dropdown";
import useCourse from "../../../hooks/useCourseHooks";

type Props = {
  setCourses: any;
};

const SearchAndDropdownMolecule = ({ setCourses }: Props) => {
  const {
    searchQuery,
    handleSearchQuery,
    courses,
    handleSortParam,
    sortParam,
  } = useCourse();

  // const [courses, setCourses] =
  console.log("courses from molecule", courses);
  setCourses(courses);
  return (
    <div className="mt-6 p-5 flex flex-col gap-3 md:flex items-center justify-between focus:border-none">
      <SearchBar
        type="text"
        placeholder="Search courses"
        value={searchQuery}
        onChange={handleSearchQuery}
      />
      <Dropdown
        title="Sort by"
        options={[
            { value: "ratingAsc", label: "Rating (Ascending)" },
            { value: "ratingDesc", label: "Rating (Descending)" },
            { value: "updatedAtAsc", label: "Updated At (Ascending)" },
            { value: "updatedAtDesc", label: "Updated At (Descending)" },
          ]}
        selectedOption={sortParam}
        onChange={handleSortParam}
      />
    </div>
  );
};

export default SearchAndDropdownMolecule;

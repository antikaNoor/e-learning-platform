// GetCoursesOrganism component

import FilterCourseMolecule from '../molecules/FilterCourseMolecule';
import GetCoursesMolecule from '../molecules/GetCoursesMolecule';
import SearchAndDropdownMolecule from '../molecules/SearchAndDropdownMolecule';

const optionsData = [
    { heading: 'Rating', options: ["5 stars", "4 stars", "3 stars", "2 stars", "1 star"] },
    { heading: 'Difficulty', options: ["Beginner", "Intermediate", "Advanced"] },
    // Add more objects as needed
];

const GetCoursesOrganism = () => {
    return (

        <div>
            <SearchAndDropdownMolecule />
            <div className="my-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row">
                <FilterCourseMolecule data={optionsData} />
                {/* Other components or content */}
                <GetCoursesMolecule />
            </div>
        </div>
    );
};

export default GetCoursesOrganism;

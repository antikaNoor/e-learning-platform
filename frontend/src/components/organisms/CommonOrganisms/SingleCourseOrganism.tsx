import SingleCourseHeadingMolecule from '../../molecules/CommonMolecules/SingleCourseHeadingMolecule';
import AddCourseToCartBoxMolecule from '../../molecules/StudentMolecules/AddCourseToCartBoxMolecule';
import CourseOptionsMolecule from '../../molecules/CommonMolecules/OverviewMolecule';

type Props = {};

const SingleCourseOrganism = (props: Props) => {
    return (
        <div className='sm:flex flex-col md:flex'>
            <div className='lg:mx-auto lg:w-full'>
                <SingleCourseHeadingMolecule />
            </div>
            <div className='lg:fixed lg:top-[120px] lg:right-[100px] lg:max-w-[380px]'>
                <AddCourseToCartBoxMolecule />
            </div>
        </div>
    );
};

export default SingleCourseOrganism;
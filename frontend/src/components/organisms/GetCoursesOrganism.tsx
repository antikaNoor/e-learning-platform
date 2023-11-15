import GetCoursesMolecule from '../molecules/GetCoursesMolecule'

type Props = {}

const GetCoursesOrganism = (props: Props) => {
    return (
        <div>
            <h2 className='text-3xl font-bold py-10 px-0 text-center'>Courses</h2>
            <GetCoursesMolecule />
        </div>
    )
}

export default GetCoursesOrganism
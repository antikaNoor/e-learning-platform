import React from 'react'
import StudentEnrolledCoursesMolecule from '../molecules/StudentEnrolledCoursesMolecule'
import SingleCourseStudentMolecule from '../molecules/SingleCourseStudentMolecule'

type Props = {}

const SingleCourseStudentOrganism = (props: Props) => {
    return (
        <div className='sm:flex flex-col md:flex'>
            <SingleCourseStudentMolecule />
        </div>
    )
}

export default SingleCourseStudentOrganism
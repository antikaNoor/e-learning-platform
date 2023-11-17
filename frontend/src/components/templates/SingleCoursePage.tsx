import React from 'react'
import NavBarOrganism from '../organisms/NavBarOrganism'
import SingleCourseOrganism from '../organisms/SingleCourseOrganism'

type Props = {}

const SingleCoursePage = (props: Props) => {
    return (
        <div>
            <NavBarOrganism />
            {/* <h3 className="text-3xl text-center font-bold mt-8">Single Course</h3> */}
            <SingleCourseOrganism />
        </div>
    )
}

export default SingleCoursePage
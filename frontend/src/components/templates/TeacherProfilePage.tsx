import React from 'react'
import TeacherProfileOrganism from '../organisms/TeacherProfileOrganism'
import NavBarOrganism from '../organisms/NavBarOrganism'

type Props = {}

const TeacherProfilePage = (props: Props) => {
    return (
        <div>
            <NavBarOrganism />
            <TeacherProfileOrganism />
        </div>
    )
}

export default TeacherProfilePage
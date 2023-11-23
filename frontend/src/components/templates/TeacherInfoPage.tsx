import React from 'react'
import NavBarOrganism from '../organisms/NavBarOrganism'
import TeacherInfoMolecule from '../molecules/TeacherInfoMolecule'

type Props = {}

const TeacherInfoPage = (props: Props) => {
    return (
        <div>
            <NavBarOrganism />
            <TeacherInfoMolecule />
        </div>
    )
}

export default TeacherInfoPage
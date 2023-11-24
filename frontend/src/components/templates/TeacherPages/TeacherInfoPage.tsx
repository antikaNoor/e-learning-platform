import React from 'react'
import NavBarOrganism from '../../organisms/CommonOrganisms/NavBarOrganism'
import TeacherInfoMolecule from '../../molecules/TeacherMolecules/TeacherInfoMolecule'

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
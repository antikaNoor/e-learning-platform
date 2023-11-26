import React from 'react'
import NavBarOrganism from '../CommonOrganisms/NavBarOrganism'
import CreateLessonMolecule from '../../molecules/TeacherMolecules/CreateLessonMolecule'

type Props = {}

const CreateLessonOrganism = (props: Props) => {
    return (
        <div className='flex flex-col gap-2'>
            {/* <NavBarOrganism /> */}
            <CreateLessonMolecule />
        </div>
    )
}

export default CreateLessonOrganism
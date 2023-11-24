import React from 'react'
import NavBarOrganism from '../../organisms/CommonOrganisms/NavBarOrganism'
import AssignmentAtom from '../../atoms/AssignmentAtom'

type Props = {}

const CreateAssignmentMolecule = (props: Props) => {

    return (
        <div className="flex flex-col h-screen">
            <NavBarOrganism />
            <div className='mt-[40px] flex flex-col gap-3 justify-center items-center'>
                <p className='text-3xl font-bold'>Create Assignment</p>
                <p className='text-lg'>Upload a file with your question</p>
                <AssignmentAtom />
            </div>
        </div>
    )
}

export default CreateAssignmentMolecule
// import React from 'react'
import ResetPasswordBoxMolecule from '../molecules/ResetPasswordBoxMolecule'
import WelcomeBoxMolecule from '../molecules/WelcomeBoxMolecule'

const ResetPasswordOrganism = ({}) => {
    return (
        <div className="sm:flex justify-center items-center h-screen">
            <ResetPasswordBoxMolecule className="flex-1" />
            <WelcomeBoxMolecule className="flex-1" />
        </div>
    );
};

export default ResetPasswordOrganism;
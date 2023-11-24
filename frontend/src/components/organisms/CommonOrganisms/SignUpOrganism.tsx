// import React from 'react'
import SignUpBoxMolecule from '../../molecules/CommonMolecules/SignUpBoxMolecule'
import WelcomeBoxMolecule from '../../molecules/CommonMolecules/WelcomeBoxMolecule'

const SignUpOrganism = ({ }) => {
    return (
        <div className="sm:flex justify-center items-center h-screen">
            <WelcomeBoxMolecule className="flex-1" />
            <SignUpBoxMolecule className="flex-1" />
        </div>
    );
};

export default SignUpOrganism;
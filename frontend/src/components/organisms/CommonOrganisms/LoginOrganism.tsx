// import React from 'react'
import LoginBoxMolecule from '../../molecules/CommonMolecules/LoginBoxMolecule'
import WelcomeBoxMolecule from '../../molecules/CommonMolecules/WelcomeBoxMolecule'

const LoginOrganism = ({ }) => {
    return (
        <div className="sm:flex justify-center items-center h-screen">
            <LoginBoxMolecule className="flex-1" />
            <WelcomeBoxMolecule className="flex-1" />
        </div>
    );
};

export default LoginOrganism;
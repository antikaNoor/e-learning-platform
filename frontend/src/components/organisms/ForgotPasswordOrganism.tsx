// import React from 'react'
import ForgotPasswordBoxMolecule from '../molecules/ForgotPasswordBoxMolecule'
import WelcomeBoxMolecule from '../molecules/WelcomeBoxMolecule'

const LoginOrganism = ({}) => {
    return (
        <div className="sm:flex justify-center items-center h-screen">
            <ForgotPasswordBoxMolecule className="flex-1" />
            <WelcomeBoxMolecule className="flex-1" />
        </div>
    );
};

export default LoginOrganism;
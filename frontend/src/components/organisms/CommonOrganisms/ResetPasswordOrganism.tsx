// import React from 'react'
import WelcomeBoxMolecule from "../../molecules/CommonMolecules/WelcomeBoxMolecule";
import ResetPasswordBoxMolecule from "../../molecules/CommonMolecules/ResetPasswordBoxMolecule";

const ResetPasswordOrganism = ({ }) => {
    return (
        <div className="sm:flex justify-center items-center h-screen">
            <ResetPasswordBoxMolecule className="flex-1" />
            <WelcomeBoxMolecule className="flex-1" />
        </div>
    );
};

export default ResetPasswordOrganism;
import LinksNavMolecule from '../molecules/LinksNavMolecule';
import LogoNavMolecule from '../molecules/LogoNavMolecule';
import RightNavMolecule from '../molecules/RightNavMolecule';

const NavBarOrganism = () => {

    return (
        <div className='bg-white w-full shadow-md sticky top-0 z-10'>
            <div className='flex flex-col gap-0 items-center md:flex-row md:justify-between md:items-center container mx-auto p-4'>
                <LogoNavMolecule />
                <div className='flex mt-4 gap-20 md:mt-0 '>
                    <LinksNavMolecule />
                    <RightNavMolecule />
                </div>
            </div>
        </div>
    );
};

export default NavBarOrganism;

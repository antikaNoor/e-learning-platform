import { Link } from 'react-router-dom'

type BoxProps = {
    className?: string;
};

const LogoNavMolecule = ({ className }: BoxProps) => {
    return (
        <div>
            <div>
                <Link className='link' to="/"><img className='h-16 w-16' src='/logo.png'></img></Link>
            </div>
        </div>
    )
}

export default LogoNavMolecule
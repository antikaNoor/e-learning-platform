import { Link } from 'react-router-dom'

type BoxProps = {
    className?: string;
};

const LinksNavMolecule = ({ className }: BoxProps) => {
    return (
        <div className='flex gap-6 flex-wrap'>
            <div>
                <Link className='link' to="/courses">Courses</Link>
            </div>
            <div>
                <Link className='link' to="/categories">Categories</Link>
            </div>
            <div>
                <Link className='link' to="/about">About</Link>
            </div>
            <div>
                <Link className='link' to="/contact">Contact</Link>
            </div>
        </div>
    )
}

export default LinksNavMolecule
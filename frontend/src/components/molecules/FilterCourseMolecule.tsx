// FilterCourseMolecule component

import Accordion from '../atoms/Accordion';

type Option = {
    heading: string;
    options: string[];
};

type Props = {
    data: Option[];
};

const FilterCourseMolecule = ({ data }: Props) => {
    return (
        <div className="flex flex-col gap-3 mt-6 p-7 shadow-lg sticky">
            {data.map(({ heading, options }, index) => (
                <Accordion key={index} heading={heading} options={options} />
            ))}
        </div>
    );
};

export default FilterCourseMolecule;

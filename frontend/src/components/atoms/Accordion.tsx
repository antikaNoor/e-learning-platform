import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';

type AccordionOptionProps = {
    value: string;
};

export const AccordionOption = ({ value }: AccordionOptionProps) => {
    return (
        <div className="flex items-center">
            <input type="checkbox" className="mr-3 h-4 w-4" />
            <span>{value}</span>
        </div>
    );
};

type AccordionProps = {
    heading?: string;
    options: string[];
};

const Accordion = ({ heading, options }: AccordionProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="transition-all">
            <div
                className="flex items-center cursor-pointer"
                onClick={toggleCollapse}
                style={{ marginBottom: isCollapsed ? '0' : '0.75rem' }}
            >
                {isCollapsed ? <FaCaretUp size={20} /> : <FaCaretDown size={20} />}
                <h3 className="text-lg font-semibold mb-2 ml-2">{heading}</h3>
            </div>
            <div
                className={`overflow-hidden transition-max-height ease-in-out duration-200 ${isCollapsed ? 'max-h-0' : 'max-h-96'
                    }`}
            >
                {options.map((option, index) => (
                    <AccordionOption key={index} value={option} />
                ))}
            </div>
        </div>
    );
};

export default Accordion;

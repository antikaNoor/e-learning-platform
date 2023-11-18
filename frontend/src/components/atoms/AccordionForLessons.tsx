// AccordionForLessons.jsx

import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrDocumentDownload } from "react-icons/gr";

type AccordionOptionProps = {
  value: string;
  isVideo?: boolean; // Flag to identify if it's a video option
  isNote?: boolean; // Flag to identify if it's a note option
};

export const AccordionOption = ({ value, isVideo, isNote }: AccordionOptionProps) => {
  return (
    <div className="shadow-sm mt-3 p-2 flex items-center">
      {isVideo && <MdOutlineOndemandVideo className="mr-2" />} {/* Video icon */}
      {isNote && <GrDocumentDownload className="mr-2" />} {/* Note icon */}
      <span>{value}</span>
    </div>
  );
};

type AccordionProps = {
  heading?: string;
  options: { title: string; isVideo?: boolean; isNote?: boolean }[]; // Updated options structure
};

const AccordionForLessons = ({ heading, options }: AccordionProps) => {
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
          <AccordionOption
            key={index}
            value={option.title}
            isVideo={option.isVideo}
            isNote={option.isNote}
          />
        ))}
      </div>
    </div>
  );
};

export default AccordionForLessons;

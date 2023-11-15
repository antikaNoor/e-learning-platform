import React from 'react';

type Props = {
    label?: string;
    options?: { value: string; label: string }[];
    selectedOption?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown = ({ label, options, selectedOption, onChange }: Props) => {
    // rest of the component code
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                value={selectedOption}
                onChange={onChange}
                className="block w-full mt-1 py-2 px-3 border border-gray-300 rounded-md bg-white"
            >
                {options && options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

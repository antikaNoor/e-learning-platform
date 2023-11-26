type DropdownProps = {
    title?: string;
    options?: { value: string; label: string }[];
    selectedOption?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown = ({ title, options, selectedOption, onChange }: DropdownProps) => {
    const defaultOption = { value: '', label: '--Please Select--' };
    const updatedOptions = options ? [defaultOption, ...options] : [defaultOption];

    return (
        <div>
            <label className="mr-2">{title}</label>
            <select
                value={selectedOption}
                onChange={onChange}
                className="w-[217px] p-2 border border-gray-300 rounded focus:outline-none">
                {updatedOptions.map((option) => (
                    <option key={option.value} value={option.value} className="w-[120px]">
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

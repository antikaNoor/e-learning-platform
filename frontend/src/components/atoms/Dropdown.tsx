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
            <label>{title}</label>
            <select
                value={selectedOption}
                onChange={onChange}
                className="w-[120px] p-2 border border-gray-300 rounded"
            >
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

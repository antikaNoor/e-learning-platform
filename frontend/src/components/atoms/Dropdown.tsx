type DropdownProps = {
    title?: string;
    options?: { value: string; label: string }[];
    selectedOption?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown = ({ title, options, selectedOption, onChange }: DropdownProps) => {
    return (
        <div>
            <label>{title}</label>
            <select value={selectedOption} onChange={onChange}
                className="w-[120px] p-2 border border-gray-300 rounded">
                {options?.map((option) => (
                    <option key={option.value} value={option.value}
                        className="w-[120px]">
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

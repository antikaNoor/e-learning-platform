type DropdownProps = {
    title?: string;
    options?: { value: string; label: string }[];
    selectedOption?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ title, options, selectedOption, onChange }) => {
    return (
        <div>
            <label>{title}</label>
            <select value={selectedOption} onChange={onChange}>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

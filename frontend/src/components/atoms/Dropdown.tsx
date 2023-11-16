
type Props = {
    title?: string
    labels?: string[]
    options?: { value: string; label: string }[]
    selectedOption?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

function Dropdown({ title, labels = [], options, selectedOption, onChange }: Props) {
    return (
        <div className='dropdown-container'>
            <label className='dropdown-label'>{title}</label>
            <select value={selectedOption} onChange={onChange} className='dropdown-select'>
                {options?.map((option, index) => (
                    <option key={option.value} value={option.value} className='dropdown-option'>
                        {labels[index]}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown
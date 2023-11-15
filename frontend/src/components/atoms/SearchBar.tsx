import { BsSearch } from "react-icons/bs";

type Props = {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchBar = ({ type, placeholder, value, onChange }: Props) => {

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
      <BsSearch />
    </div>
  )
}

export default SearchBar
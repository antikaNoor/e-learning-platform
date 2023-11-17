import { BsSearch } from "react-icons/bs";

type Props = {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchBar = ({ type, placeholder, value, onChange }: Props) => {

  return (
    <div className="flex items-center">
      <input className="w-[400px] p-2 border border-gray-300 rounded-md focus:outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
      <BsSearch className="text-gray-100 ml-2 bg-gray-900 p-3 rounded w-10 h-10 cursor-pointer" />

    </div>
  )
}

export default SearchBar
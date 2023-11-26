import { BsSearch } from "react-icons/bs";

type Props = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchBar = ({ type, placeholder, value, onChange }: Props) => {
  return (
    <div className="relative flex items-center">
      <input
        className="w-[400px] p-2 pl-10 border border-gray-300 rounded-md focus:outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <BsSearch className="text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2 p-3 rounded w-10 h-10 cursor-pointer" />
    </div>
  );
};

export default SearchBar;

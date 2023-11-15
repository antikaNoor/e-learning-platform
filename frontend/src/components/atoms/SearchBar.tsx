import React from 'react';

type Props = {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search"
            onChange={onSearch}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
        />
    );
};

export default SearchBar;

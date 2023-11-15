// SearchAndFilter.tsx
import React from 'react';
import SearchBar from '../atoms/SearchBar';
import Dropdown from '../atoms/Dropdown';

interface SearchAndFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterOptions: string[];
  selectedFilter: string;
  onFilterChange: (option: string) => void;
}

const SearchAndDropdownMolecule: React.FC<SearchAndFilterProps> = ({
  searchValue,
  onSearchChange,
  filterOptions,
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <SearchBar value={searchValue} onChange={onSearchChange} />
      <Dropdown options={filterOptions} selectedOption={selectedFilter} onChange={onFilterChange} />
    </div>
  );
};

export default SearchAndDropdownMolecule;

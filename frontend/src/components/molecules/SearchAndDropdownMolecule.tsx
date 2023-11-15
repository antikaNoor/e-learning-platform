import React from 'react';
import SearchBar from '../atoms/SearchBar';
import Dropdown from '../atoms/Dropdown';
import useCourse from '../../hooks/useCourseHooks';

type Props = {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchAndDropdownMolecule = ({ onSearch }: Props) => {
    const {
        selectedSortOption,
        handleSortChange,
        selectedOrderOption,
        handleOrderChange,
    } = useCourse();

    const sortOptions = [
        { value: 'rating', label: 'Rating' },
    ];

    const orderOptions = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ];

    return (
        <div>
            <SearchBar onSearch={onSearch} />
            <Dropdown label="Sort By" options={sortOptions} selectedOption={selectedSortOption} onChange={handleSortChange} />
            <Dropdown label="Order By" options={orderOptions} selectedOption={selectedOrderOption} onChange={handleOrderChange} />
        </div>
    );
};

export default SearchAndDropdownMolecule;

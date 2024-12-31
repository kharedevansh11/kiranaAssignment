import { TextField } from '@shopify/polaris';
import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

function SearchBar({ value, onChange }) {
  const [searchInput, setSearchInput] = useState(value);
  const debouncedValue = useDebounce(searchInput, 300);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <TextField
      label="Search contests"
      value={searchInput}
      onChange={setSearchInput}
      placeholder="Enter contest name..."
      autoComplete="off"
    />
  );
}

export default SearchBar;

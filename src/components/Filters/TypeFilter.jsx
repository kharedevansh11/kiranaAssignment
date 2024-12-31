import { Select } from '@shopify/polaris';

function TypeFilter({ value, onChange }) {
  const options = [
    { label: 'All Types', value: 'ALL' },
    { label: 'CF', value: 'CF' },
    { label: 'ICPC', value: 'ICPC' }
  ];

  return (
    <Select
      label="Contest Type"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

export default TypeFilter;

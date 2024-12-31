import { Pagination as PolarisPage, Select } from '@shopify/polaris';

function Pagination({ totalItems, currentPage, itemsPerPage, onPageChange, onItemsPerPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const itemsPerPageOptions = [
    { label: '10 per page', value: '10' },
    { label: '20 per page', value: '20' },
    { label: '50 per page', value: '50' },
    { label: '100 per page', value: '100' }
  ];

  return (
    <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Select
        label="Items per page"
        options={itemsPerPageOptions}
        value={itemsPerPage.toString()}
        onChange={(value) => onItemsPerPageChange(parseInt(value))}
      />
      <PolarisPage
        label={`Page ${currentPage} of ${totalPages}`}
        hasPrevious={currentPage > 1}
        hasNext={currentPage < totalPages}
        onPrevious={() => onPageChange(currentPage - 1)}
        onNext={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
}

export default Pagination;

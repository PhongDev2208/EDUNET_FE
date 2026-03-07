import { useState, useCallback, useMemo } from 'react';

interface UseSearchFilterProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  filterField?: keyof T;
}

interface UseSearchFilterReturn<T> {
  searchTerm: string;
  filterValue: string;
  filteredData: T[];
  setSearchTerm: (term: string) => void;
  setFilterValue: (value: string) => void;
  clearFilters: () => void;
}

export function useSearchFilter<T>({
  data,
  searchFields,
  filterField,
}: UseSearchFilterProps<T>): UseSearchFilterReturn<T> {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowerSearch);
          }
          if (typeof value === 'number') {
            return value.toString().includes(lowerSearch);
          }
          return false;
        })
      );
    }

    // Apply category/status filter
    if (filterValue && filterField) {
      result = result.filter((item) => {
        const value = item[filterField];
        return value === filterValue;
      });
    }

    return result;
  }, [data, searchTerm, filterValue, searchFields, filterField]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFilterValue('');
  }, []);

  return {
    searchTerm,
    filterValue,
    filteredData,
    setSearchTerm,
    setFilterValue,
    clearFilters,
  };
}

export default useSearchFilter;

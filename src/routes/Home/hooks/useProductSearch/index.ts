import {useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {fetchProducts} from '../../service';
import {UseProductSearchParams} from './model';

export default function useProductSearch({
  selectedSort,
  onSuccess,
  onError,
  onTotalReached,
  onSearch,
  getInitialData,
}: UseProductSearchParams) {
  const [search, setSearch] = useState('');

  const debounceSearch = useDebouncedCallback(async (value: string) => {
    if (value.length < 3) {
      return;
    }

    const {data, error} = await fetchProducts({
      search: value,
      sort: selectedSort,
    });

    if (data) {
      onSuccess(data);
    }

    if (error) {
      onError(error);
    }

    onTotalReached(data?.length);
  }, 500);

  function resetSearch() {
    setSearch('');
  }

  function handleClearSearch() {
    resetSearch();
    getInitialData({sort: selectedSort});
  }

  async function handleSearch(value: string) {
    setSearch(value);
    onSearch();

    if (value.length === 0) {
      return getInitialData({sort: selectedSort});
    }

    debounceSearch(value);
  }

  return {
    search,
    handleSearch,
    resetSearch,
    handleClearSearch,
  };
}

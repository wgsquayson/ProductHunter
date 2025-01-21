import {useState} from 'react';
import {fetchProducts} from '../../service';
import {SortSearchParams, UseProductSort} from './model';
import {SortParams} from '../../service/model';

export default function useProductSort({
  onSort,
  onSuccess,
  onError,
  onTotalReached,
}: UseProductSort) {
  const [selectedSort, setSelectedSort] = useState<SortParams>();

  async function handleSelectSort({sort, category, search}: SortSearchParams) {
    setSelectedSort(sort);
    onSort();

    const {data, error} = await fetchProducts({
      sort,
      search,
      category,
    });

    if (data) {
      onSuccess(data);
    }

    if (error) {
      onError(error);
    }

    onTotalReached(data?.length);
  }

  function resetSort() {
    setSelectedSort(undefined);
  }

  return {
    selectedSort,
    handleSelectSort,
    resetSort,
  };
}

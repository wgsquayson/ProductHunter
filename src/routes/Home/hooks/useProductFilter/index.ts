import {useState} from 'react';
import {fetchProducts} from '../../service';
import {UseProductFilter} from './model';

export default function useProductFilter({
  selectedSort,
  onFilter,
  onSuccess,
  onError,
  onTotalReached,
}: UseProductFilter) {
  const [selectedCategory, setSelectedCategory] = useState<string>();

  async function handleSelectCategory(category: string) {
    setSelectedCategory(category);
    onFilter();

    const {data, error} = await fetchProducts({category, sort: selectedSort});

    if (data) {
      onSuccess(data);
    }

    if (error) {
      onError(error);
    }

    onTotalReached(data?.length);
  }

  function resetCategory() {
    setSelectedCategory(undefined);
  }

  return {
    selectedCategory,
    handleSelectCategory,
    resetCategory,
  };
}

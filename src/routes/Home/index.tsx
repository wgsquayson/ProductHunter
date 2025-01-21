import {useEffect} from 'react';
import Template from './template';

import useProductSearch from './hooks/useProductSearch';
import useProductFilter from './hooks/useProductFilter';
import useProductSort from './hooks/useProductSort';
import useHomeState from './hooks/useHomeState';

function Home() {
  function resetPage() {
    updateState({currentPage: 1});
  }

  function setupProductFilter() {
    resetPage();
    resetSearch();
  }

  function setupProductSearch() {
    resetPage();
    resetCategory();
  }

  function handleRemoveFilters() {
    resetSort();
    resetCategory();
    getInitialData();
  }

  const {
    state,
    updateState,
    getInitialData,
    handleTotalReached,
    loadMoreProducts,
    handleRequestError,
  } = useHomeState();

  const {selectedSort, handleSelectSort, resetSort} = useProductSort({
    onSort: resetPage,
    onSuccess: products => updateState({products}),
    onError: handleRequestError,
    onTotalReached: handleTotalReached,
  });

  const {search, handleSearch, resetSearch} = useProductSearch({
    selectedSort,
    onError: handleRequestError,
    onTotalReached: handleTotalReached,
    getInitialData,
    onSearch: setupProductSearch,
    onSuccess: products => updateState({products}),
  });

  const {selectedCategory, handleSelectCategory, resetCategory} =
    useProductFilter({
      selectedSort,
      onFilter: setupProductFilter,
      onSuccess: products => updateState({products}),
      onError: handleRequestError,
      onTotalReached: handleTotalReached,
    });

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Template
      products={state.products}
      loading={state.loading}
      isLoadingMore={state.loadingMore}
      onEndReached={() =>
        loadMoreProducts({
          category: selectedCategory,
          search,
          sort: selectedSort,
        })
      }
      search={search}
      onSearch={handleSearch}
      error={state.errorMessage}
      categories={state.categories}
      selectedCategory={selectedCategory}
      onPressCategory={handleSelectCategory}
      selectedSort={selectedSort}
      onPressSort={sort =>
        handleSelectSort({search, category: selectedCategory, sort})
      }
      onClearFilters={handleRemoveFilters}
    />
  );
}

export default Home;

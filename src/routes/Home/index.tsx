import {useCallback, useEffect, useState} from 'react';
import Template from './template';
import {fetchProductCategories, fetchProducts} from './service';
import {ProductListItem, SortParams} from './model';
import {useDebouncedCallback} from 'use-debounce';
import {ITEMS_PER_PAGE} from './constants';

function Home() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasReachedTotal, setHasReachedTotal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [search, setSearch] = useState('');

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedSort, setSelectedSort] = useState<SortParams>();

  function handleTotalReached(dataLength?: number) {
    if (dataLength && dataLength < ITEMS_PER_PAGE) {
      setLoadingMore(false);
      setHasReachedTotal(true);
    }
  }

  function handleRequestError(error: string) {
    setProducts([]);
    setErrorMessage(error);
    setHasReachedTotal(true);
  }

  const debounceSearch = useDebouncedCallback(async (value: string) => {
    if (value.length < 3) {
      return;
    }

    const {data, error} = await fetchProducts({search: value});

    if (data) {
      setProducts(data);
    }

    if (error) {
      return handleRequestError(error);
    }

    handleTotalReached(data?.length);
  }, 500);

  const loadMoreProducts = useCallback(async () => {
    if (loading || loadingMore || hasReachedTotal) {
      return;
    }

    setLoadingMore(true);

    const {data, error} = await fetchProducts({
      page: currentPage + 1,
      search,
      category: selectedCategory,
      sort: selectedSort,
    });

    if (data) {
      setCurrentPage(prev => (prev += 1));
      setLoadingMore(false);
      setProducts(prev => [...prev, ...data]);
    }

    if (error) {
      return handleRequestError(error);
    }

    handleTotalReached(data?.length);
  }, [
    currentPage,
    loading,
    loadingMore,
    hasReachedTotal,
    search,
    selectedCategory,
    selectedSort,
  ]);

  async function getInitialData(withFilters = true) {
    setCurrentPage(1);
    setHasReachedTotal(false);

    const {data: productsData, error: productsError} = await fetchProducts(
      withFilters
        ? {
            sort: selectedSort,
            category: selectedCategory,
          }
        : {},
    );
    const {data: categoriesData, error: categoriesError} =
      await fetchProductCategories();

    if (productsData) {
      setProducts(productsData);
    }

    if (categoriesData) {
      setCategories(categoriesData);
    }

    const error = productsError || categoriesError;

    if (error) {
      handleRequestError(error);
    }

    setLoading(false);
  }

  async function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
    setSelectedCategory(undefined);

    if (value.length === 0) {
      return getInitialData();
    }

    debounceSearch(value);
  }

  async function handleSelectCategory(category: string) {
    setLoading(true);
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearch('');

    const {data, error} = await fetchProducts({category, sort: selectedSort});

    if (data) {
      setProducts(data);
    }

    if (error) {
      return handleRequestError(error);
    }

    handleTotalReached(data?.length);

    setLoading(false);
  }

  function handleRemoveFilters() {
    setSelectedSort(undefined);
    setSelectedCategory(undefined);
    getInitialData(false);
  }

  async function handleSelectSort(sort: SortParams) {
    setSelectedSort(sort);
    setCurrentPage(1);

    const {data, error} = await fetchProducts({
      sort,
      search,
      category: selectedCategory,
    });

    if (data) {
      setProducts(data);
    }

    if (error) {
      return handleRequestError(error);
    }

    handleTotalReached(data?.length);
  }

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Template
      products={products}
      loading={loading}
      isLoadingMore={loadingMore}
      onEndReached={loadMoreProducts}
      search={search}
      onSearch={handleSearch}
      error={errorMessage}
      categories={categories}
      selectedCategory={selectedCategory}
      onPressCategory={handleSelectCategory}
      selectedSort={selectedSort}
      onPressSort={handleSelectSort}
      onClearFilters={handleRemoveFilters}
    />
  );
}

export default Home;

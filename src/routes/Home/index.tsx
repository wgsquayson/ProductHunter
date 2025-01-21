import {useCallback, useEffect, useState} from 'react';
import Template from './template';
import {fetchProducts} from './service';
import {ProductListItem} from './model';
import {useDebouncedCallback} from 'use-debounce';

function Home() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasReachedTotal, setHasReachedTotal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [search, setSearch] = useState('');

  function handleTotalReached() {
    setLoadingMore(false);
    setHasReachedTotal(true);
  }

  function handleRequestError(error: string) {
    setProducts([]);
    setErrorMessage(error);
  }

  const debounceSearch = useDebouncedCallback(async (value: string) => {
    const {data, total, error} = await fetchProducts({search: value});

    if (data) {
      setProducts(data);
    }

    if (error) {
      return handleRequestError(error);
    }

    if ((total && products.length >= total) || data?.length === 0) {
      handleTotalReached();
    }
  }, 500);

  const loadMoreProducts = useCallback(async () => {
    if (loading || loadingMore || hasReachedTotal) {
      return;
    }

    setLoadingMore(true);

    const {data, total, error} = await fetchProducts({
      page: currentPage + 1,
      search,
    });

    if (data) {
      setCurrentPage(prev => (prev += 1));
      setLoadingMore(false);
      setProducts(prev => [...prev, ...data]);
    }

    if (error) {
      return handleRequestError(error);
    }

    if (total && products.length >= total) {
      handleTotalReached();
    }
  }, [
    currentPage,
    loading,
    loadingMore,
    hasReachedTotal,
    products.length,
    search,
  ]);

  function handleClearSearch() {
    setCurrentPage(1);
    setHasReachedTotal(false);
  }

  async function handleSearch(value: string) {
    setSearch(value);

    if (value.length === 0) {
      return handleClearSearch();
    }

    debounceSearch(value);
  }

  async function getInitialProducts() {
    const {data, error} = await fetchProducts({});

    if (data) {
      setLoading(false);
      setProducts(data);
    }

    if (error) {
      return handleRequestError(error);
    }
  }

  useEffect(() => {
    getInitialProducts();
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
    />
  );
}

export default Home;

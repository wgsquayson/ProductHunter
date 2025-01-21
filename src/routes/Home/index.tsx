import {useCallback, useEffect, useState} from 'react';
import Template from './template';
import {fetchProducts} from './service';
import {ProductListItem} from './model';
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

  function handleTotalReached(dataLength?: number) {
    if (dataLength && dataLength < ITEMS_PER_PAGE) {
      setLoadingMore(false);
      setHasReachedTotal(true);
    }
  }

  function handleRequestError(error: string) {
    setProducts([]);
    setErrorMessage(error);
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
  }, [currentPage, loading, loadingMore, hasReachedTotal, search]);

  async function getInitialProducts() {
    setCurrentPage(1);
    setHasReachedTotal(false);

    const {data, error} = await fetchProducts({});

    if (data) {
      setLoading(false);
      setProducts(data);
    }

    if (error) {
      return handleRequestError(error);
    }
  }

  async function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);

    if (value.length === 0) {
      return getInitialProducts();
    }

    debounceSearch(value);
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

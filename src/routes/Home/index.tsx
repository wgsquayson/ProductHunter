import {useCallback, useEffect, useState} from 'react';
import Template from './template';
import {fetchProducts} from './service';
import {ProductListItem} from './model';

function Home() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasReachedTotal, setHasReachedTotal] = useState(false);

  const [search, setSearch] = useState('');

  async function getProducts() {
    const {data} = await fetchProducts({});

    if (data) {
      setLoading(false);
      return setProducts(data);
    }
  }

  function handleTotalReached() {
    setLoadingMore(false);
    setHasReachedTotal(true);
  }

  const loadMoreProducts = useCallback(async () => {
    if (loading || loadingMore || hasReachedTotal) {
      return;
    }

    setLoadingMore(true);

    const {data, total} = await fetchProducts({page: currentPage + 1, search});

    if (data) {
      setCurrentPage(prev => (prev += 1));
      setLoadingMore(false);
      setProducts(prev => [...prev, ...data]);
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

  async function handleSearch(value: string) {
    setSearch(value);

    if (value.length <= 3) {
      return;
    }

    const {data, total} = await fetchProducts({search: value});

    if (data) {
      setProducts(data);
    }

    if (total && products.length >= total) {
      handleTotalReached();
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Template
      products={products}
      loading={loading}
      isLoadingMore={loadingMore}
      onEndReached={loadMoreProducts}
      search={search}
      onSearch={handleSearch}
    />
  );
}

export default Home;

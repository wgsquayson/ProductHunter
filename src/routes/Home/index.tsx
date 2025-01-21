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

  const loadMoreProducts = useCallback(async () => {
    if (loading || loadingMore || hasReachedTotal) {
      return;
    }

    setLoadingMore(true);

    const {data, total} = await fetchProducts({page: currentPage + 1});

    if (total && products.length >= total) {
      setLoadingMore(false);
      setHasReachedTotal(true);

      return;
    }

    if (data) {
      setCurrentPage(prev => (prev += 1));
      setLoadingMore(false);
      return setProducts(prev => [...prev, ...data]);
    }
  }, [currentPage, loading, loadingMore, hasReachedTotal, products.length]);

  function handleSearch(value: string) {
    setSearch(value);
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

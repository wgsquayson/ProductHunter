import {useState} from 'react';
import {fetchProductCategories, fetchProducts} from '../../service';
import {ITEMS_PER_PAGE} from '../../constants';
import {HomeState} from './model';
import {FetchProductsParams} from '../../service/model';
import useOnce from '@hooks/useOnce';

export default function useHomeState() {
  const [state, setState] = useState<HomeState>({
    products: [],
    categories: [],
    currentPage: 1,
    loading: true,
    loadingMore: false,
    hasReachedTotal: false,
  });

  function updateState(newState: Partial<HomeState>) {
    setState(prev => ({...prev, ...newState}));
  }

  async function handleTotalReached(dataLength?: number) {
    if (typeof dataLength === 'number' && dataLength < ITEMS_PER_PAGE) {
      updateState({loadingMore: false, hasReachedTotal: true});
    }
  }

  async function handleRequestError(error: string) {
    updateState({products: [], hasReachedTotal: true, errorMessage: error});
  }

  async function getInitialData(
    filters?: Pick<FetchProductsParams, 'sort' | 'category'>,
  ) {
    updateState({currentPage: 1, hasReachedTotal: false});

    const [productsResult, categoriesResult] = await Promise.all([
      fetchProducts(filters ?? {}),
      fetchProductCategories(),
    ]);

    if (productsResult.data) {
      updateState({products: productsResult.data});
    }

    if (categoriesResult.data) {
      updateState({categories: categoriesResult.data});
    }

    const error = productsResult.error || categoriesResult.error;

    if (error) {
      handleRequestError(error);
    }

    updateState({loading: false});
  }

  async function loadMoreProducts(filters?: Omit<FetchProductsParams, 'page'>) {
    const {loading, loadingMore, hasReachedTotal} = state;

    if (loading || loadingMore || hasReachedTotal) {
      return;
    }

    updateState({loadingMore: true});

    const {data, error} = await fetchProducts({
      ...filters,
      page: state.currentPage + 1,
    });

    if (data) {
      setState(prev => ({
        ...prev,
        products: [...prev.products, ...data],
        currentPage: prev.currentPage + 1,
        loadingMore: false,
      }));
    }

    if (error) {
      handleRequestError(error);
      updateState({loadingMore: false});
    }

    handleTotalReached(data?.length);
  }

  useOnce(() => {
    getInitialData();
  });

  return {
    state,
    updateState,
    getInitialData,
    loadMoreProducts,
    handleTotalReached,
    handleRequestError,
  };
}

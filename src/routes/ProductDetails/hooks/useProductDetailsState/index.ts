import {useState} from 'react';
import {ProductDetailsState} from './model';
import {fetchProduct} from '../../service';
import useOnce from '@hooks/useOnce';

export default function useProductDetailsState(productId: number) {
  const [state, setState] = useState<ProductDetailsState>({
    loading: true,
  });

  function updateState(newState: Partial<ProductDetailsState>) {
    setState(prev => ({...prev, ...newState}));
  }

  async function getInitialData() {
    const {data, error} = await fetchProduct(productId);

    if (data) {
      updateState({product: data});
    }

    if (error) {
      updateState({errorMessage: error});
    }

    updateState({loading: false});
  }

  useOnce(() => {
    getInitialData();
  });

  return {
    state,
  };
}

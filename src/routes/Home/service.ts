import {FetchResponse} from '../../models/fetch';
import {ProductApiResponse} from '../../models/product';
import api from '../../service/api';

export async function fetchProducts(): Promise<
  FetchResponse<ProductApiResponse[]>
> {
  let result: FetchResponse<ProductApiResponse[]> = {
    loading: true,
  };

  try {
    const response = await api.get('/products');
    return response.data.products;
  } catch (error) {
  } finally {
    result.loading = false;
  }

  return result;
}

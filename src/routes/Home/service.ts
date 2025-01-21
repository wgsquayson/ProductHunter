import {FetchResponse} from '../../models/fetch';
import api from '../../service/api';
import {FetchProductsProps, ProductListItem} from './model';

const ITEMS_PER_PAGE = 20;

export async function fetchProducts({
  page = 1,
}: FetchProductsProps): Promise<FetchResponse<ProductListItem[]>> {
  let result: FetchResponse<ProductListItem[]> = {
    loading: true,
  };

  const skip = (page - 1) * ITEMS_PER_PAGE;

  try {
    const response = await api.get(
      `/products?limit=${ITEMS_PER_PAGE}&skip=${skip}&select=title,price,thumbnail,id`,
    );

    result.data = response.data.products;
    result.total = response.data.total;
  } catch (error) {
  } finally {
    result.loading = false;
  }

  return result;
}

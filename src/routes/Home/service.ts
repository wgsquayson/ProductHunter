import {FetchResponse} from '../../models/fetch';
import api from '../../service/api';
import {ITEMS_PER_PAGE} from './constants';
import {FetchProductsProps, ProductListItem} from './model';

export async function fetchProducts({
  page = 1,
  search = '',
}: FetchProductsProps): Promise<FetchResponse<ProductListItem[]>> {
  let result: FetchResponse<ProductListItem[]> = {};

  const skip = (page - 1) * ITEMS_PER_PAGE;

  try {
    const response = await api.get(
      search
        ? `/products/search?q=${search?.toLowerCase()}&select=title,price,thumbnail,id&limit=${ITEMS_PER_PAGE}&skip=${skip}`
        : `/products?limit=${ITEMS_PER_PAGE}&skip=${skip}&select=title,price,thumbnail,id`,
    );

    result.data = response.data.products;
    result.total = response.data.total;
  } catch (error) {
    result.error =
      'An error happened while trying to search your product. Try again later.';
  }

  console.log({page, search, result});

  return result;
}

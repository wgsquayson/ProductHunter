import {FetchResponse} from '../../../models/fetch';
import api from '../../../service/api';
import {ProductListItem} from '../components/ProductListItem/model';
import {ITEMS_PER_PAGE} from '../constants';
import {FetchProductsParams} from './model';
import {getUrlPrefix} from './utils';

export async function fetchProducts({
  page = 1,
  search = '',
  sort,
  category,
}: FetchProductsParams): Promise<FetchResponse<ProductListItem[]>> {
  let result: FetchResponse<ProductListItem[]> = {};

  const skip = (page - 1) * ITEMS_PER_PAGE;
  const commonQueryParams = `select=title,price,thumbnail,id&limit=${ITEMS_PER_PAGE}&skip=${skip}`;
  const sortQueryParams = sort ? `&sortBy=${sort.by}&order=${sort.order}` : '';
  const prefix = getUrlPrefix(search, category);
  const route = `${prefix}${commonQueryParams}${sortQueryParams}`;

  try {
    const response = await api.get(route);

    result.data = response.data.products;
  } catch (err) {
    result.error =
      'An error happened while trying to search your product. Try again later.';
  }

  return result;
}

export async function fetchProductCategories(): Promise<
  FetchResponse<string[]>
> {
  let result: FetchResponse<string[]> = {};

  try {
    const response = await api.get('/products/category-list');

    result.data = response.data;
  } catch (error) {
    result.error =
      'An error happened while trying to search for product categories. Try again later.';
  }

  return result;
}

import {FetchResponse} from '../../models/fetch';
import api from '../../service/api';
import {ITEMS_PER_PAGE} from './constants';
import {FetchProductsProps, ProductListItem} from './model';

function getUrlPrefix(search?: string, category?: string) {
  if (search) {
    return `/products/search?q=${search?.toLowerCase()}&`;
  }

  if (category) {
    return `/products/category/${category}?`;
  }

  return '/products?';
}

export async function fetchProducts({
  page = 1,
  search = '',
  sort,
  category,
}: FetchProductsProps): Promise<FetchResponse<ProductListItem[]>> {
  let result: FetchResponse<ProductListItem[]> = {};

  const skip = (page - 1) * ITEMS_PER_PAGE;
  const commonQueryParams = `select=title,price,thumbnail,id&limit=${ITEMS_PER_PAGE}&skip=${skip}`;
  const sortQueryParams = sort
    ? `&sortBy=${sort.by}&order={${sort.order}}`
    : '';
  const prefix = getUrlPrefix(search, category);

  try {
    const response = await api.get(
      `${prefix}${commonQueryParams}${sortQueryParams}`,
    );

    result.data = response.data.products;
    result.total = response.data.total;
  } catch (err) {
    result.error =
      'An error happened while trying to search your product. Try again later.';
  }

  return result;
}

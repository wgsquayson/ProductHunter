import {FetchResponse} from '../../../models/fetch';
import api from '../../../service/api';
import {Product} from './model';

export async function fetchProduct(
  productId: number,
): Promise<FetchResponse<Product>> {
  let result: FetchResponse<Product> = {};

  try {
    const response = await api.get(
      `/products/${productId}?select=images,title,description,tags,brand,availabilityStatus,price`,
    );

    result.data = response.data;
  } catch (error) {
    result.error =
      'An error happened while trying to fetch the product. Try again later.';
  }

  return result;
}

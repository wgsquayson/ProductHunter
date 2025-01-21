import {ProductApiResponse} from '../../models/product';
import {ProductListItem} from './model';

export function mapProductItem(
  products: ProductApiResponse[],
): ProductListItem[] {
  return products.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
  }));
}

export function getUrlPrefix(search?: string, category?: string) {
  if (search) {
    return `/products/search?q=${search?.toLowerCase()}&`;
  }

  if (category) {
    return `/products/category/${category}?`;
  }

  return '/products?';
}

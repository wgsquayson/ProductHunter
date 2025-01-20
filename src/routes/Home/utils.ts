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

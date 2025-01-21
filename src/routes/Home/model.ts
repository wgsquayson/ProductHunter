import {ProductApiResponse} from '../../models/product';

export type ProductListItem = Pick<
  ProductApiResponse,
  'id' | 'title' | 'thumbnail' | 'price'
>;

export type TemplateProps = {
  products: ProductListItem[];
  loading: boolean;
  loadingMore: boolean;
  onEndReached: () => void;
};

export type FetchProductsProps = {
  page?: number;
};

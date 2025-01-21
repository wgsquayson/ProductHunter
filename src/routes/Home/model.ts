import {ProductApiResponse} from '../../models/product';

export type ProductListItem = Pick<
  ProductApiResponse,
  'id' | 'title' | 'thumbnail' | 'price'
>;

export type HeaderProps = {
  search: string;
  onSearch: (value: string) => void;
};

export type FooterProps = {
  isLoadingMore: boolean;
};

export type TemplateProps = HeaderProps &
  FooterProps & {
    products: ProductListItem[];
    loading: boolean;
    onEndReached: () => void;
  };

export type FetchProductsProps = {
  page?: number;
  search?: string;
};

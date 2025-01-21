import {ProductApiResponse} from '../../models/product';

export type ProductListItem = Pick<
  ProductApiResponse,
  'id' | 'title' | 'thumbnail' | 'price'
>;

export type HeaderProps = {
  search: string;
  onSearch: (value: string) => void;
  selectedCategory?: string;
  selectedSort?: SortParams;
};

export type FooterProps = {
  isLoadingMore: boolean;
};

export type EmptyListProps = {
  loading: boolean;
  error?: string;
};

export type CategoriesListProps = {
  categories: string[];
  onPressCategory: (category: string) => void;
  onRemoveFilters: () => void;
};

export type TemplateProps = HeaderProps &
  FooterProps &
  EmptyListProps &
  CategoriesListProps & {
    products: ProductListItem[];
    onEndReached: () => void;
  };

export type SortParams = {
  by: 'price' | 'rating';
  order: 'asc' | 'desc';
};

export type FetchProductsProps = {
  page?: number;
  search?: string;
  sort?: SortParams;
  category?: string;
};

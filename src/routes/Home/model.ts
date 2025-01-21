export type ProductListItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export type HeaderProps = {
  search: string;
  onSearch: (value: string) => void;
  selectedCategory?: string;
  selectedSort?: SortParams;
  onClearFilters: () => void;
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
};

export type SortOptionsListProps = {
  onPressSort: (sort: SortParams) => void;
};

export type TemplateProps = HeaderProps &
  FooterProps &
  EmptyListProps &
  CategoriesListProps &
  SortOptionsListProps & {
    products: ProductListItem[];
    onEndReached: () => void;
  };

export type SortParams = {
  by: 'price' | 'rating';
  order: 'asc' | 'desc';
};

export type FetchProductsParams = {
  page?: number;
  search?: string;
  sort?: SortParams;
  category?: string;
};

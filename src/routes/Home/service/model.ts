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

export type ProductListItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

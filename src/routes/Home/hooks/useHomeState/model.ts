import {ProductListItem} from '../../service/model';

export type HomeState = {
  products: ProductListItem[];
  currentPage: number;
  loading: boolean;
  loadingMore: boolean;
  hasReachedTotal: boolean;
  categories: string[];
  errorMessage?: string;
};

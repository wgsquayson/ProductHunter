import {
  FetchProductsParams,
  ProductListItem,
  SortParams,
} from '../../service/model';

export type UseProductSearchParams = {
  selectedSort?: SortParams;
  onSearch: () => void;
  onSuccess: (products: ProductListItem[]) => void;
  onError: (message: string) => void;
  onTotalReached: (dataLength?: number) => void;
  getInitialData: (filters?: Pick<FetchProductsParams, 'sort'>) => void;
};

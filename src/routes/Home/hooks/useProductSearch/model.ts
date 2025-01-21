import {ProductListItem, SortParams} from '../../model';

export type UseProductSearchParams = {
  selectedSort?: SortParams;
  onSearch: () => void;
  onSuccess: (products: ProductListItem[]) => void;
  onError: (message: string) => void;
  onTotalReached: (dataLength?: number) => void;
  getInitialData: () => void;
};

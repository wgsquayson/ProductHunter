import {ProductListItem, SortParams} from '../../model';

export type UseProductSort = {
  onSort: () => void;
  onSuccess: (products: ProductListItem[]) => void;
  onError: (message: string) => void;
  onTotalReached: (dataLength?: number) => void;
};

export type SortSearchParams = {
  sort: SortParams;
  search?: string;
  category?: string;
};

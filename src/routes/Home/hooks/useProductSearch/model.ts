import {ProductListItem} from '../../components/ProductListItem/model';
import {SortParams} from '../../service/model';

export type UseProductSearchParams = {
  selectedSort?: SortParams;
  onSearch: () => void;
  onSuccess: (products: ProductListItem[]) => void;
  onError: (message: string) => void;
  onTotalReached: (dataLength?: number) => void;
  getInitialData: () => void;
};

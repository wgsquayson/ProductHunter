import {ProductListItem} from '../../components/ProductListItem/model';
import {SortParams} from '../../service/model';

export type UseProductFilter = {
  selectedSort?: SortParams;
  onFilter: () => void;
  onSuccess: (products: ProductListItem[]) => void;
  onError: (message: string) => void;
  onTotalReached: (dataLength?: number) => void;
};

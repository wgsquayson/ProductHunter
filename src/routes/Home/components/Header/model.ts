import {SortParams} from '../../service/model';

export type HeaderProps = {
  search: string;
  onSearch: (value: string) => void;
  selectedCategory?: string;
  selectedSort?: SortParams;
  onClearFilters: () => void;
};

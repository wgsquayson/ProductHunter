import {CategoriesListProps} from './components/CategoriesList/model';
import {EmptyListProps} from './components/EmptyList/model';
import {FooterProps} from './components/Footer/model';
import {HeaderProps} from './components/Header/model';
import {ProductListItem} from './components/ProductListItem/model';
import {SortOptionsListProps} from './components/SortOptionsList/model';

export type TemplateProps = HeaderProps &
  FooterProps &
  EmptyListProps &
  CategoriesListProps &
  SortOptionsListProps & {
    products: ProductListItem[];
    onEndReached: () => void;
  };

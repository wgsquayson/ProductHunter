import {CategoriesListProps} from './components/CategoriesList/model';
import {EmptyListProps} from './components/EmptyList/model';
import {FooterProps} from './components/Footer/model';
import {HeaderProps} from './components/Header/model';
import {SortOptionsListProps} from './components/SortOptionsList/model';
import {ProductListItem} from './service/model';

export type TemplateProps = HeaderProps &
  FooterProps &
  EmptyListProps &
  CategoriesListProps &
  SortOptionsListProps & {
    products: ProductListItem[];
    onEndReached: () => void;
    onPressProduct: (productId: number) => void;
  };

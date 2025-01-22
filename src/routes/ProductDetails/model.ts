import {StaticScreenProps} from '@react-navigation/native';
import {Product} from './service/model';

export type ProductDetailsProps = StaticScreenProps<{
  productId: number;
}>;

export type TemplateProps = {
  product?: Product;
  errorMessage?: string;
  loading: boolean;
};

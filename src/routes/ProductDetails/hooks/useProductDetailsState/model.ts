import {Product} from '../../service/model';

export type ProductDetailsState = {
  product?: Product;
  loading: boolean;
  errorMessage?: string;
};

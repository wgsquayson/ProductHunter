import useProductDetailsState from './hooks/useProductDetailsState';
import {ProductDetailsProps} from './model';
import Template from './template';

function ProductDetails({route}: ProductDetailsProps) {
  const {productId} = route.params;

  const {state} = useProductDetailsState(productId);

  return <Template {...state} />;
}

export default ProductDetails;

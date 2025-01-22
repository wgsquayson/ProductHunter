import useProductDetailsState from './hooks/useProductDetailsState';
import {ProductDetailsProps} from './model';
import Template from './template';
import {Loading, Text} from '../../ui/components';

function ProductDetails({route}: ProductDetailsProps) {
  const {productId} = route.params;

  const {state} = useProductDetailsState(productId);

  if (state.loading) {
    return <Loading />;
  }

  if (state.product) {
    return <Template product={state.product} />;
  }

  return <Text>{state.errorMessage}</Text>;
}

export default ProductDetails;

import useProductDetailsState from './hooks/useProductDetailsState';
import {ProductDetailsProps} from './model';
import Template from './template';
import useOnce from '../../hooks/useOnce';
import {Loading, Text} from '../../ui/components';

function ProductDetails({route}: ProductDetailsProps) {
  const {productId} = route.params;

  const {state, getInitialData} = useProductDetailsState(productId);

  useOnce(() => {
    getInitialData();
  });

  if (state.loading) {
    return <Loading />;
  }

  if (state.product) {
    return <Template product={state.product} />;
  }

  return <Text>{state.errorMessage}</Text>;
}

export default ProductDetails;

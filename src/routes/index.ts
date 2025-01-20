import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import ProductDetails from './ProductDetails';

type RootStackProps = {
  Home: undefined;
  ProductDetails: {
    productId: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackProps>({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home,
    ProductDetails,
  },
});

const Routes = createStaticNavigation(RootStack);

export default Routes;

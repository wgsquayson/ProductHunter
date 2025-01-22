import {
  createStaticNavigation,
  LinkingOptions,
  StaticParamList,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import ProductDetails from './ProductDetails';

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: Home,
      linking: {
        path: 'home',
      },
    },
    ProductDetails: {
      screen: ProductDetails,
      linking: {
        path: 'productDetails/:productId',
      },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

export const linking: LinkingOptions<RootStackParamList> = {
  enabled: true,
  prefixes: ['producthunter://'],
};

const Routes = createStaticNavigation(RootStack);

export default Routes;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

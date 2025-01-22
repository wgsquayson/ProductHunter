import {
  createStaticNavigation,
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
    Home,
    ProductDetails,
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Routes = createStaticNavigation(RootStack);

export default Routes;

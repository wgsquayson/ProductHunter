import {TouchableOpacityProps} from 'react-native';

import Icon from '@react-native-vector-icons/fontawesome';
import {ComponentProps} from 'react';

export type ButtonProps = TouchableOpacityProps & {
  text: string;
  icon?: ComponentProps<typeof Icon>['name'];
};

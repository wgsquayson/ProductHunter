import {TextProps as RNTextProps} from 'react-native';

export type TextVariant =
  | 'default'
  | 'bold'
  | 'heading1'
  | 'heading2'
  | 'heading3';

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  color?: string;
};

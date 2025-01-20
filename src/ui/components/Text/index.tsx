import {TextProps} from './model';
import {Text as RNText} from 'react-native';
import {useStyle} from '../../hooks';

function Text({
  variant = 'default',
  color = '#141414',
  children,
  ...props
}: TextProps) {
  const styles = useStyle(theme => ({
    default: {
      color,
      fontSize: theme.fontSizes.sml,
    },
    bold: {
      color,
      fontSize: theme.fontSizes.sml,
      fontWeight: 700,
    },
    heading1: {
      color,
      fontSize: theme.fontSizes.xxl,
      fontWeight: 900,
    },
    heading2: {
      color,
      fontSize: theme.fontSizes.xl,
      fontWeight: 900,
    },
    heading3: {
      color,
      fontSize: theme.fontSizes.lg,
      fontWeight: 900,
    },
  }));

  return (
    <RNText {...props} style={styles[variant]}>
      {children}
    </RNText>
  );
}

export default Text;

import {TouchableOpacity} from 'react-native';
import {ButtonProps} from './model';
import Text from '../Text';
import {useStyle} from '../../hooks';
import Icon from '@react-native-vector-icons/fontawesome';

export default function Button({text, icon, ...props}: ButtonProps) {
  const styles = useStyle(theme => ({
    container: {
      flexDirection: 'row',
      flex: 1,
      maxHeight: theme.spacing.xxl,
      gap: theme.spacing.xxs,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.color.background.primaryDarker,
      padding: theme.spacing.sml,
      borderRadius: theme.borderRadius.md,
    },
  }));

  return (
    <TouchableOpacity {...props} style={styles.container}>
      {icon ? <Icon name={icon} /> : null}
      <Text variant="bold" numberOfLines={1} ellipsizeMode="tail">
        {text}
      </Text>
    </TouchableOpacity>
  );
}

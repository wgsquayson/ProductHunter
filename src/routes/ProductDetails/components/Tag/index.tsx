import {View} from 'react-native';
import {useStyle} from '@ui/hooks';
import {Text} from '@ui/components';
import {TagProps} from './model';

export default function Tag({text}: TagProps) {
  const styles = useStyle(theme => ({
    container: {
      backgroundColor: theme.color.background.primaryDarker,
      padding: theme.spacing.xxxs,
      borderRadius: theme.borderRadius.sm,
    },
  }));

  return (
    <View style={styles.container}>
      <Text variant="detail" color={styles.theme.color.text.detail}>
        {text}
      </Text>
    </View>
  );
}
